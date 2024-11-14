const express = require('express')
const nodemailer = require('nodemailer')

require('dotenv').config()

const port = process.env.PORT
console.log(process.env.smtp_pass)
const app = express()
const cors = require('cors')
app.use(cors({
    origin:'http://127.0.0.1:5500'
}));

app.use(express.json());


const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.smtp_user,
        pass:process.env.smtp_pass,
    },
});


app.post('/send-email',async(req,resp)=>{
    const {name,company,phone,email,subject,service,message} = req.body;
    const mailOption = {
        from : 'ujjwalsharma2002231@gmail.com',
        to:'ujjwalsharma2002231@gmail.com',
        subject:'[NEW CLIENT]',
        text:`Name:${name}\nCompany:${company}\nPhone:${phone}\nEmail:${email}\nSubject:${subject}\nService:${service}\nMessage:${message}`,
        htmml:
        `<h2>New Client</h2>
        <p><strong>Name:</strong> ${name}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Message:</strong> ${message}</p>`
    };

    try{
        await transporter.sendMail(mailOption)
        resp.status(200).send({message:'form data mailed succesfully'})
    }catch(error){
        console.log('Error sending mail:',error)
        resp.status(500).send("error sending mail")
    }
});



app.listen(port,()=>console.log(`server running on http://localhost:${port}`));