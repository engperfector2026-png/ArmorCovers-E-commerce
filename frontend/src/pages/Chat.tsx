import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { ArrowLeft, Send } from "lucide-react";

const socket = io("http://localhost:5000");

const Chat = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!roomId) return;

    socket.emit("joinRoom", roomId);

    const handleReceiveMessage = (data: any) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim() || !roomId) return;

    const data = {
      roomId,
      sender: user.name || "You",
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    socket.emit("sendMessage", data);
    setMessages((prev) => [...prev, data]);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b shadow-sm p-4 flex items-center justify-between sticky top-0 z-50">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium"
        >
          <ArrowLeft size={22} /> Back
        </button>
        <div className="text-center">
          <h1 className="font-semibold text-lg">Live Chat</h1>
          <p className="text-green-500 text-sm flex items-center gap-1 justify-center">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> 
            Seller is online
          </p>
        </div>
        <div className="w-8"></div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="text-6xl mb-6">💬</div>
            <p className="text-2xl font-medium text-gray-700">Start the conversation</p>
            <p className="text-gray-500 mt-2">Ask questions about the product</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === user.name ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] px-6 py-4 rounded-3xl shadow-sm ${
              msg.sender === user.name 
                ? "bg-orange-500 text-white rounded-br-none" 
                : "bg-white rounded-bl-none"
            }`}>
              <p className="text-xs opacity-75 mb-1">{msg.sender}</p>
              <p className="leading-relaxed">{msg.text}</p>
              <p className="text-[10px] opacity-60 text-right mt-2">{msg.time}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t p-4 sticky bottom-0">
        <div className="flex gap-3 items-center bg-gray-100 rounded-3xl px-4 py-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-transparent focus:outline-none text-lg px-4 py-3"
          />
          <button
            onClick={sendMessage}
            disabled={!message.trim()}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white p-4 rounded-2xl transition-all"
          >
            <Send size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;