const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
require('dotenv').config();
const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, payload, template) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'hotmail',
      port: 465,
      auth: {
        user: 'fvenyuy@outlook.com',
        pass: 'fev3@!fev3', // naturally, replace both with your real credentials or an application-specific password
      },
    });

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    const options = () => {
      return {
        from: 'fvenyuy@outlook.com',
        to: 'fonchu.e.venyuy@gmail.com',
        subject: subject,
        html: compiledTemplate(payload),
      };
    };

    // Send email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        return error;
      } else {
        return res.status(200).json({ status: "success" });
      }
    });
  } catch (error) {
    return error;
  }
};



module.exports = sendEmail;