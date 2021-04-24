
import React, { useContext, useEffect, useState } from 'react';
import { UserContext, userDataContext } from "../contexts/UserContext";

import '../App.css';

export const Profile = (props) => {
    let [profileData, setProfileData] = useState(undefined);
    let [username, setUsername] = useState(useContext(UserContext));

    const fetchProfileData = async () => {
        var firstResponse = await fetch('http://localhost:3001/profile?username='+username);
        var jsonResponse = await firstResponse.json();
        console.log(jsonResponse);
        setProfileData(jsonResponse);
    };

    useEffect(() => {
        if (profileData === undefined && username !== undefined) {
        fetchProfileData();
        }
    },[]);

    if (profileData === undefined) {
        return (<h2>Login First</h2>)
    } else if (profileData !== undefined) {
        return (
            <div className='profileBlock'>
                <h2>{username}</h2>
                <div>Followers: {profileData.followers}</div>
                <div>Following: {profileData.following}</div>
                <div>
                {profileData.posts.map(item => {
                    return <div>{item}</div>
                })}
                </div>
            </div>
        )
    }
}
