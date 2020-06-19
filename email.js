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
    html: '<h1><i>Your Bidit Sign Up Verification Code is : </i>' + '<p style="color:green">' + code + '</p></h1>'
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
