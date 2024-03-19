import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

/**
 * Account activation Email
 */
export const accountActivationMail = async (to, subject, data) => {
  {
    try {
      const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_POST,
        auth: {
          user: process.env.MAIL_ID,
          pass: process.env.MAIL_PASS,
        },
      });

      await transport.sendMail({
        from: process.env.MAIL_ID,
        to: to,
        subject: subject,
        html: `
        <style>
                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }
    
                        .main_wrapper {
                            width: 100%;
                            height: fit-content;
                            background-color: gray;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 60px;
                        }
    
                        .wrapper {
                            background-color: #fff;
                            width: 500px;
                            height: fit-content;
                            padding: 20px;
                        }
    
                        .header {
                            padding: 10px 0;
                            background-color: rgb(73, 171, 236);
                        }
    
                        
                        .mess_body {
                            padding: 10px 0;
                        }
    
                        .mess_body h2 {
                            font-size: 25px;
                            color: rgb(6, 149, 245);
                        }
    
                        .mess_body p {
                            font-size: 18px;
                            line-height: 28px;
    
                        }
    
                        .mess_body a {
                            text-decoration: none;
                            display: block;
                            width: fit-content;
                            margin-top: 20px;
                            padding: 10px 25px;
                            background-color: rgb(90, 142, 253);
                            font-size: 17px;
                            color: #fff;
                            border-radius: 4px;
                        }
    
                        .footer {
                            padding-top: 10px;
                        }
    
                        .footer span {
                            font-size: 16px;
                            color: #000000ce;
                            font-family: Arial, sans-serif;
                        }
    
                        .social {
                            padding-top: 10px;
                        }
    
                        .social ul {
                            display: flex;
                        }
    
                        .social ul a {
                            margin: 0 5px;
                            border-radius: 50%;
                            padding: 5px;
                        }
    
                        .social ul a img {
                            width: 25px;
                            height: 25px;
    
                        }
                    </style>
                    <div class="main_wrapper">
                        <div class="wrapper">
                            <div class="header">
                                <h2>Pepplo BD</h2>
                            </div>
                            <hr>
                            <div class="mess_body">
                                <h2>Dear ${data.name}</h2>
                                <p>Your are welcome payoner, Now you have to verify your account by clicking the verify button</p>
                                <a style="text-decoration: none; display: block;  padding: 10px 25px; background-color: rgb(90, 142, 253); font-size: 17px;  color: #fff; border-radius: 4px; width: fit-content;"  href="${data.link}">Verify Now</a>
                            </div>
                            <div class="footer">
                                <span>Your accout Infcell : 01303018917</span>
                            </div>
                        </div>
                    </div>
        `,
      });
      console.log("Email sent successfully!");
    } catch (error) {
      console.log(error.message);
      console.error("Error sending email:", error.message);
    }
  }
};
