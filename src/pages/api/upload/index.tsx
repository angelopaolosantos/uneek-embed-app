// Backend
import formidable from 'formidable'
import AWS from 'aws-sdk'
import sharp from 'sharp' //https://sharp.pixelplumbing.com/

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async (req, res) => {
  const form = new formidable.IncomingForm()
  //form.uploadDir = "./"; ***uncomment if files should be saved on local directory
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    const imageFile = files.file

    /** Check if file uploaded is an image,
     * if not stop operation and send back error */
    if (imageFile && imageFile['type'].split('/')[0] != 'image') {
      res.json({ success: false, message: 'Error occured' })
      return console.log('Error: File type is not allowed')
    }

    /** Amazon S3 Credentials, don't use root account credentials */
    const s3 = new AWS.S3({
      accessKeyId: process.env.UNEEK_AWS_ACCESS_KEY,
      secretAccessKey: process.env.UNEEK_AWS_SECRET_KEY,
    })

    /** Get file base name, remove file extension */
    const fileBaseName = imageFile.name.split('.').slice(0, -1).join('.')

    /** Use timestamp as unique file identifier */
    const timeStamp = new Date().valueOf()

    /** resize images and save in webp format */
    const imageDataWebp650 = await sharp(imageFile.path)
      .resize(650)
      .webp({ lossless: true })
      .toBuffer()
    const imageDataJpeg650 = await sharp(imageFile.path)
      .resize(650)
      .jpeg({
        quality: 100,
        chromaSubsampling: '4:4:4',
      })
      .toBuffer()

    /*
    const imageDataWebp2500 = await sharp(imageFile.path)
      .resize(2500)
      .webp({ lossless: true })
      .toBuffer()

    const imageDataJpeg2500 = await sharp(imageFile.path)
      .resize(2500)
      .jpeg({
        quality: 100,
        chromaSubsampling: '4:4:4',
      })
      .toBuffer()
      */

    /** AWS Bucket Name */
    const awsBucket = 'uneek-web-assets'
    const awsFolder = 'uneek-embed'

    /** 650x650 WebP upload parameters */
    const params1 = {
      Bucket: awsBucket,
      Key: `${awsFolder}/images/650/${fileBaseName}_${timeStamp}.webp`,
      ACL: 'public-read',
      Body: imageDataWebp650,
    }

    const params2 = {
      Bucket: awsBucket,
      Key: `${awsFolder}/images/jpeg/650/${fileBaseName}_${timeStamp}.jpg`,
      ACL: 'public-read',
      Body: imageDataWebp650,
    }

    /** Save Original File - Optional
    const params3 = {
      Bucket: awsBucket,
      Key: `${awsFolder}/images/${timeStamp}_${imageFile.name}`,
      ACL: 'public-read',
      Body: require('fs').createReadStream(imageFile.path),
    } */

    const response1 = s3.upload(params1).promise()
    const response2 = s3.upload(params2).promise()

    /** Run all promises */
    try {
      const data = await Promise.all([response1, response2])
      res.json({ success: true, message: 'Upload Success', file: data })

      return console.log('Upload Success: ', data)
    } catch (err) {
      res.json({ success: false, message: 'Error occured' })
      return console.log('Error:', err)
    }
  })
}
