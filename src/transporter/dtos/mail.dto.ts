export class MailEnvelopeDTO {
    to: string;
    from?: string;
    subject: string;
    template: string;
    context?: {}
}