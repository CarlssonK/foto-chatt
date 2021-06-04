import React, { useState } from "react";
import Zoom from "@material-ui/core/Zoom";
import "../styles/newroom.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NewRoom({ handleToggleNewRoom, toggleComponentBool, addRoom }) {
  const [name, setName] = useState("");

  const handleCreateNewRoom = async (e) => {
    e.preventDefault();
    if (name === "") return;

    const res = await fetch("http://localhost:3000/api/rooms/createroom", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });
    const data = await res.json();
    addRoom(data.room);
    handleToggleNewRoom(false);
  };

  const handleSetName = (e) => {
    setName(e.target.value);
  };

  return (
    <Zoom in={toggleComponentBool}>
      <div className="new-room-container">
        <div className="new-room-box">
          <div
            className="new-room-exit"
            onClick={() => handleToggleNewRoom(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>

          <h5>Skapa Nytt Rum</h5>
          <form onSubmit={(e) => handleCreateNewRoom(e)}>
            <div className="new-room-input-box">
              <input
                className="new-room-input"
                type="text"
                placeholder="Skriv Namn"
                onChange={(e) => handleSetName(e)}
              />
            </div>

            <button className="new-room-btn">Publicera</button>
          </form>
        </div>
      </div>
    </Zoom>
  );
}

export default NewRoom;
