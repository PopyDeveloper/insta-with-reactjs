import React, { useState } from 'react';

import './New.css';

import api from '../services/Api';

const New = ({ history }) => {

    const [image, setImage] = useState(null);
    const [author, setAuthor] = useState(null);
    const [place, setPlace] = useState(null);
    const [description, setDescription] = useState(null);
    const [hashtags, setHashtags] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();

        const data = new FormData();

        data.append('image', image);
        data.append('author', author);
        data.append('place', place);
        data.append('description', description);
        data.append('hashtags', hashtags);

        await api.post('posts', data);

        history.push('/');
    }

    const handleImageChange = e => {
        setImage(e.target.files[0])
    }

    return (
        <form id="new-post" onSubmit={() => handleSubmit}>
            <input type="file" onChange={() => handleImageChange}></input>

            <input
                type="text"
                name="author"
                placeholder="Autor do post"
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
            />
            <input
                type="text"
                name="place"
                placeholder="Local do post"
                onChange={(e) => setPlace(e.target.value)}
                value={place}
            />
            <input
                type="text"
                name="description"
                placeholder="Descricao do post"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            />
            <input
                type="text"
                name="hashtags"
                placeholder="Hashtags do post"
                onChange={(e) => setHashtags(e.target.value)}
                value={hashtags}
            />
            <button type="submit">Enviar</button>
        </form>
    );
}

export default New;