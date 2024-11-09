import React, { useContext } from 'react';
import { AutoScrollContext } from '@/context/AutoScrollContext';

export const ChatHeader = () => {
    const { autoScroll, setAutoScroll } = useContext(AutoScrollContext)
    return (
        <div className="w-full pb-1 font-bold flex justify-between chat-header">
            <div>
                <input
                    type="checkbox"
                    onChange={(event) => {
                        setAutoScroll(event.target.checked)
                    }}
                    checked={autoScroll}
                    className="ml-auto"/> Autoscroll
            </div>


        </div>
    );
};
