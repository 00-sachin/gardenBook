
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Icon, Button } from 'react-materialize';

import { TokenContext, UserContext } from '../contexts/UserContext';

import '../App.css';
import '../css/post.css';
import {Like} from '../components/likeComment';

export const Posts = (props) => {
	let [username, setUsername] = useState(useContext(UserContext));
	let [fetchedPosts, setFetchedPosts] = useState('take');
	let newPostRef = useRef(null);
	let [token, setToken] = useState(useContext(TokenContext));

	const fetchPosts = async () => {
		var firstResponse = await fetch('http://localhost:3001/post/relevantPosts?username='+username,{
			headers: {authorization: "Bearer "+token}
		});
		var jsonResponse = await firstResponse.json();
		setFetchedPosts(jsonResponse.posts);    
	}
	
	useEffect( () => {
		if (username !== undefined && fetchedPosts === 'take') {
			fetchPosts();
		}
	},[]);

	var newPost = () => {

	};


	var commentClicked = () => {};

	console.log("hey",fetchedPosts);
	if (fetchedPosts === undefined || fetchedPosts === 'take') {
		return( <div>No posts</div>)
	} else {
	return(
		<div className='postBlock'>
			<h3>Welcome {username}</h3>
			<div>
				<h4>Add new post</h4>
				<input id="newPost" ref={newPostRef}></input>
				<button onClick={newPost}>Add Post</button>
			</div>
			<div>{
				fetchedPosts.map(singleFollowing => {
					return singleFollowing.posts.map((item, index) => {
						return (
							<div className='singlePost' >
								<h3>- {item.postBody}</h3>
								<img src = {item.postImageUrl}></img>
								<div className="likeCommentBlock">

									<Like 
										key={item.postId} 
										postId={item.postId}
										likesCount= {item.likes.length} 
									/>

									<div>{item.comments.length}
										<Button flat node="button" onClick={commentClicked}>
											<Icon center small>comment</Icon>
										</Button>
									</div>
								</div>
								<div>{item.comments.map((single, indexTwo) => {
									return(<div >
										{single}
									</div>)
								})}</div>
							</div>
							)
						})
					})
				}
			</div>
		</div>
		)
		}}


	
