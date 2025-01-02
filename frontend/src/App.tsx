import { useEffect, useRef, useState } from 'react'


function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]); 
  const messageRef = useRef<HTMLInputElement>(null);
  useEffect(()=>{
    const newSocket  = new WebSocket('ws://localhost:8080');
    newSocket.onmessage = (e) => {
      console.log(e);
      setMessages(prevMessages => [...prevMessages, e.data]);
    }
    setSocket(newSocket);
    return () => {
      newSocket.close();
    }
  },[])

  const sendMessage = ()=>{
    if(socket && messageRef.current && messageRef.current.value){
      socket.send(messageRef.current.value);
      // console.log(messageRef.current.value);
      messageRef.current.value = '';
    }
  }
  return (
    <div className="p-10 bg-gray-900 min-h-screen text-white">
      <div className="mb-6">
        <input
          type="text"
          ref={messageRef}
          placeholder="Enter Message"
          className="bg-gray-800 px-5 py-3 rounded-xl mr-4 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl border-2 border-blue-500"
        >
          Send
        </button>
      </div>
      <div className="bg-gray-800 rounded-xl p-5 max-h-[500px] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Messages</h2>
        <div className="space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg`}
            >
              {msg}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App