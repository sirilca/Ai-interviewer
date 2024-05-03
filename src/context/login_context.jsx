import { createContext, useContext, useState } from 'react';

export const tokencontext = createContext();

export function useToken() {
    return useContext(tokencontext);
}

export function TokenProvider({ children }) {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);

    return (
        <tokencontext.Provider value={{}}>
            {children}
        </tokencontext.Provider>
    );
}
