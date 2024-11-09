import React, { createContext, useState, ReactNode, FC } from 'react';

interface AutoScrollContextType {
    autoScroll: boolean;
    setAutoScroll: (enable: boolean) => void;
}

export const AutoScrollContext = createContext<AutoScrollContextType>({
    autoScroll: true,
    setAutoScroll: () => {
    }
});

export const AutoScrollProvider: FC<{ children?: ReactNode }> = ({
                                                                     children
                                                                 }) => {
    const [autoScroll, setAutoScroll] = useState<boolean>(true);

    return (
        <AutoScrollContext.Provider value={{ autoScroll, setAutoScroll }}>
            {children}
        </AutoScrollContext.Provider>
    );
};
