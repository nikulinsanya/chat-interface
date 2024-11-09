import { useState } from 'react';
import './ChatWindow.scss';

export interface Message {
    text: string;
    sender: 'user' | 'bot';
}

export const ChatWindow = () => {

    const [messages, setMessages] = useState<Message[]>(
        [
            { text: 'Hello', sender: 'bot' },
            { text: 'How are you?', sender: 'user' }
        ]
    );
    return (
        <div>
            <ul className="block p-2 messages-block">
                {messages.map((message, index) => (
                        <li key={index} className={
                            `${message.sender === 'bot' ? 'italic text-left': 'font-bold text-right'}
                            pb-2`
                        }>
                            {message.sender === 'bot' ? 'Bot: ' : 'User: '}
                            {message.text}
                        </li>
                    )
                )}

            </ul>
        </div>
    )
}
