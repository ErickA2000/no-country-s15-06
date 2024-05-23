import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, SendMailOptions } from 'nodemailer';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

  private mail: {
    address: string;
    password: string;
  } = this.configService.get('mail');

  async send(email: string, title: string, body: string | Buffer) {
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: this.mail.address,
        pass: this.mail.password,
      },
    });

    const mailOptions: SendMailOptions = {
      from: this.mail.address,
      to: email,
      subject: title,
      html: body,
    };

    return transporter.sendMail(mailOptions);
  }
}
