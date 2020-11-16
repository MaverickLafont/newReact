import React, {useState} from 'react';
import {Link} from "react-router-dom";
import AxiosConfig from "../../AxiosConfig";

const Login = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    /**
     * Appel sur api login qui verifie l'authenticite de user et renvoie un token dans cookie
     * @param e
     */
    const handleSubmit = e => {
        e.preventDefault();

        AxiosConfig.post('api/login', {username, password}, {headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }}).then(res => {
                // setPassword('');
                // setUsername('');
            localStorage.setItem('token', res.data.token)
            props.history.push('/welcome')
        }).catch(error => {
            setError(error);
        })se
    }
    return(
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftLogin"></div>
                <div className="formBoxRight">
                    <div className="formContent">
                        <form onSubmit={handleSubmit}>

                            {error !== "" && <span>{error.message}</span>}

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
                            <br/>
                            <Link className="simpleLink" to={'/forgetpassword'}>Mot de passe oublié ?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login