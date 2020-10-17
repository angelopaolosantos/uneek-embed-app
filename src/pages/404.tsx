/** pages/404.tsx */
import Head from 'next/head'
import Link from 'next/link'
import Template from '../components/templates/default'
import { Button } from 'rsuite'

export default function Custom404() {
  const max = 3
  const min = 1
  const filename = `/images/404/Uneek_02_2020_${Math.floor(Math.random() * (max - min)) + min}.jpg`;
  console.log(filename)
  return (
    <Template>
      <Head>
        <meta name="description" content="Description"></meta>
        <meta name="keywords" content="Keywords"></meta>
        <title>Uneek Jewelry</title>
      </Head>
      <main className="section-container">
        <div className="container">
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for was not found or does not exist.</p>
          <Button><Link href="/"><a>Go back to Home page</a></Link></Button>
          </div>
          <img className="hero-img" src={filename} />
      </main>
      <style jsx>{`
        .container {
          text-align: center;
          margin: 1rem auto;
        }  
        .hero-img {
          width: 100%;
          height: auto;
          margin: 1rem auto;
        }
        `}
      </style>
    </Template>
  )
}