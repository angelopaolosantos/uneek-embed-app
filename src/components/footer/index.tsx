import { Icon } from 'rsuite'
import Link from 'next/link'

const Footer = () => (
    <div className="container">
        <div className="footer-block">
            <div className="brand-logo"><Link href="/"><a><img src="/images/UNEEK_LOGO_WEB_150px_white.png" /></a></Link></div>
            <div className="social-links">
                <ul className="horizontal-list">
                    <li><a href="https://www.facebook.com/UneekFineJewelry" target="_BLANK"><Icon icon='facebook' size='2x' /></a></li>
                    <li><a href="https://www.instagram.com/uneekjewelry/" target="_BLANK"><Icon icon='instagram' size='2x' /></a></li>
                    <li><a href="https://www.pinterest.com/uneekjewelry/" target="_BLANK"><Icon icon='pinterest' size='2x' /></a></li>
                    <li><a href="https://www.youtube.com/channel/UCMHuDQJoe7uMNSIO5Ekw73A" target="_BLANK"><Icon icon='youtube-play' size='2x' /></a></li>
                    <li><a href="https://twitter.com/uneekjewelry" target="_BLANK"><Icon icon='twitter' size='2x' /></a></li>
                    <li><a href="https://www.linkedin.com/company/uneek-jewelry/" target="_BLANK"><Icon icon='linkedin-square' size='2x' /></a></li>
                </ul>
            </div>
        </div>
        <style jsx>{`
        .footer-block {
            color: white;
            background-color: #5a5b5b;
            padding: 50px 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .social-links {
            display: flex;
        }
        .horizontal-list {
            display: flex;
            list-style-type: none;
            margin: 0px;
            padding: 0px;
        }
        .horizontal-list li{
            margin: 0.5rem;
        }

        .social-links a {
            color: #fff;
        }

        @media only screen and (max-width: 600px) {
            .footer-block {
                flex-direction: column;
            }
        }
        `}
        </style>
    </div >
)

export default Footer

