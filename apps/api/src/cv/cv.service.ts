import { Injectable, NotFoundException } from "@nestjs/common";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { env } from "@/config/env";
import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class CvService {
    private readonly absolutePath = resolve(process.cwd(),env.CV_PATH);
    constructor(private readonly prisma: PrismaService) {}

    getPath() {
        if (!existsSync(this.absolutePath)) {
            throw new NotFoundException("CV file not found at" + this.absolutePath);
        }
        return this.absolutePath;
    }
    async track(meta : {ua?:string; country?:string; persona?:string}) {
        return this.prisma.cvDownload.create({data: meta});
    }
    async count(){
        return this.prisma.cvDownload.count();
    }
    }