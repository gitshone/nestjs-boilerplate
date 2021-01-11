import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { TransporterModule } from './transporter/transporter.module';
import { CategoryModule } from './category/category.module';
import { StoryModule } from './story/story.module';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        ignoreTLS: true,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      defaults: {
        from: 'A Kako To? <no-reply@akakoto.com>',
      },
      preview: true,
      template: {
        dir: process.cwd() + '/templates/',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    DatabaseModule, 
    AuthModule, 
    UserModule, 
    TransporterModule, CategoryModule, StoryModule
  ]
})
export class AppModule {}
