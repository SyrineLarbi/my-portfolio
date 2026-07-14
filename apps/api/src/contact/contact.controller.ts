import {Body, Controller, Post} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {Throttle} from '@nestjs/throttler';
import {ContactService} from "./contact.service";
import {CreateContactDto} from "./dto/create-contact.dto";

@ApiTags('contact')
@Controller('contact')
export class ContactController {
    constructor(private readonly contact: ContactService) {}

    @Post()
    @ApiOperation({ summary: 'Submit the contact form (queued, emailed asynchronously via BullMQ + Resend)' })
    @Throttle({default: {limit: 5, ttl: 60_000}})
    async submit(@Body() dto: CreateContactDto) {
        return this.contact.submit(dto)
    }

}