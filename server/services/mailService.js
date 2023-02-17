import nodemailer from 'nodemailer';
import config from 'config';

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "learn.cards.app@gmail.com",
        pass: "tocolswwbeoctghu"
      }
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: "learn.cards.app@gmail.com",
      to,
      subject: 'Активация аккаунта на ' + 'http://localhost:5000',
      text: '',
      html:
        `
          <div>
            <h1>Для активации перейдите по ссылке</h1>
            <a href="${link}">${link}</a>
          </div>
        `
    });
  }
}

export default new MailService;