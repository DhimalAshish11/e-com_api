import nodemailer from "nodemailer";

export const accountVerificationEmail = async (obj) => {
  const { email, fName, link } = obj;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"EST Store " <${process.env.SMTP_USER}>`, // sender address
    to: email, // list of receivers
    subject: "Account activation required", // Subject line
    text: `hello ${fName}, please follow the link to activate your account. ${link}`, // plain text body
    html: `
        <p>
        Hello ${fName}
    </p>
    <p>
    please follow the link below to activate your account.
    </p>
    <br />
    <br />
    <p>
       <a href=${link}>  ${link} </a>
    </p>
    <br />
    <br />
    
    <p>
        Regareds, <br />
        EST Store <br />
        Customer Support Team
    </p>
        
        `, // html body
  });

  console.log("Message sent: %s", info.messageId);
};
