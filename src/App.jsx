import React from "react";
// Pages/Components
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ChatList from "./pages/ChatList";
import Chat from "./pages/Chat";
// Imports
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./pages/PrivateRoute";
import { withContext } from "react-easier";
import Username from "./pages/Username";

export default withContext(
    "global",
    {
        chatList: [
            { name: "All" },
            { name: "Computers" },
            { name: "Funny" },
            { name: "Politics" },
            { name: "Investing" },
            { name: "Science" },
            { name: "Memes" },
            { name: "Bitcoin" },
            { name: "Animals" },
            { name: "Sports" },
            { name: "Cars" },
            { name: "Games" },
            { name: "Boxing" },
            { name: "Ufc" },
            { name: "LifeHack" },
            { name: "Other" },
        ],
    },
    App
);
 


function App() {
    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <Route exact path="/" component={ChatList} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <PrivateRoute path="/profile" component={Profile} />
                    <Route path="/c/:id" component={Chat} />
                    <Route path="/c" component={ChatList} />
                   <Route path="/username" component={Username} /> 
                </Switch>
            </AuthProvider>
        </Router>
    );
}
/* remove username path after debuggig */