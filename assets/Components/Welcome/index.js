import React, {useState, useEffect, Fragment} from 'react'
import Logout from "../Logout";
import Quiz from "../Quiz";
import AuthService from "../../Services/auth.service"
const Welcome = () => {

    return (
        <div className="quiz-bg">
            <div className="container">
                <Logout/>
                <Quiz user={AuthService.getCurrentUser()}/>
            </div>
        </div>
    )
}

export default Welcome