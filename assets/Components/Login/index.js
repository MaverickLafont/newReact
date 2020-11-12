import React, {useState} from 'react'
import {Link} from "react-router-dom";
import Axios from "axios";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        Axios.post('api/login', {username, password}, {headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }}).then(res => {
                console.log(res)
        }).catch(error => {
            console.log(error)
        })
    }
    return(
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftLogin"></div>
                <div className="formBoxRight">
                    <div className="formContent">
                        <form onSubmit={handleSubmit}>
                            <h2>Connexion</h2>
                            <div className="inputBox">
                                <input onChange={e => setUsername(e.target.value)} value={username} type="email" autoComplete="off" required/>
                                <label htmlFor="pseudo">Email</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={e => setPassword(e.target.value)} value={password} type="password" autoComplete="off" required/>
                                <label htmlFor="password">Mot de passe</label>
                            </div>
                            <button>Connexion</button>
                        </form>
                        <div className="linkContainerk">
                            <Link className="simpleLink" to={'/signup'}>Nouveau sur Marvel Quiz ? Inscrivez-vous ici.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login