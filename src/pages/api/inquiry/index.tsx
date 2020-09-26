import nodemailer from 'nodemailer'
import { MongoClient } from 'mongodb'

let db = null
const dbName = 'uneekdb'
const dbClient = new MongoClient(process.env.NEXT_PUBLIC_MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

export default async (req, res) => {
  let mailOptions = null
  let mailOptionsRetailer = null
  const {
    firstname,
    lastname,
    phone,
    message,
    email,
    product,
    partnerKey,
  } = req.body
  console.log(req.body)

  const transporter = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS,
    },
  })

  try {
    if (!dbClient.isConnected()) {
      await dbClient.connect()
      db = dbClient.db(dbName) // database name
      console.log('connected to mongo: ', dbClient.isConnected())
    } else {
      console.log('using cached mongo')
    }

    let result = await db
      .collection('access_keys')
      .findOne({ type: 'embed', key: partnerKey })

    console.log('partner key:', partnerKey)
    console.log('result: ', result)

    if (result) {
      const inquiry = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        message: message,
        product: product,
        retailer: result.retailer,
      }

      let inquiryResult = await db.collection('inquiries').insertOne(inquiry)
      console.log(inquiryResult)
    }

    dbClient.close()

    mailOptions = {
      from: `"Uneek Jewelry" <${process.env.MAILER_USER}>`,
      to: process.env.MAILER_TO,
      subject: `Customer Inquiry from ${result.retailer}`,
      html: `
      <div>
      <h1>Customer Inquiry</h1>
      From: ${result.retailer}<br />
      <strong>Customer</strong> 
      First Name: ${firstname}<br />
      Last Name: ${lastname}<br />
      Email Address: ${email}<br />
      Phone Number: ${phone}<br />
      Message: ${message}<br />
      <hr />
      Product: ${product.sku}<br />
      Description: ${product.description}<br />
      MSRP: ${product.price}<br />
      <img src="${product.images}" width="250" />
      </div>
      `,
    }

    mailOptionsRetailer = {
      from: `"Uneek Jewelry" <${process.env.MAILER_USER}>`,
      to: result.email,
      subject: `Customer Inquiry from ${result.retailer}`,
      html: `
      <div>
      <h1>Customer Inquiry</h1>
      From: ${result.retailer}<br />
      <strong>Customer</strong> 
      First Name: ${firstname}<br />
      Last Name: ${lastname}<br />
      Email Address: ${email}<br />
      Phone Number: ${phone}<br />
      Message: ${message}<br />
      <hr />
      Product: ${product.sku}<br />
      Description: ${product.description}<br />
      MSRP: ${product.price}<br />
      <img src="${product.images}" width="250" />
      </div>
      `,
    }
  } catch (e) {
    res.json({ success: false, message: 'Error occured' })
    return console.log('Error while connecting to mongo database', e.message)
  }

  if (mailOptions) {
   
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.json({ success: false, message: 'Error occured' })
        return console.log(error.message)
      }
      console.log('Email sent', info.response)
      


      transporter.sendMail(mailOptionsRetailer, function (error, info) {
        if (error) {
          res.json({ success: false, message: 'Error occured' })
          return console.log(error.message)
        }

        console.log('Email sent', info.response)
        res.json({ success: true, message: 'Inquiry successfully submitted' })
        return console.log("Inquiry successfully submitted")
      })
    })
  }
}
