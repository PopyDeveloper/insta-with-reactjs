import React, { useState, useEffect } from 'react';
import './Feed.css'
import io from 'socket.io-client';

import api from '../services/Api';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

const Feed = () => {

    const [feed, setFeed] = useState(null)

    useEffect(() => {

        const registerToSocket = () => {
            const socket = io('http://localhost:3333');

            socket.on('post', newPost => {
                setFeed([newPost, ...feed])
            })

            socket.on('like', likePost => {
                const listUpdate = feed.map(post =>
                    post._id === likePost._id ? likePost : post
                )

                setFeed(listUpdate);

            })
        }

        registerToSocket();
    }, [feed])

    useEffect(() => {
        loadPost()
    }, [])

    const loadPost = async () => {
        await api.get('posts')
            .then(reponse => setFeed(reponse['data']))
    }

    const handleLike = id => {
        api.post(`/posts/${id}/like`);
    }

    return (
        <section id="post-list">
            { feed && feed.map(post => (
                <article key={post._id}>
                    <header>
                        <div className="user-info">
                            <span>{post.author}</span>
                            <span className="place">{post.place}</span>
                        </div>
                        <img src={more} alt="Mais"></img>
                    </header>
                    <img src={`http://localhost:3333/files/${post.image}`} alt=""></img>
                    <footer>
                        <div className="actions">
                            <button type="button" onClick={() => handleLike(post._id)}>
                                <img src={like} alt=""></img>
                            </button>
                            <img src={comment} alt=""></img>
                            <img src={send} alt=""></img>
                        </div>
                        <strong>{post.likes} curtidas</strong>
                        <p>
                            {post.description}
                            <span>{post.hashtags}</span>
                        </p>
                    </footer>
                </article>
            ))}
        </section>
    );
}

export default Feed;