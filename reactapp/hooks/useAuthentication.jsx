import { useNavigate } from "react-router-dom";
import { getAccessToken, removeAccessToken, saveAccessToken } from "../utils/TokenUtilities";
import { useEffect, useState } from "react";
import { login, me } from "../services/AuthService";

const useAuthentication = (checkOnload = false) => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    const validateLogin = () => {
        const token = getAccessToken();
        if (!token) {
            navigate("/login");
            return;
        }
    }
    const reloadUserInfo = () => {
        me().then((userData) => {
            console.log("Usuario cargado:", userData);
            console.log("Email del usuario:", userData.email);
            setUserEmail(userData.email);
        }).catch(() => {
            console.log("Error al cargar la información del usuario");
        });
    }
    const doLogin = (loginData) => {
        login(loginData).then((response) => {
            saveAccessToken(response.token);
            navigate("/");
        }).catch(() => {
            alert("Error al iniciar sesión");
        });
    }
    const doLogout = () => {
        removeAccessToken();
        navigate("/login");
    }

    useEffect(() => {
        if (!checkOnload) {
            return;
        }
        validateLogin();
        // eslint-disable-next-line
    }, [navigate]);
    useEffect(() => {
        if (!userEmail && getAccessToken()) {
            reloadUserInfo();
        }
    }, [userEmail])
    return { userEmail, doLogout, doLogin, }
}

export default useAuthentication;