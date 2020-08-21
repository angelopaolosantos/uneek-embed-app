import { Icon, InputGroup, Input } from 'rsuite'

const Footer = () => (
    <div className="container">
        <div className="footer-block">
            <div>
                <h3>About Uneek</h3>
                <ul>
                    <li>Uneek's Story</li>
                    <li>About the Designer</li>
                    <li>Awards</li>
                    <li>Shows and Events</li>
                    <li>Press</li>
                </ul>
            </div>
            <div>
                <h3>Customer Service</h3>
                <ul>
                    <li>Find a Retailer</li>
                    <li>Contact Us</li>
                    <li>Terms of Use</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div>
                <h3>Tools</h3>
                <ul>
                    <li>Lookbooks</li>
                    <li>Blog</li>
                    <li>Retailer Login</li>
                    <li>FAQ</li>
                </ul>
            </div>
            <div>
                <h3>Social</h3>
                <ul className="horizontal-list">
                    <li><Icon icon='facebook' size='2x' /></li>
                    <li><Icon icon='instagram' size='2x' /></li>
                    <li><Icon icon='pinterest' size='2x' /></li>
                    <li><Icon icon='youtube-play' size='2x' /></li>
                    <li><Icon icon='twitter' size='2x' /></li>
                </ul>
                <div>
                    <InputGroup inside>
                        <Input placeholder="Join our newsletter" />
                        <InputGroup.Button>
                            <Icon icon="send" />
                        </InputGroup.Button>
                    </InputGroup>
                </div>
            </div>
        </div>

        <div className="copyright-block">
            <ul className="horizontal-list">
                <li>
                    Sitemap
                </li>
                <li>
                    Retailer Login
                </li>
            </ul>
            <div>
                Copyright &copy; 2020 Uneek Jewelry
            </div>
        </div>

        <style jsx>{`
        .container {
            color: white;
            background-color: #5a5b5b;
            padding: 50px 15px;
        }
        
        .footer-block {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;   
        }

        h3 {
            font-size: 1.4em;
            font-family: 'Roboto', sans-serif;
            text-transform: uppercase;
        }
        ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
        }

        li {
            font-size: 1.0em;
        }

        .horizontal-list li {
            display: inline-block;
            margin: 5px;
        }

        .copyright-block {
            margin-top: 50px;
            font-size: 0.8em;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }

        @media only screen and (max-width: 600px){
            .footer-block {
                flex-direction: column;
                align-items: center;
                text-align: center;
            }

            .footer-block > div {
                margin: 15px auto;
            }

            h3 {
                font-size: 1.6em;
            }
            ul {
                list-style-type: none;
                margin: 0;
                padding: 0;
            }
            li {
                font-size: 1.4em;
            }
        }
        `}
        </style>
    </div >
)

export default Footer

