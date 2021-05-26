import React, { useEffect, useState } from "react";
import { useStates } from "react-easier";
import Messageinput from "../components/Messageinput";
import MyMessageField from "../components/MyMessageField";
import OtherMessageField from "../components/OtherMessageField";
import Topbar from "../components/Topbar";
import styles from "../styles/Chat.module.css";
import { useNamedContext } from "react-easier";
import { useLocation } from "react-router-dom";
import ImageComments from "../components/ImageComments";


function Chat({match, handleSetMessages}) {

    let g = useNamedContext("global");
    const location = useLocation();

    const [imageList, setImageList] = useState();
    // IG stands for ImageComments
    const [toggleImageComments, setToggleImageComments] = useState(false);
    const [imageCommentsId, setImageCommentsId] = useState("")

    const s = useStates({
        input: "",
        roomId: null,
    });

    // Fetch roomId
    useEffect(() => {
        !location.state ? fetchRoomId() : s.roomId = location.state.roomid;
    }, []);

    useEffect(() => {
        if(g.userId !== null && s.roomId !== null) {
            joinUserToRoom();
        } 
    }, [g.userId, s.roomId])


    // Set roomId in user object and get data from room
    const joinUserToRoom = async () => {
        const res = await fetch(`http://localhost:3000/api/rooms/${s.roomId}`)
        const data = await res.json();

        // Prepopulate old messages that we got from the database
        const messages = data.room.messages.map(e => {
            // const imageArray = e.images.forEach(e => delete e._id)
            return {id: e._id.toString(), message: e.text, images: e.images, sent: e.sent, author: {id: e.author._id.toString(), username: e.author.username}}
        }).reverse();

        console.log(messages[0].id)
        handleSetMessages(messages)
    }

    // Fetch room id when user joins by url
    const fetchRoomId = async () => {
        const res = await fetch("http://localhost:3000/api/rooms");
        const data = await res.json();
        const room = data.rooms.filter(e => e.title === match.params.id)
        s.roomId = room[0]._id;
    }

    const handleSubmit = (e) => {
        if (s.input === "") return;
        const message = s.input;
        s.input = "";

        let formData = new FormData();

        // Append images
        if(imageList) {
            for(let img of imageList) { formData.append("images", img) }
        }
        // Append Text
        formData.append("text", message)
        // Append Date
        formData.append("sent", new Date())

        fetch(`http://localhost:3000/api/rooms/${s.roomId}/messages`, {
            method: "POST",
            body: formData,
        });
    };


    const handleInput = (e) => {
        s.input = e.target.value; // Update state when input field changes
    };

    const addFile = (e, action) => {
        let fileUrls = []

        // If we add files from library
        if(action === "library") {
            for(let file of e.target.files) { fileUrls.push(window.URL.createObjectURL(file)) }
        }

        // If we add photo from camera
        if(action === "camera") {
            fileUrls.push(e) // e in this case will just be a url blob
        }


        setImageList(imageList => [
            ...imageList,
            ...fileUrls,
        ])
    }


    const handleToggleImageComments = (bool, imageId) => {
        setToggleImageComments(bool) // Show imageComments Component
        if(!imageId) return; // return here because we are closing the comop
        setImageCommentsId(imageId) // Set id so we know what data we should populate the component with

    }




    return (
        <div className={styles.chatContainer}>
            <Topbar chatName={location.pathname.substring(3)} />
            <div>
                <p>users online </p>
                {g.usersOnline.map((e, idx) => {
                    return <span key={idx} style={{color: "white"}}>{e.username}</span>
                })}
            </div>
            <ImageComments handleToggleImageComments={handleToggleImageComments} showComponentBool={toggleImageComments} imageId={imageCommentsId} />
            {/* <ImageComments imageId={imageCommentsId} /> */}
            <div className={styles.messageContainer}>
                <ul>
                    {g.messages.map((e) => {
                        return e.author.id === g.userId ? (
                            <MyMessageField
                                key={e.id}
                                postId={e.id}
                                images={e.images}
                                message={e.message}
                                username={e.author.username}
                                userid={e.author.id}
                                sent={e.sent}
                                openImageComments={handleToggleImageComments}
                            />
                        ) : (
                            <OtherMessageField
                                key={e.id}
                                postId={e.id}
                                images={e.images}
                                message={e.message}
                                username={e.author.username}
                                userid={e.author.id}
                                sent={e.sent}
                                openImageComments={handleToggleImageComments}
                            />
                        );
                    })}
                </ul>
            </div>

            <Messageinput
                addFile={addFile}
                handleSubmit={handleSubmit}
                handleInput={handleInput}
            />
        </div>
    );
}

export default Chat;
