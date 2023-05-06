import React from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

function LoginPage() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [redirect, setRedirect] = React.useState(false);
    const {setUserInfo} = React.useContext(UserContext);

    async function login(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if (response.status === 200) {
            console.log(response);
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            });
        } else {
            alert('Wrong Credentials');
        }
    }

    if (redirect) {
        return <Navigate to="/" />
    }

    return (
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input 
                type="text" 
                placeholder="Username" 
                value={username}
                onChange = {ev => setUsername(ev.target.value)}
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange = {ev => setPassword(ev.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginPage;