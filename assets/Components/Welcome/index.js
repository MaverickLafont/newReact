import React, {useState, useEffect, Fragment} from 'react'
import Logout from "../Logout";
import Quiz from "../Quiz";

const Welcome = (props) => {

    const [users, setUsers] = useState(false);

    useEffect(() => {
        localStorage.getItem('token') !== null ? setUsers(true) : props.history.push('/')
    })
    return users === true ? (
        <div className="quiz-bg">
            <div className="container">
                <Logout/>
                <Quiz/>
            </div>
        </div>
    ) : (
        <Fragment>
            <div className="loader"></div>
            <p>Chargement ...</p>
        </Fragment>
    )
}

export default Welcome