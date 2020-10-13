import Link from 'next/link'

const Header = ({children}) => (
    <div className="container">
        <div className="top-message">{children}</div>
        <div className="brand-logo"><Link href="/"><a><img src="/images/UNEEK_LOGO_WEB_150px.png" /></a></Link></div>
    <style jsx>{`
        .top-message {
            background-color: #eeefef;
            text-align: center;
            padding: 5px;
            color: #313737;
            font-size: 0.9em
        }

        .brand-logo img {
            display: block;
            margin: 25px auto;
        }

        @media only screen and (max-width: 992px) {
            .brand-logo {
                display: none;
            }
        }
    `}
    </style>
    </div>
)

export default Header