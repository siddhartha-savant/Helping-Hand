import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const login = () => setIsUserLoggedIn(true);
    const logout = () => setIsUserLoggedIn(false);

    return (
        <AppContext.Provider value={{ isUserLoggedIn, login, logout }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;