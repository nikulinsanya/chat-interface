'use client';
import React, { FormEvent, useContext, useState } from 'react';
import { ChatContext } from '@/context/ChatContext';

export const ChatInput = () => {
    const [message, setMessage] = useState('');
    const { resetChat, fetchStreamedMessages } = useContext(ChatContext);
    const sendMessage = (event: FormEvent) => {
        event.preventDefault();

        if (message.trim()) {
            fetchStreamedMessages(message);
        }
        setMessage('');
    }

    return (
        <form
            className="chat-form"
            onSubmit={(event) => sendMessage(event)}>
            <input
                type="text"
                value={message}
                className="chat-text border border-gray-300 p-1 block mb-3 w-full"
                placeholder="Type your message here"
                autoFocus={true}
                required={true}
                onChange={(e) => setMessage(e.target.value)}/>

            <div className="buttons flex justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Send
                </button>
                <button
                    className="bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={() => {
                        resetChat()
                    }}>
                    Clear chat
                </button>

            </div>
        </form>
    );
};
