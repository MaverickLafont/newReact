import React from 'react';
import jwtDecode from "jwt-decode";


/**
 * Verifie si l'utilisateur est authentifié
 *
 * Si oui retourne true si non false
 * @returns {boolean}
 */
const checkAuth = () => {
    let token = localStorage.getItem("token");
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

/**
 * Retourne l'utilisateur courent
 * @returns {null|unknown}
 */
const getCurrentUser = () => {
    const token = localStorage.getItem("token");
    if (checkAuth()){
        return jwtDecode(token);
    }
    return null;
};

export default {getCurrentUser, checkAuth}