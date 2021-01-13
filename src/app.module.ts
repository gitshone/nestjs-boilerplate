import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { TransporterModule } from './transporter/transporter.module';
import { RateLimiterModule, RateLimiterInterceptor } from 'nestjs-rate-limiter';

@Module({
  imports: [
    
    // mailer module
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      template: {
        dir: process.cwd() + '/templates/',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),

    // rate limiter
    RateLimiterModule.register({
      for: 'Fastify',
      keyPrefix: 'global',
      points: 100,
      pointsConsumed: 3,
      duration: 20
    }),

    // other modules
    DatabaseModule, 
    AuthModule, 
    UserModule, 
    TransporterModule
  ],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: RateLimiterInterceptor,
  }],
})
export class AppModule {}
