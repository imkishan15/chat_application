import { useEffect, useState } from "react";
import axios from 'axios'
import '../styles/chat.css'
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/miscellaneous/MyChats";
import ChatBox from "../components/miscellaneous/ChatBox";
import { ChatState } from "../context/ChatContext";
import Chatbox from "../components/miscellaneous/ChatBox";

const Chat = () => {
    const { user } = ChatState()
    const [fetchAgain, setFetchAgain] = useState(false);

    return (
        <div className="chatbg">
            <div className="upper">
                {user && <SideDrawer />}
            </div>
            <div className="chatbody">
                <div className="mychat">
                    {user && <MyChats fetchAgain={fetchAgain} />}
                </div>
                <div className="chatbox">
                    {user && (
                        <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Chat