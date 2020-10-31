import nodemailer from 'nodemailer'
import { MongoClient } from 'mongodb'

let db
const dbName = process.env.MONGO_DB_NAME
const dbClient = new MongoClient(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Call this function to connect to Mongo DB
const connect = async () => {
  if (!dbClient.isConnected()) {
    try {
      await dbClient.connect()
      db = dbClient.db(dbName)
    } catch (err) {
      console.log(err.stack)
    }
  } else {
    console.log('...using cached mongo db')
  }
}

export default async (req, res) => {
  let mailOptions = null
  let mailOptionsCustomer = null
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
    await connect()

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

    // dbClient.close() // Removed to stop "Topology is closed" error

    mailOptions = {
      from: `"Uneek Jewelry" <${process.env.MAILER_USER}>`,
      to: process.env.MAILER_TO,
      subject: `Customer Inquiry from ${result.retailer}`,
      html: `
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body bgcolor="#ebebeb" style="font-family: Arial, Helvetica, sans-serif">
    <table
      width="800"
      border="0"
      style="margin: 0px auto; background-color: #fff"
    >
      <tr>
        <td align="center">
          <a target="_blank" href="https://www.uneekjewelry.com/"
            ><img
              style="margin: 15px auto"
              src="https://uneek-embed-app.vercel.app/images/UNEEK_LOGO_WEB_150px.png"
          /></a>
        </td>
      </tr>
      <tr>
        <td align="center">
          <img
            width="49%"
            src="https://www.uneekjewelry.com/blog/wp-content/uploads/2020/02/email_image_2.jpg"
            style="-ms-interpolation-mode: bicubic"
          />
          <img
            width="49%"
            src="https://www.uneekjewelry.com/blog/wp-content/uploads/2020/02/email_image_1.jpg"
            style="-ms-interpolation-mode: bicubic"
          />
        </td>
      </tr>
      <tr>
        <td style="padding: 15px">
        <h1>Customer Inquiry</h1>
          From: ${result.retailer}<br>
          <strong>Customer</strong> 
          First Name: ${firstname}<br>
          Last Name: ${lastname}<br>
          Email Address: ${email}<br>
          Phone Number: ${phone}<br>
          Message: ${message}<br>
          <hr>
          Product: ${product.sku}<br>
          Description: ${product.description}<br>
          MSRP: ${product.price}<br>
          <img src="${product.primary_image}" width="250">
          
        </td>
      </tr>
      <tr>
        <td style="background-color: #5b5b5b; padding: 15px" align="center">
          <a target="_blank" href="https://www.uneekjewelry.com/"
            ><img
              style="vertical-align: middle; margin: 5px"
              src="https://uneek-embed-app.vercel.app/images/UNEEK_LOGO_WEB_150px_white.png"
          /></a>
          <a target="_blank" href="https://www.facebook.com/UneekFineJewelry"
            ><img
              style="vertical-align: middle; margin: 5px"
              width="35"
              height="35"
              src="https://www.uneekjewelry.com/blog/wp-content/uploads/2020/02/facebook_white.png"
              style="-ms-interpolation-mode: bicubic"
          /></a>
          <a target="_blank" href="https://www.instagram.com/uneekjewelry/"
            ><img
              style="vertical-align: middle; margin: 5px"
              width="35"
              height="35"
              src="https://www.uneekjewelry.com/blog/wp-content/uploads/2020/02/instagram_white.png"
              style="-ms-interpolation-mode: bicubic"
          /></a>
          <a target="_blank" href="https://www.pinterest.com/uneekjewelry/"
            ><img
              style="vertical-align: middle; margin: 5px"
              width="35"
              height="35"
              src="https://www.uneekjewelry.com/blog/wp-content/uploads/2020/02/pinterest-white.png"
              style="-ms-interpolation-mode: bicubic"
          /></a>
          <a target="_blank" href="https://twitter.com/uneekjewelry"
            ><img
              style="vertical-align: middle; margin: 5px"
              width="35"
              height="35"
              src="https://www.uneekjewelry.com/blog/wp-content/uploads/2020/02/twitter_white.png"
              style="-ms-interpolation-mode: bicubic"
          /></a>
          <a
            target="_blank"
            href="https://www.youtube.com/channel/UCMHuDQJoe7uMNSIO5Ekw73A"
            ><img
              style="vertical-align: middle; margin: 5px"
              width="35"
              height="35"
              src="https://www.uneekjewelry.com/blog/wp-content/uploads/2020/02/youtube_white.png"
              style="-ms-interpolation-mode: bicubic"
          /></a>
          <a
            target="_blank"
            href="https://www.linkedin.com/company/uneek-jewelry/"
            ><img
              style="vertical-align: middle; margin: 5px"
              width="35"
              height="35"
              src="https://www.uneekjewelry.com/blog/wp-content/uploads/2020/02/linkedin_white.png"
              style="-ms-interpolation-mode: bicubic"
          /></a>
        </td>
      </tr>
    </table>
  </body>
</html>
      `,
    }

    mailOptionsCustomer = {
      from: `"Uneek Jewelry" <${process.env.MAILER_USER}>`,
      to: email,
      subject: `Your Uneek item inquiry has been received by ${result.retailer}`,
      html: `
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body bgcolor="#ebebeb" style="font-family: Arial, Helvetica, sans-serif">
    <table
      width="800"
      border="0"
      style="margin: 0px auto; background-color: #fff"
    >
      <tr>
        <td align="center">
          <a target="_blank" href="https://www.uneekjewelry.com/"
            ><img
              style="margin: 15px auto"
              src="https://uneek-embed-app.vercel.app/images/UNEEK_LOGO_WEB_150px.png"
          /></a>
        </td>
      </tr>
      <tr>
        <td align="center">
          <img
            width="49%"
            src="https://www.uneekjewelry.com/blog/wp-content/uploads/2020/02/email_image_2.jpg"
            style="-ms-interpolation-mode: bicubic"
          />
          <img
            width="49%"
            src="https://www.uneekjewelry.com/blog/wp-content/uploads/2020/02/email_image_1.jpg"
            style="-ms-interpolation-mode: bicubic"
          />
        </td>
      </tr>
      <tr>
        <td style="padding: 15px">
        <p>Dear ${(firstname + ' ' + lastname).trim()},</p>

        <p>Thank you for your interest in Style: <strong>${
          product.sku
        }</strong></p>
        <img src="${product.primary_image}" width="250">
        <p>
          Uneek has hand selected the best retail partners across the country
          who share our same values:
        </p>
        <ul>
          <li>High quality craftsmanship</li>
          <li>Exceptional customer service</li>
          <li>Award-winning, one of a kind designs</li>
        </ul>

        <p>
          A representative from ${
            result.retailer
          }, a Uneek authorized retailer, will
          reach out to you shortly.
        </p>
        <p>
          We look forward to helping you choose a special piece of jewelry from
          Uneek.
        </p>
        <p><a target="_blank" href="https://www.uneekjewelry.com/" style="color: #000;">Learn more.</a></p>
        <p class="align-left" style="text-align: right;">
          Sincerely,<br>
          <strong>The Uneek Team</strong><br>
          #DareToBeUneek<br>
          #BeUneek<br>
          #EveryLoveIsUneek
        </p>
        </td>
      </tr>
      <tr>
        <td style="background-color: #5b5b5b; padding: 15px" align="center">
          <a target="_blank" href="https://www.uneekjewelry.com/"
            ><img
              style="vertical-align: middle; margin: 5px"
              src="https://uneek-embed-app.vercel.app/images/UNEEK_LOGO_WEB_150px_white.png"
          /></a>
          <a target="_blank" href="https://www.facebook.com/UneekFineJewelry"
            ><img
              style="vertical-align: middle; margin: 5px"
              width="35"
              height="35"
              src="https://www.uneekjewelry.com/blog/wp-content/uploads/2020/02/facebook_white.png"
              style="-ms-interpolation-mode: bicubic"
          /></a>
          <a target="_blank" href="https://www.instagram.com/uneekjewelry/"
            ><img
              style="vertical-align: middle; margin: 5px"
              width="35"
              height="35"
              src="https://www.uneekjewelry.com/blog/wp-content/uploads/2020/02/instagram_white.png"
              style="-ms-interpolation-mode: bicubic"
          /></a>
          <a target="_blank" href="https://www.pinterest.com/uneekjewelry/"
            ><img
              style="vertical-align: middle; margin: 5px"
              width="35"
              height="35"
              src="https://www.uneekjewelry.com/blog/wp-content/uploads/2020/02/pinterest-white.png"
              style="-ms-interpolation-mode: bicubic"
          /></a>
          <a target="_blank" href="https://twitter.com/uneekjewelry"
            ><img
              style="vertical-align: middle; margin: 5px"
              width="35"
              height="35"
              src="https://www.uneekjewelry.com/blog/wp-content/uploads/2020/02/twitter_white.png"
              style="-ms-interpolation-mode: bicubic"
          /></a>
          <a
            target="_blank"
            href="https://www.youtube.com/channel/UCMHuDQJoe7uMNSIO5Ekw73A"
            ><img
              style="vertical-align: middle; margin: 5px"
              width="35"
              height="35"
              src="https://www.uneekjewelry.com/blog/wp-content/uploads/2020/02/youtube_white.png"
              style="-ms-interpolation-mode: bicubic"
          /></a>
          <a
            target="_blank"
            href="https://www.linkedin.com/company/uneek-jewelry/"
            ><img
              style="vertical-align: middle; margin: 5px"
              width="35"
              height="35"
              src="https://www.uneekjewelry.com/blog/wp-content/uploads/2020/02/linkedin_white.png"
              style="-ms-interpolation-mode: bicubic"
          /></a>
        </td>
      </tr>
    </table>
  </body>
</html>
      `,
    }

    mailOptionsRetailer = {
      from: `"Uneek Jewelry" <${process.env.MAILER_USER}>`,
      to: result.email,
      subject: `Customer Inquiry from ${result.retailer}`,
      html: `
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body bgcolor="#ebebeb" style="font-family: Arial, Helvetica, sans-serif">
    <table
      width="800"
      border="0"
      style="margin: 0px auto; background-color: #fff"
    >
      <tr>
        <td align="center">
          <a target="_blank" href="https://www.uneekjewelry.com/"
            ><img
              style="margin: 15px auto"
              src="https://uneek-embed-app.vercel.app/images/UNEEK_LOGO_WEB_150px.png"
          /></a>
        </td>
      </tr>
      <tr>
        <td align="center">
          <img
            width="49%"
            src="https://www.uneekjewelry.com/blog/wp-content/uploads/2020/02/email_image_2.jpg"
            style="-ms-interpolation-mode: bicubic"
          />
          <img
            width="49%"
            src="https://www.uneekjewelry.com/blog/wp-content/uploads/2020/02/email_image_1.jpg"
            style="-ms-interpolation-mode: bicubic"
          />
        </td>
      </tr>
      <tr>
        <td style="padding: 15px">
        <h1>Customer Inquiry</h1>
          From: ${result.retailer}<br>
          <strong>Customer</strong> 
          First Name: ${firstname}<br>
          Last Name: ${lastname}<br>
          Email Address: ${email}<br>
          Phone Number: ${phone}<br>
          Message: ${message}<br>
          <hr>
          Product: ${product.sku}<br>
          Description: ${product.description}<br>
          MSRP: ${product.price}<br>
          <img src="${product.primary_image}" width="250">
        </td>
      </tr>
      <tr>
        <td style="background-color: #5b5b5b; padding: 15px" align="center">
          <a target="_blank" href="https://www.uneekjewelry.com/"
            ><img
              style="vertical-align: middle; margin: 5px"
              src="https://uneek-embed-app.vercel.app/images/UNEEK_LOGO_WEB_150px_white.png"
          /></a>
          <a target="_blank" href="https://www.facebook.com/UneekFineJewelry"
            ><img
              style="vertical-align: middle; margin: 5px"
              width="35"
              height="35"
              src="https://www.uneekjewelry.com/blog/wp-content/uploads/2020/02/facebook_white.png"
              style="-ms-interpolation-mode: bicubic"
          /></a>
          <a target="_blank" href="https://www.instagram.com/uneekjewelry/"
            ><img
              style="vertical-align: middle; margin: 5px"
              width="35"
              height="35"
              src="https://www.uneekjewelry.com/blog/wp-content/uploads/2020/02/instagram_white.png"
              style="-ms-interpolation-mode: bicubic"
          /></a>
          <a target="_blank" href="https://www.pinterest.com/uneekjewelry/"
            ><img
              style="vertical-align: middle; margin: 5px"
              width="35"
              height="35"
              src="https://www.uneekjewelry.com/blog/wp-content/uploads/2020/02/pinterest-white.png"
              style="-ms-interpolation-mode: bicubic"
          /></a>
          <a target="_blank" href="https://twitter.com/uneekjewelry"
            ><img
              style="vertical-align: middle; margin: 5px"
              width="35"
              height="35"
              src="https://www.uneekjewelry.com/blog/wp-content/uploads/2020/02/twitter_white.png"
              style="-ms-interpolation-mode: bicubic"
          /></a>
          <a
            target="_blank"
            href="https://www.youtube.com/channel/UCMHuDQJoe7uMNSIO5Ekw73A"
            ><img
              style="vertical-align: middle; margin: 5px"
              width="35"
              height="35"
              src="https://www.uneekjewelry.com/blog/wp-content/uploads/2020/02/youtube_white.png"
              style="-ms-interpolation-mode: bicubic"
          /></a>
          <a
            target="_blank"
            href="https://www.linkedin.com/company/uneek-jewelry/"
            ><img
              style="vertical-align: middle; margin: 5px"
              width="35"
              height="35"
              src="https://www.uneekjewelry.com/blog/wp-content/uploads/2020/02/linkedin_white.png"
              style="-ms-interpolation-mode: bicubic"
          /></a>
        </td>
      </tr>
    </table>
  </body>
</html>
      `,
    }
  } catch (e) {
    res.json({ success: false, message: e.message })
    console.log('Error while connecting to mongo database', e.message)
    return { success: false, message: e.message }
  }

  try {
    const response = await Promise.all([
      transporter.sendMail(mailOptions),
      transporter.sendMail(mailOptionsCustomer),
      transporter.sendMail(mailOptionsRetailer),
    ])

    console.log(response)
    console.log('Inquiry successfully submitted')
    res.json({ success: true, message: 'Inquiry successfully submitted' })
    return { success: true, message: 'Inquiry successfully submitted' }
  } catch (e) {
    res.json({
      success: false,
      message: `Error while sending messages ${e.message}`,
    })
    console.log('Error while sending messages', e.message)
    return { success: false, message: e.message }
  }
}
