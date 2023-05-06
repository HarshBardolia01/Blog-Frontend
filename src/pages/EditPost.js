import React from "react";
import { Navigate } from "react-router-dom";
import Editor from "../components/Editor";
import { useParams } from "react-router-dom";

function EditPost() {
    const { id } = useParams();
    const [title, setTitle] = React.useState('');
    const [summary, setSummary] = React.useState('');
    const [content, setContent] = React.useState('');
    const [files, setFiles] = React.useState('');
    const [redirect, setRedirect] = React.useState(false);

    React.useEffect(() => {
        fetch('http://localhost:4000/post/' + id)
            .then(response => {
                response.json().then(postInfo => {
                    setTitle(postInfo.title);
                    setContent(postInfo.content);
                    setSummary(postInfo.summary);
                });
            });
    }, [id]);

    async function updatePost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }
        const response = await fetch('http://localhost:4000/post', {
            method: 'PUT',
            body: data,
            credentials: 'include',
        });
        console.log(response);
        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/post/' + id} />
    }

    return (
        <form onSubmit={updatePost}>
            <input
                type="title"
                placeholder={'Title'}
                value={title}
                onChange={event => setTitle(event.target.value)}
            />
            <input
                type="summary"
                placeholder={'Summary'}
                value={summary}
                onChange={event => setSummary(event.target.value)}
            />
            <input type="file"
                onChange={event => setFiles(event.target.files)}
            />
            <Editor onChange={setContent} value={content} />
            <button style={{ marginTop: '5px' }}>Update Post</button>
        </form>
    );
}

export default EditPost;