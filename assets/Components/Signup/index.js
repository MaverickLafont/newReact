import React, {useState} from 'react';
import AxiosConfig from "../../AxiosConfig";
import {Link} from "react-router-dom";

const Signup = (props) => {

    const data = {
        pseudo: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [loginData, setLoginData] = useState(data);

    const [error, setError] = useState('');

    const handleChange = e => {
        setLoginData({...loginData, [e.target.id]: e.target.value})
    }

    /**
     * Crée un compte user puis si reponse 200 => on le login
     * @param e
     */
    const handleSubmit = e => {
        e.preventDefault();

        const { pseudo, email, password } = loginData;

        AxiosConfig.post('api/users', {email,password, pseudo}, {headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }}).then(res => {
                setLoginData({...data})
                AxiosConfig.post('api/login', {"username" : email, password}, {headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    }}).then(res => {
                    localStorage.setItem('token', res.data.token)
                    props.history.push('/welcome')
                }).catch(error => {
                    setError(error)
                    setLoginData({...data})
                })
            })
            .catch(error => {
                setError(error)
                setLoginData({...data})
            })
    }
    const { pseudo, email, password, confirmPassword } = loginData;

    const btnSubmit = pseudo === '' || email === '' || password === '' || password !== confirmPassword ? <button disabled>Inscription</button> :
        <button>Inscription</button>

    //Gestion Erreur
    const errorMsg = error !== '' && <span>{error}</span>

    return(
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftSignup"></div>
                <div className="formBoxRight">
                    <div className="formContent">
                        <form onSubmit={handleSubmit}>
                            {errorMsg}
                            <h2>Inscription</h2>
                            <div className="inputBox">
                                <input onChange={handleChange} value={pseudo} type="text" id="pseudo" autoComplete="off" required/>
                                <label htmlFor="pseudo">Pseudo</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} value={email} type="email" id="email" autoComplete="off" required/>
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} value={password} type="password" id="password" autoComplete="off" required/>
                                <label htmlFor="password">Mot de passe</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} value={confirmPassword} type="password" id="confirmPassword" autoComplete="off" required/>
                                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                            </div>

                            {btnSubmit}
                        </form>
                        <div className="linkContainerk">
                            <Link className="simpleLink" to={'/login'}>Trompé la route ?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Signup