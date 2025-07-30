import { AttachmentIcon, File02Icon, Menu01Icon, SentIcon } from "hugeicons-react";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { io } from "socket.io-client";

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false); // For mobile drawer
  const [getconversationId, setConversationId] = useState("");
  const [getsocket, setsocket] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const senderId = location.state?.senderId;
  const reciverId = location.state?.reciverId;
  const conversationId = location.state?.conversationId;
  const messageref = useRef(null);
  useEffect(() => {
    const socketInstance = io("http://localhost:5000");
    setsocket(socketInstance);
    if (senderId) socketInstance.emit("addUser", senderId);

    socketInstance.on("getMessage", (data) => {
      setMessages((prev) => [...prev, {
        Messages: data.message,
        user: { id: data.senderId },
        fileUrl: data.file
      }]);
    });

    return () => socketInstance.disconnect();
  }, []);

  useEffect(() => {
    messageref?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setReceiver({ default: reciverId });
  }, []);

  useEffect(() => {
    if (conversationId) setConversationId(conversationId);
  }, [conversationId]);

  useEffect(() => {
    fetchConversation();
  }, []);

  const fetchConversation = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/conversation/list/${senderId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setConversation(data);
    } catch (err) {
    }
  };

  const fetchMessage = async (conversationId, user) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/message/${conversationId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setMessages(data);
      setConversationId(conversationId);
      setReceiver(user);
      setSidebarOpen(false); // Close drawer on mobile
    } catch (err) {
      console.log("Message fetch error:", err);
    }
  };

  const sendMessage = async () => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("conversationId", getconversationId || "new");
  formData.append("senderId", senderId);
  formData.append("message", input);
  formData.append("reciverId", reciverId?.freelancerId || receiver?.user?.reciverId || receiver?.default?._id);
  if (file) formData.append("file", file);

  try {
    const response = await fetch('http://localhost:5000/api/message', {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (response.ok) {
      const result = await response.json(); // ✅ yahan backend se uploaded file ka naam milta hai

      getsocket?.emit("sendMessage", {
        conversationId: getconversationId || "new",
        senderId,
        message: input,
        reciverId: reciverId?.freelancerId || receiver?.user?.reciverId || receiver?.default?._id,
        file: result.file || ""  // ✅ sahi file naam socket me bhejna
      });

      setInput("");
      setFile(null);
    }
  } catch (err) {
    console.log("❌ Error sending message:", err);
  }
};


  return (
    <div data-theme={location.state?.themtrue ? "dark" : ""} className="h-screen md:w-screen w-full   flex flex-col md:flex-row">
      
      {/* Mobile Drawer Sidebar */}
      <div className={`fixed top-0 left-0 z-50 h-full w-64 bg-gray-100 dark:bg-bg-dark transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:w-1/4 md:block overflow-y-auto`}>
        <div className="p-4 border-b flex justify-between items-center md:hidden">
          <h1 className="font-bold text-gray-600 dark:text-white">Chats</h1>
          <button onClick={() => setSidebarOpen(false)} className="text-sm text-gray-500">Close</button>
        </div>

        <div className="px-4 py-2 md:border-r-2  dark:border-border-color md:pr-2 h-full space-y-4">
          <div className="md:flex hidden  md:gap-3  md:block items-center">
                                      <h1 className="text-sm text-purple-500 dark:text-white font-bold"> Skill <span className="text-blue-900 dark:text-accent-color ">Bridge</span> </h1>

            </div>
          {conversation.length > 0 ? conversation.map((item) => (
            <div
              key={item.conversationId}
              onClick={() => fetchMessage(item.conversationId, item)}
              className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer bg-white dark:bg-card-color hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <img className="w-12 h-12 rounded-full object-cover" src={`http://localhost:5000/uploads/${item.user.image}`} alt={item.user.name} />
              <div className="flex flex-col justify-center overflow-hidden">
                <h1 className="text-base font-semibold text-gray-800 dark:text-white truncate max-w-[160px]">{item.user.name}</h1>
                <p className="text-sm text-gray-500 dark:text-accent-color truncate max-w-[160px]">{item.user.email}</p>
              </div>
            </div>
          )) : (
            <h1 className="text-gray-500 text-sm text-center mt-4">No Conversations</h1>
          )}
        </div>
      </div>
     

      {/* Chat Area */}
      <div className="flex-1 flex flex-col dark:bg-bg-dark px-2 relative">
        
        {/* Mobile Menu Button */}
        <div className="md:hidden p-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="text-purple-500 dark:text-accent-color">
            <Menu01Icon className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold dark:text-white">Skill Bridge Chat</h1>
        </div>

        {/* Header */}
        {receiver?.user || receiver?.default ? (
          <div className="bg-white  dark:bg-card-color md:mt-3 dark:text-white p-4 rounded-full mt-1 flex items-center gap-4 shadow">
            <motion.img
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="size-10 rounded-full"
              src={`http://localhost:5000/uploads/${receiver.user?.image || receiver.default?.profileImage}`}
              alt=""
            />
            <h1 className="font-bold text-gray-900 dark:text-white text-lg">
              {receiver.user?.name || receiver.default?.name}
            </h1>
          </div>
        ) : null}

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto pb-25">
          <p className="text-center mb-6 text-sm border rounded p-2 bg-orange-100 dark:bg-border-color dark:text-accent-light">
            Please reply in a professional manner and avoid using SMS language, emojis etc.
          </p>

          {messages.length > 0 ? (
            messages.map(({ Messages, user, fileUrl }, index) => (
              <div key={index}>
                <div className={`md:w-90 w-60 break-words whitespace-pre-wrap mb-4 p-3 rounded-lg ${user.id === senderId
                  ? "bg-purple-500 text-white ml-auto rounded-tr-2xl"
                  : "bg-gray-200 text-black dark:bg-[#1E293B] dark:text-white rounded-tl-2xl"
                  }`}>
                  {Messages}
                  {fileUrl && (
                    <>
                      {fileUrl.endsWith(".jpg") || fileUrl.endsWith(".png") ? (
                        <img src={`http://localhost:5000/uploads/${fileUrl}`} alt="sent image" className="md:mt-2 md:max-w-xs   rounded-lg" />
                      ) : (
                        <a href={`http://localhost:5000/uploads/${fileUrl}`} target="_blank" rel="noopener noreferrer" className="flex mt-2 items-center gap-1 text-sm underline">
                          <File02Icon /> View File
                        </a>
                      )}
                    </>
                  )}
                </div>
                <div ref={messageref}></div>
              </div>
            ))
          ) : (
<div className=" md:h-full dark:text-secondary-text-color  text-sm  flex items-center justify-center " >

Start by selecting a conversation from the left

</div>          )}
        </div>

        {/* Input Area */}
        <div className="w-full px-6 py-4 border-t dark:border-border-color bg-white dark:bg-bg-dark fixed bottom-0 md:static">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-card-color rounded-full px-4 py-2 focus-within:ring-2 ring-border-color transition-all">
            <label className="cursor-pointer">
              <input type="file" onChange={(e) => setFile(e.target.files[0])} className="hidden" />
              <AttachmentIcon className="w-5 h-5 text-purple-500 dark:text-accent-color" />
            </label>

            <input
              type="text"
              placeholder="Send a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 bg-transparent px-2 py-1 text-sm dark:text-white focus:outline-none"
            />

            <button onClick={sendMessage} className="text-purple-500 dark:text-accent-color hover:scale-110 transition-transform">
              <SentIcon />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
