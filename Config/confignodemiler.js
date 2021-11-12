const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: "simon.ey.chile@gmail.com", 
      pass: "gudzmfepiutcrwje", 
    },
  });
  module.exports = {transporter};


