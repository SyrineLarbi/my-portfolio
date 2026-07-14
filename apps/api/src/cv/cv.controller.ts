import {Controller , Get, Headers, Query, Res} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import type { Response } from 'express';
import { createReadStream } from 'node:fs';
import { CvService } from './cv.service';

@ApiTags('cv')
@Controller('cv')
export class CvController {
    constructor(private readonly cv: CvService) {}

    @Get()
    @ApiOperation({ summary: 'Download the CV PDF (logs the download to CvDownload first)' })
    @Throttle({default:{limit:30, ttl:60_000}})
    async download(
        @Query('persona') persona: string|undefined,
        @Headers('user-agent') ua: string|undefined,
        @Headers('x-vercel-ip-country') country: string|undefined,
        @Res() res:Response,
    ){
        await this.cv.track({ua, country, persona})
        const path= this.cv.getPath();
        res.set({
            'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Syrine_Larbi_EN.pdf"',
      'Cache-Control': 'no-store',
        })
        createReadStream(path).pipe(res);
    }
    @Get('count')
    @ApiOperation({ summary: 'Public counter — total CV downloads (used by the Download CV button)' })
    async count(){
        return {count : await this.cv.count()};
    }

}