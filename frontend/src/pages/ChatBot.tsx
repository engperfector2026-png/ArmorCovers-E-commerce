import { useState } from "react";
import axios from "axios";
import { Send, X, Bot } from "lucide-react";

interface Message {
  type: "user" | "bot";
  text: string;
  time: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { type: "bot", text: "Hello! 👋 How can I help you today?", time: "Just now" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const quickActions = [
    { label: "Track Order", action: "track" as const },
    { label: "Product Recommendation", action: "recommend" as const },
    { label: "Delivery Info", action: "delivery" as const },
    { label: "Check Stock", action: "stock" as const },
  ];

  const handleQuickAction = (action: "track" | "recommend" | "delivery" | "stock") => {
    let reply = "";

    if (action === "track") reply = "Please give me your Order ID to track it.";
    else if (action === "recommend") reply = "What kind of product are you looking for?";
    else if (action === "delivery") reply = "We deliver across Kenya in 2-5 days via M-Pesa.";
    else if (action === "stock") reply = "Tell me the product name or category.";

    setMessages(prev => [...prev, { type: "bot", text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { type: "user", text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", { message: input });
      setMessages(prev => [...prev, { type: "bot", text: res.data.reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    } catch {
      setMessages(prev => [...prev, { type: "bot", text: "Sorry, I didn't understand. Try the buttons above.", time: "Just now" }]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-orange-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-50"
      >
        <Bot size={32} />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[380px] h-[520px] bg-white rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-orange-600 p-4 text-white flex justify-between items-center">
            <h3 className="font-semibold">Customer Care Assistant</h3>
            <button onClick={() => setIsOpen(false)}><X size={24} /></button>
          </div>

          {/* Quick Buttons */}
          <div className="p-4 bg-slate-50 border-b flex flex-wrap gap-2">
            {quickActions.map((act, i) => (
              <button 
                key={i} 
                onClick={() => handleQuickAction(act.action)}
                className="flex items-center gap-2 bg-white border px-4 py-2.5 rounded-2xl text-sm hover:border-orange-500 transition"
              >
                {act.label}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-5 py-3 rounded-3xl ${m.type === 'user' ? 'bg-orange-600 text-white' : 'bg-white shadow-sm'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-gray-500">Thinking...</div>}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your question..."
                className="flex-1 border rounded-full px-5 py-3 focus:outline-none"
              />
              <button 
                onClick={sendMessage} 
                className="bg-orange-600 text-white px-5 py-3 rounded-full"
              >
                <Send size={22} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;