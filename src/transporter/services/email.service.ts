import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailEnvelopeDTO } from '../dtos/mail.dto';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    /**
     * Send an email
     * 
     * @param envelope 
     */
    async send(envelope: MailEnvelopeDTO): Promise<void> {
        try {
            await this.mailerService.sendMail({
                to: envelope.to,
                from: envelope.from ?? process.env.MAIL_NO_REPLY_URL,
                subject: envelope.subject,
                template: envelope.template,
                context: envelope.context
            })
        } catch (e) {
            console.log('Error sending an enveloped email:', e)
        }
    }
}