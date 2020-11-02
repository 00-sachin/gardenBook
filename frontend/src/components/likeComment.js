import React, {useState, useContext, useEffect} from 'react';
import { Button, Icon } from 'react-materialize';
//import { useSelector, useDispatch } from 'react-redux'
import { UserContext, TokenContext } from '../contexts/UserContext';

export const Like = (props) => {
   //const data = useSelector(state => state.like);
   //const dispatch = useDispatch();

   let [username, setUsername] = useState(useContext(UserContext));
   let [token, setToken] = useState(useContext(TokenContext));
   let [likesCount, setLikesCount] = useState(props.likesCount);
   let [clicked, setClicked] = useState('no');
   var id = props.postId

   var fetchLikes = async() => {
        var likeFirstResponse = await fetch('http://localhost:3001/post/like?postId='+id+'&username='+username,{
            headers: {authorization: "Bearer "+token}
        });
        var liked = await likeFirstResponse.json();
        changeDisplay(liked);
        setClicked('no');
   };

   useEffect( () => {
       if (clicked === 'yes') {
           fetchLikes()
       } 
    }, [clicked])

    var likeClicked = (id) => {
    console.log(id);
    setClicked('yes')
    };
    var changeDisplay = (liked) => {
    console.log(liked.status);
    if (liked.status === true) setLikesCount(likesCount-1);
    if (liked.status === false) setLikesCount(likesCount+1); 
    }


    return(
    <div>
        {likesCount} 
        <Button flat node="button" key={props.key} 
            onClick={likeClicked} >
            <Icon center small>thumb_up</Icon>
        </Button>
    </div>
    )
}