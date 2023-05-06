import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";

function Post({_id, title, summary, cover, createdAt, author}) {
    return (
        <div className="post">
            <div className="post-img">
                <Link to={`/post/${_id}`}>
                    <img src={'http://localhost:4000/'+cover} alt=""></img>
                </Link>
            </div>
            <div className="post-info">
                <Link to={`/post/${_id}`}>
                    <h2>{title}</h2>
                </Link>
                <p className="info">
                    <span className="author">{author.username}</span>
                    <time>{formatISO9075(new Date(createdAt))}</time>
                </p>
                <p>{summary}</p>
            </div>
        </div>
    );
}

export default Post;