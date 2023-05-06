import React from "react";
import {Navigate} from "react-router-dom";
import Editor from "../components/Editor";

function CreatePost() {
    const [title, setTitle] = React.useState('');
    const [summary, setSummary] = React.useState('');
    const [content, setContent] = React.useState('');
    const [files, setFiles] = React.useState('');
    const [redirect, setRedirect] = React.useState(false);

    async function createNewPost(ev) {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);

        ev.preventDefault();
        const response = await fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,
            credentials: 'include'
        });
        
        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <form onSubmit={createNewPost}>
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
                required={true}
            />
            <Editor onChange={setContent} value={content} />
            <button style={{ marginTop: '5px' }}>Create Post</button>
        </form>
    );
}

export default CreatePost;