import React, { useEffect, useState } from "react";

const StoreContext = React.createContext({
    whisky: [],
    isLoading: false,
    showError: false,
    token: null,
    isLogin: false,
    login: (token) => {},
    logout: () => {},
    name: '',
    fetchWhisky: () => {}
});

export const StoreContextProvider = props => {

    const [whisky, setWhisky] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const initialToken = localStorage.getItem('token');
    const initialUsername = localStorage.getItem('name');
    const [token, setToken] = useState(initialToken);
    const [userName, setUserName] = useState(initialToken);

    const userIsLogin = !!token;

    const isLoginHandler = (token, displayName) => {
        setToken(token);
        setUserName(userName);
        localStorage.setItem('token', token);
        localStorage.setItem('name', displayName);
    };

    const isLogoutHandler = () => {
        setToken(null);
        setUserName(null);
        localStorage.removeItem('token', token);
        localStorage.removeItem('name', userName);
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('https://vezba-ec7fa-default-rtdb.europe-west1.firebasedatabase.app/whiskies.json');

            if (!response.ok) {
                throw new Error('Someting went wrong!')
            }

            const data = await response.json();

            const listOfWhisky = [];

            for (const key in data) {
                listOfWhisky.push({
                    id: key,
                    description: data[key].description,
                    name: data[key].name,
                    photo: data[key].photo,
                    price: data[key].price,
                    rating: data[key].rating,
                    comments: data[key].comments,
                })
            }

            setWhisky(listOfWhisky);
            
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    };

    useEffect(() => {
    
        fetchData();

    }, []);

    const contextValue = {
        whisky: whisky,
        error: error,
        isLoading: isLoading,
        token: token,
        isLogin: userIsLogin,
        logout: isLogoutHandler,
        login: isLoginHandler,
        name: initialUsername,
        fetchWhisky: fetchData
    };

    return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>
};

export default StoreContext;