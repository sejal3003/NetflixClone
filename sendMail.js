const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: "sejalr.uvxcel@gmail.com",
    pass: "udktuathqoipbull",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main(to, subject) {
  // send mail with defined transport object
  const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to NetaFlim</title>
            <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                padding: 20px;
            }
            .gmailContainer {
                max-width: 600px;
                margin: 0 auto;
                background: #fff;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color:rgb(0,102,255);
                text-align: center;
            }
            p {
                font-size: 16px;
                line-height: 1.6;
                margin-bottom: 20px;
            }
           
            </style>


            
        </head>
        <body>
            <div class="gmailContainer">
                <h1>Welcome to NetaFilm!</h1>
                <p>Dear User,</p>
                <p>Thank you for registering with NetaFilm. We are thrilled to have you join our community.</p>
                <p>Get ready to enjoy unlimited movies, TV shows, and more on any device, anywhere.</p>
               
                <p>If you have any questions or need assistance, feel free to contact our <a href="mailto:support@netafilm.com">Support team</a></p>
                <p>Happy streaming!</p>
                <p><bold>Best regards,</bold><br><strong>NetaFilm Team</strong></p>
            </div>
        </body>
        </html>
    `;

  const info = await transporter.sendMail({
    from: "sejalr.uvxcel@gmail.com", // sender address
    to, // list of receivers
    subject,
    html: htmlContent,
  });
}
module.exports = { sendMail: main };
