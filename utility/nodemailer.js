"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper


module.exports.sendMail = async function sendMail(str,data){
    let transporter = nodemailer.createTransport({
        host: "gmail.com",
        port: '***',
        secure: false, // true for 465, false for other ports
        auth: {
          user: "sharma.ac.in", // generated ethereal user
          pass: "ocxa", // generated ethereal password
        },
      });


var Osubject, Otext, Ohtml;
if(str == 'signUp'){
    Osubject = `Thank You ${data.name} for signing to food app`,
    Ohtml = 
    `<h1>Welcome to food app</h1>
    Hope you have a good time. Here are your details:
    Name: ${data.name}
    email: ${data.email}`
}
else{
    console.log("Wrong url");
}

let info = await transporter.sendMail({
    from: '"Nitin Sharma👻" <sharma.89@iitj.ac.in>', // sender address
    to: data.email, // list of receivers
    subject: Osubject, // Subject line
    // text: "Hello world?", // plain text body
    html: Ohtml, // html body
  });

  console.log("Message sent: %s", info.messageId);
}
