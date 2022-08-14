const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            // host: 'hotmail',
            service: 'hotmail',
            // port: 587,
            // secure: true,
            auth: {
                user: "fvenyuy@outlook.com",
                pass: 'fev3@!fev3',
            },
        });

        await transporter.sendMail({
            from: "fvenyuy@outlook.com",
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;