'use client';
import { ChatWindow } from '@/components/Chat/ChatWindow/ChatWindow';
import { ChatInput } from '@/components/Chat/ChatInput/ChatInput';
import { ChatProvider } from '@/context/ChatContext';
import { ChatHeader } from '@/components/Chat/ChatHeader/ChatHeader';
import { AutoScrollProvider } from '@/context/AutoScrollContext';


const Chat = () => {
    return (
        <ChatProvider>
            <AutoScrollProvider>
            <div className="p-2 w-full chat-block">
                <ChatHeader></ChatHeader>
                <ChatWindow></ChatWindow>
                <ChatInput></ChatInput>
            </div>
            </AutoScrollProvider>
        </ChatProvider>);
}
export default Chat;
