
import React, { useState, useEffect, useContext } from 'react';
import { Icon, Button } from 'react-materialize';

import { UserContext } from '../contexts/UserContext';

import '../App.css';
import '../css/post.css';

export const Posts = (props) => {
	let [username, setUsername] = useState(useContext(UserContext));
	let [fetchedPosts, setFetchedPosts] = useState('take');
	
	const fetchPosts = async () => {
		var firstResponse = await fetch('http://localhost:3001/postsOfFollowings?username='+username);
		var jsonResponse = await firstResponse.json();
		setFetchedPosts(jsonResponse.posts);    
	}
	
	useEffect( () => {
		if (username !== undefined && fetchedPosts === 'take') {
			fetchPosts();
		}
	},[]);
	console.log("hey",fetchedPosts);
	if (fetchedPosts === undefined || fetchedPosts === 'take') {
		return( <div>No posts</div>)
	} else {
	return(
		<div className='postBlock'>
			<h3>Welcome {username}</h3>
			<div>{
				fetchedPosts.map(singleFollowing => {
					return singleFollowing.map(item => {
							return (
								<div className='singlePost'>
								<h3>{item.postBody}</h3>
								<div className="likeCommentBlock">
									<div>{item.likes} 
										<Button flat node="button" >
											<Icon center small>thumb_up</Icon>
										</Button>
									</div>
									<div>{item.comments.length}
										<Button flat node="button" >
											<Icon center small>comment</Icon>
										</Button>
									</div>
								</div>
								<div>{item.comments.map((single) => {
									return(<div>
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
	