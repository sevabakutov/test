import { useState, React, useEffect } from "react";
import { login } from "../components/hooks/useTelegram";
import { Navigate } from "react-router-dom";
import { useTelegram } from "../components/hooks/useTelegram";

const TelegramAuth = () => {
    console.log('function TelegramAuth begining')

    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { tg } = useTelegram();
    
    useEffect(() => {
        const checkAuth = async () => {
            try {
                login(tg.initData);
                setIsAuth(true);
                setIsLoading(false);
            } catch (error) {
                setIsAuth(false);
                console.error('Failed to fetch protected data:', error);
            } finally {
                console.log('finally block')
                setIsLoading(false);
            }
        };
        console.log('function call checkAuth()')
        checkAuth();
    }, [tg]);

    if (isLoading) {
        return (
            <div>Loading...</div>
        );
    }

    console.log('function TelegramAuth ending')

    return (
        <div>
            {isAuth ? (
                <Navigate to="/main-page" replace={true} />
            ) : (
                <div>Ошибка авторизации</div>
            )}
        </div>
    );
};

export default TelegramAuth;