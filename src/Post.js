import React, { useState,forwardRef , useEffect} from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import InputOption from "./InputOption";
import { db } from "./Firebase";
import firebase from "firebase";
import $ from "jquery";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";

const Post = forwardRef(({idx, name, likesCount, description, message, photoUrl, postImage}, ref) => {
  const user = useSelector(selectUser);
  const [isLiked,setIsLiked] = useState([]); 
  const [userLike,setUserLike] = useState(false);
   
useEffect(() => {
  db.collection("posts").doc(`${idx}`).get().then(docs=>{
    setIsLiked(docs.data())
})
}, [isLiked])


  const addLike =(e)=>{
    e.preventDefault()
    const increaseValue=firebase.firestore.FieldValue.increment(1);
    const decreaseValue=firebase.firestore.FieldValue.increment(-1);
 
    
     
      for(let i=0;i<isLiked.userLiked.length;i++){
        if(isLiked.userLiked[i] != user.uid){
          console.log("don't exist");
          setUserLike(true)
        }
        else{
          console.log("exist")
          setUserLike(false)
        }

      }
  console.log(isLiked.userLiked.length)
     if( userLike==true ){
      db.collection("posts").doc(`${idx}`).update(
        {likes:increaseValue,   
         userLiked:[user.uid]
  
       }
      )
      setUserLike(false)
    }
    else{
    console.log("enter else")
      db.collection("posts").doc(`${idx}`).update(
        {likes:decreaseValue,        
         userLiked:[""]
       }
      )
  
  }
  
  // const _userLikedarray = isLiked.userLiked
  // console.log(_userLikedarray)
    
  }
  return (
    <div ref={ref} className="post">
      <div className="post__header">
        <Avatar src={photoUrl}>{name[0]}</Avatar>
        <div className="post__info">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </div>

      <div className="post__body">
        <p>{message}</p>
      </div>
<div className="post__body">
       {postImage?<img src={postImage} width="100%" height="100%"  />:''} 
      </div>
      <div className="post__counter">
      <img class="reactions-icon" src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" alt="LIKE" data-test-reactions-icon-type="LIKE"/>
         <span className="likes">{likesCount}</span>
         </div>

      <div className="post__buttons">
        <InputOption id="likeIcon" Icon={ThumbUpAltOutlinedIcon} title="Like" color="gray" onclick={addLike}/>
        <InputOption Icon={ChatOutlinedIcon} title="Comment" color="gray" />
        <InputOption Icon={ShareOutlinedIcon} title="Share" color="gray" />
        <InputOption Icon={SendOutlinedIcon} title="Send" color="gray" />
      </div>
    </div>
  );
});
export default Post;
