import { InjectQueue } from "@nestjs/bullmq";
import { Injectable, Logger } from "@nestjs/common";
import type { Queue } from "bullmq";

import { PrismaService } from "@/prisma/prisma.service";
import type { CreateContactDto } from "./dto/create-contact.dto";

@Injectable()
export class ContactService{
    private readonly logger = new Logger(ContactService.name);
    constructor(
        private readonly prisma: PrismaService,
        @InjectQueue("notifications") private readonly queue: Queue,
    ) {}

    async submit(dto: CreateContactDto) {
        const row = await this.prisma.contactMessage.create({
            data:{...dto,status:'queued'},
        })

        await this.queue.add('send-contact-email',
            {messageId: row.id},
            {jobId:`contact-${row.id}`},
        )

        this.logger.log(`Queued contact email for message ${row.id}`)
        return {id: row.id, status: row.status}
    }

    async markSent(messageId:string){
        await this.prisma.contactMessage.update({
            where:{id: messageId},
            data:{status:'sent'},
        })
    }

    async markFailed(messageId:string, errorMsg:string){
        await this.prisma.contactMessage.update({
            where:{id: messageId},
            data:{status:'failed', errorMsg},
        })
    }

    async findById(id:string){
        return this.prisma.contactMessage.findUnique({where:{id}})
    }

}