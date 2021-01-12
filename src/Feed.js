import React, { useState, useEffect } from "react";
import "./Feed.css";
import Post from "./Post";
import InputOption from "./InputOption";
import CreateIcon from "@material-ui/icons/Create";
import ImageIcon from "@material-ui/icons/Image";
import SubscriptionIcon from "@material-ui/icons/Subscriptions";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import { db, storage } from "./Firebase";
import firebase from "firebase";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";
import FlipMove from "react-flip-move";
import { Avatar } from "@material-ui/core";
import "./static/js/common";
import { v4 as uuid } from "uuid";
import $ from "jquery";

function Feed() {
  const user = useSelector(selectUser);

  const [imageUrl, setImageUrl] = useState();
  const [textarea, setTextarea] = useState("");
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);
  //   const [file, setFile] = useState("");

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  }, []);
  const sendPost = (e) => {
    e.preventDefault();
    db.collection("posts").add({
      name: user.displayName,
      description: user.email,
      message: input,
      photoUrl: user.photoUrl || "",
      
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      likes:0,
      userLiked:"",
    });
    setInput("");
  };

  const popup = (e) => {
    e.preventDefault();
    {
      var popup = document.getElementById("photoPopup");
      popup.classList.toggle("show");
      $(".submitdata").click(function(){
          console.log("hell")
        $("#share__container").addClass("show");

      });
      
    }
  };


  const editPopup = (e) => {
    e.preventDefault();
    db.collection("posts").add({
        name: user.displayName,
      description: user.email,
      message: textarea,
      photoUrl: user.photoUrl || "",
      postImage: imageUrl||"",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      likes:0,
      userLiked:""
    })

  };
  const readImages = async (e) => {
    const file = e.target.files[0];
    const id = uuid();
    const imagesRef = storage.ref("images").child(id);
    await imagesRef.put(file);
    imagesRef.getDownloadURL().then((url) => {
      setImageUrl(url);
    });
  };

  const uploadImage = () => {
    // imagesRef.put(file);

    console.log("enter to upload image");
  };
  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
            />
            <button onClick={sendPost} type="submit">
              send
            </button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOption
            Icon={ImageIcon}
            title="Photo"
            onclick={popup}
            color="#70B5F9"
          />
          <InputOption Icon={SubscriptionIcon} title="Video" color="#E7A33E" />
          <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
          <InputOption
            Icon={CalendarViewDayIcon}
            title="Write Article"
            color="#7FC15E"
          />
        </div>
      </div>
      {/* post */}
      <FlipMove>
   
        {posts.map(({ id, data: { name, description, message, photoUrl, postImage, likes } }) => (
          <Post
            idx={id}
            name={name}
            description={description}
            message={message}
            photoUrl={photoUrl}
            postImage={postImage}
            likesCount= {likes}
          />
        ))}
      </FlipMove>

      <div id="share__container" className="share__box">
        <div className="photo__header">
          <h4>Edit your Post</h4>
          <button>X</button>
        </div>
        <div className="user__headerbox">
          <Avatar
            className="avatar"
            id="ember7926"
            src={user.photoUrl}
          ></Avatar>
          <span id="ember7928" className="display_name">
            {user.displayName}
          </span>
        </div>
        <div className="input__container">
          <textarea type="text" value={textarea} onChange={(e)=>setTextarea(e.target.value)} placeholder="what do you want talk about" />
        </div>
        <div className="shared__photobox">
          <img src={imageUrl} alt="" />
        </div>

        <div className="sharebox__fotter">
          <div className="left__fotter">
            <button>
              <li-icon className="artdeco-button__icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mercado-match"
                  width={24}
                  height={24}
                >
                  <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm1 13a1 1 0 01-.29.71L16 14l-2 2-6-6-4 4V7a1 1 0 011-1h14a1 1 0 011 1zm-2-7a2 2 0 11-2-2 2 2 0 012 2z" />
                </svg>
              </li-icon>
            </button>
            <button>
              <li-icon className="artdeco-button__icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-supported-dps="24x24"
                  fill="currentColor"
                  className="mercado-match"
                  width={24}
                  height={24}
                  focusable="false"
                >
                  <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm-9 12V8l6 4z" />
                </svg>
              </li-icon>
            </button>
          </div>
          <div className="right__fotter">
            <button className="btn">Cancel</button>
            <button className="btn" onClick={editPopup}>
              Post
            </button>
          </div>
        </div>
      </div>

      {/* photobox */}

      <div id="photoPopup" className="photo__container">
        <div className="photo__header">
          <h4>Edit your photo</h4>
          <button>X</button>
        </div>
        <div className="photo__wrapper">
          <input
            type="file"
            accept="image/*"
            onChange={readImages}
            placeholder="Select image to share"
          />
          <img src={imageUrl} alt="" />
        </div>
        <div className="photo__bottom">
        
            <button>Cancel</button>
            <button className="submitdata" type="submit">Done</button>
       
        </div>
      </div>
    </div>
  );
}

export default Feed;
