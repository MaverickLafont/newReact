import React from 'react';
import jwtDecode from "jwt-decode";

const token = localStorage.getItem("token");
/**
 * Verifie si l'utilisateur est authentifié
 *
 * Si oui retourne true si non false
 * @returns {boolean}
 */
const checkAuth = () => {
    if(!token){
        return false;
    }

    try {
        const { exp } = jwtDecode(token);
        if(exp < new Date().getTime() / 1000){
            return false;
        }
    } catch (e) {
        return false;
    }

    return true
}

const getCurrentUser = () => {
    if (checkAuth()){
        const { username } = jwtDecode(token);
        return username;
    }
    return null;
};

export default {getCurrentUser, checkAuth}