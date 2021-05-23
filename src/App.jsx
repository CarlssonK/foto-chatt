import React, {useEffect} from "react";
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
import { useNamedContext } from "react-easier";

import loginCheck from "./utils/LoginCheck"

let messages = [], usersOnline = [];

export default withContext(
    "global",
    {
        username: null,
        email: null,
        userId: null,
        connectSSE: false,
        messages: [],
        usersOnline
    },
    App
);
 
function App() {
    let g = useNamedContext("global");

    useEffect(() => {
        handleLoginCheck();
    }, [])

    // Checks if you're already logged in. If so, get your user data
    const handleLoginCheck = async () => {
        const data = await loginCheck();
        g.username = data.username
        g.email = data.email
        g.userId = data.userId
        startSSE();
    }

    const startSSE = () => {
        if (!g.userId && g.connectSSE) {
            g.connectSSE.close();
            g.messages = [];
            return;
          }

          if (g.connectSSE) { return; }

        let sse = new EventSource("/api/sse");

        sse.addEventListener("new-message", (message) => {
            let data = JSON.parse(message.data);
            console.log(data)
            messages = g.messages = [data, ...messages]
        });

        // Update users in room when someone joins or leaves
        sse.addEventListener("join-leave", (message) => {
            let data = JSON.parse(message.data);

            usersOnline = g.usersOnline = [...data]
            console.log(usersOnline)
        });


        g.connectSSE = sse;
    };

    // Initialize array of messages when user joins a room
    const handleSetMessages = (data) => {
        messages = g.messages = [...data]
    }


    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <Route exact path="/" component={ChatList} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <PrivateRoute path="/profile" component={Profile} />
                    <Route path="/c/:id" render={() => <Chat handleSetMessages={handleSetMessages} />} /> // With "render" we can send props thorugh the component
                    <Route path="/c" component={ChatList} />
                   <Route path="/username" component={Username} /> 
                </Switch>
            </AuthProvider>
        </Router>
    );
}
/* remove username path after debuggig */