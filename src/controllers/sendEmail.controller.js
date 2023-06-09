const nodemailer = require("nodemailer");
const pug = require("pug");
const fs = require("fs");

const emailTemplate = pug.compileFile(
  `${__dirname}/../email_templates/sendCode.pug`
);

//VARIABLES

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_EMAIL = process.env.SMTP_EMAIL;
const min = 1000;
const max = 9999;
console.log(SMTP_USER, SMTP_PASS);
//FUNCTIONS
function generateCode() {
  return Math.floor(Math.random() * (max - min) + min);
}

module.exports = {
  sendEmailCode: async (req, res) => {
    try {
      const { recipient, name } = req.body;
      if (!recipient || !name) {
        return res.status(400).json({ error: "Wrong payload" });
      }
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });
      let code = generateCode();
      const options = {
        from: SMTP_EMAIL,
        to: recipient,
        subject: "Bem-vindo ao nosso serviço de e-mail!",
        html: emailTemplate({ name, code }),
      };
      transporter.sendMail(options, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email enviado com sucesso:", info.response);
          // Verificar o status da resposta
          console.log("Status do envio:", info.response.substr(0, 3));
        }
      });
      res.json({ message: "Email sent to " + recipient, code });
    } catch (error) {
      res.json({ error: error });
    }
  },
};
