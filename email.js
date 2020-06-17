var nodemailer = require('nodemailer');

const Email = (email, code) => {
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',

    port: 587,
    secure: false,

    auth: {
      user: 'bidit43@gmail.com',
      pass: 'Bidit@123',
    },

    tls: {
      rejectUnauthorized: false,
    },
  });

  var mailOptions = {
    from: 'bidit43@gmail.com',
    to: email,
    subject: 'Verification Code',
    text: code,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email info  ' + info.response);
    }

    transporter.close();
  });
};
module.exports = Email;
