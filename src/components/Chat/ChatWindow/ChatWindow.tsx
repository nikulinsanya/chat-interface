import { useContext, useEffect, useRef } from 'react';
import './ChatWindow.scss';
import { ChatContext } from '@/context/ChatContext';
import { AutoScrollContext } from '@/context/AutoScrollContext';

export const ChatWindow = () => {
    const { messages } = useContext(ChatContext)
    const { autoScroll } = useContext(AutoScrollContext)
    const messageRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
            if (messageRef.current && autoScroll) {
                messageRef.current.scrollIntoView(
                    {
                        behavior: 'smooth',
                        block: 'end'
                    })
            }
        },
        [messages, autoScroll])

    return (
        messages.length ?
            (<div
                className="chat-window flex-1 overflow-y-auto p-4 block mb-3 mt-3 border-solid border-gray-100 border-2 chat-block">
                <ul className="messages-block">
                    {messages.map((message, index) => (
                            <li key={index} className={
                                `${message.sender === 'bot' ? 'text-left' : 'p-2 mb-2 bg-slate-50 text-right rounded-md'}
                            pb-2`
                            }>
                                {message.content}
                            </li>
                        )
                    )}
                </ul>

                <div id={'el'} ref={messageRef}></div>
            </div>) : null
    )
}
