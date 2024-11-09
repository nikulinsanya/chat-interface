'use client';
import React, { useState } from 'react';
import { ChatWindow } from '@/components/ChatWindow/ChatWindow';


const Chat = () => {
    const [sanya, setSanya] = useState('Nikulin');

    return (<div className="p-2 w-full">
        <div className="border-s-orange-50 border border-amber-50 pb-1 block font-bold">
        My Chat with {sanya}
        </div>
        <ChatWindow></ChatWindow>
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setSanya('Sanya')}>Change name</button>
    </div>);
}
export default Chat;
