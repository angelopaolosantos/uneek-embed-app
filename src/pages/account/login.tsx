import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect, logout } = useAuth0();

    return (
        <div>
            <h1>Click to login</h1>
            <button onClick={() => loginWithRedirect()}>Log In</button>
            <button onClick={() => logout()}>Log Out</button>
        </div>)
};

export default LoginButton;