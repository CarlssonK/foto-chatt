import React from "react";
import { useAuth } from "../contexts/AuthContext";

function Profile() {
    const { currentUser} = useAuth();
    return (
        <div>
         Profile
            <div>name</div>
        </div>
    );
}

export default Profile;
