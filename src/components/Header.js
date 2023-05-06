import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import "../App.css";

function Header() {
    const { setUserInfo, userInfo } = React.useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include'
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    function logout() {
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method: 'POST'
        });
        setUserInfo(null);
        console.log(userInfo);
    }

    return (
        <header>
            <Link to="/" className="logo">MyBlog</Link>
            <nav>
                {(userInfo !== null && userInfo?.username !== "") ?
                    (
                        <>
                            <Link to="/create">Create new Post</Link>
                            <a href="/" onClick={logout}>Logout ({userInfo.username})</a>
                        </>
                    )
                    :
                    (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )
                }
            </nav>
        </header>
    );
}

export default Header;