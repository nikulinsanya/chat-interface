import React, { createContext, useState, ReactNode, FC } from 'react';
import { parseContent } from '@/utils/text-utils';

interface Message {
    sender: 'user' | 'bot';
    content: string | JSX.Element;
}

interface ChatContextType {
    messages: Message[];
    addMessage: (message: Message) => void;
    resetChat: () => void;
    fetchStreamedMessages: (userMessage: string) => Promise<void>;
}
export const ChatContext = createContext<ChatContextType>({
    messages: [],
    addMessage: () => {},
    resetChat: () => {},
    fetchStreamedMessages: async () => {},

});
export const ChatProvider: FC<{ children?: ReactNode | undefined }> = props => {
    const [messages, setMessages] = useState<Message[]>(
        [
            { content: 'Hello, user', sender: 'bot' },
        ]
    );

    const addMessage = (message: Message) => {
        setMessages(prevMessages => [...prevMessages, message]);
    };
    const resetChat = () => {
        setMessages([]);
    }

    const fetchStreamedMessages = async (userMessage: string) => {
        addMessage({ sender: 'user', content: userMessage });

        try {
            const response = await fetch('http://localhost:1994/stream', {
                method: 'GET',
                headers: {
                    Accept: 'text/event-stream',
                },
            });

            if (!response.body) {
                throw new Error('ReadableStream not supported in this browser.');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let buffer = '';

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const events = buffer.split('\n\n');
                buffer = events.pop() || '';

                for (const event of events) {
                    if (event.startsWith('data: ')) {
                        const jsonData = JSON.parse(event.slice(6).trim());

                        if (jsonData.status === 'data' && jsonData.data) {
                            const processedContent = parseContent(jsonData.data);
                            addMessage({ sender: 'bot', content: processedContent });
                        } else if (jsonData.status === 'end') {
                            console.log('Stream ended:', jsonData.message);
                        } else if (jsonData.status === 'error') {
                            console.error('Error in stream:', jsonData.message);
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching streamed messages:', error);
        }
    };

    return (
        <ChatContext.Provider value={{messages, addMessage, resetChat, fetchStreamedMessages}}>
            {props.children}
        </ChatContext.Provider>
    );
};
