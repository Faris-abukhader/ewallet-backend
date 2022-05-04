const nodemailer = require("nodemailer");
const handlerbars = require('handlebars')
require('dotenv').config()
const fs = require('fs')


async function SendEmail(toEmails,message,subject,url) {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.DEFAULT_EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    fs.readFile(__dirname+'/../public/messageTemplate.html', (err, data) => {
        if (err) console.log(err);
        var template = handlerbars.compile(data.toString())
        var replacements = {
            message:message,
            token:url
        }
        var htmlToSend = template(replacements)
        var mailOptions = {
            from: process.env.DEFAULT_EMAIL,
            to: toEmails,
            subject: subject,
            html:htmlToSend            
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              res.send('Email sent: ' + info.response)
            }
          });
      });
    
    
    
  }

  module.exports = SendEmail