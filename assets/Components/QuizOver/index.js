import React, {Fragment, useEffect, useState} from 'react';
import {GiTrophyCup} from "react-icons/gi";
import Loader from "../Loader";
import Modal from "./modal";
import Axios from "axios";

const QuizOver = React.forwardRef((props, ref) => {

    const {levelNames, score, maxQuestions, quizLevel, percent, loadLevelQuestions} = props;
    const [question, setQuestion] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [characterData, setCharacterData] = useState([]);
    //Retourne la moyenne
    const averageGrade = maxQuestions / 2;
    //var REACT_APP_MARVEL_API_KEY du fichier .env
    const marvelApiKey = process.env.REACT_APP_MARVEL_API_KEY;
    //hash généré des clef public & privé en md5
    const hash = '45ac438bbbf9a9fa4e9bcd08503b5594';

    useEffect(() => {
        setQuestion(ref.current)
    }, [ref]);

    /**
     * Fonction qui upperCase la premier lettre
     * du mot en parametre
     * @param s
     * @returns {string}
     */
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    /**
     * Affiche la modal avec les infos
     * @param id
     */
    const showModal = id => {
        setOpenModal(true);

        Axios.get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${marvelApiKey}&hash=${hash}`).then(response => {
            setCharacterData(response.data);
            setIsLoading(false);
        }).catch(error => {
            console.log(error);
        })
    }

    /**
     * Ferme la modal
     */
    const closeModal = () => {
        setOpenModal(false);
        setIsLoading(true);
    }

    /**
     * Si score plus petit que la moyenne on redirige accueil
     */
    if(score < averageGrade) {
        setTimeout(() => loadLevelQuestions(quizLevel), 5000);
    }

    /**
     * En fonction du score obtenu l'affichage du quizOver sera différent
     */
    const decision = score >= averageGrade ? (
        <Fragment>
            <div className="stepsBtnContainer">
        {
            quizLevel < levelNames.length ?
            (
                <Fragment>
                    <p className="successMsg">Bravo, passez au niveau suivant ! :)</p>
                    <button onClick={() => loadLevelQuestions(quizLevel)} className="btnResult success">NIVEAU SUIVANT</button>
                </Fragment>
            ) :
            (
                <Fragment>
                    <p className="successMsg"><GiTrophyCup size='50px'/> Bravo, vous avez réussi ! :)</p>
                    <button onClick={() => loadLevelQuestions(0)} className="btnResult gameOver">Accueil</button>
                </Fragment>
            )
        }
            </div>
            <div className="percentage">
                <div className="progressPercent">Réussite: {percent}%</div>
                <div className="progressPercent">Note: {score}/{maxQuestions}</div>
            </div>
        </Fragment>
    ) : (
        <Fragment>
            <div className="stepsBtnContainer">
                <p className="failureMsg">Hélas mon ami, tu as échoué. Il faut recommencer !</p>
            </div>
            <div className="percentage">
                <div className="progressPercent">Réussite: {percent}%</div>
                <div className="progressPercent">Note: {score}/{maxQuestions}</div>
            </div>
        </Fragment>
    )

    /**
     * Retourne le tableau de reponse/question
     * seulement si le score est > à la moyenne
     */
    const body =  score >= averageGrade ? (
        question.map(question => {
            return (
                <tr key={question.id}>
                    <td>{question.question}</td>
                    <td>{question.answer}</td>
                    <td>
                        <button onClick={() => showModal(question.heroId)} className="btnInfo">INFOS</button>
                    </td>
                </tr>
            )
        })
    ) :
        (
            <tr>
                <td colSpan="3">
                    <Loader
                        loadingMsg={"Pas de réponse!"}
                        styling={{textAlign: 'center', color: 'red'}}
                    />
                </td>
            </tr>
        )

    const resultInModal = !isLoading ? (
        <Fragment>
            <div className="modalHeader">
                <h2>{characterData.data.results[0].name}</h2>
            </div>
            <div className="modalBody">
                <div className="comicImage">
                    <img
                        src={characterData.data.results[0].thumbnail.path+'.'+characterData.data.results[0].thumbnail.extension}
                        alt={characterData.data.results[0].name}
                    />

                    {characterData.attributionText}
                </div>
                <div className="comicDetails">
                    <h3>Description</h3>
                    {
                        characterData.data.results[0].description ?
                            <p>{characterData.data.results[0].description}</p>
                         : <p>Description indisponible</p>
                    }
                    <h3>Plus d'infos</h3>
                    {characterData.data.results[0].urls && characterData.data.results[0].urls.map((url, index) => {
                        return <a
                            key={index}
                            href={url.url}
                            target="_blank"
                            rel="noopener noreferrer">{capitalize(url.type)}</a>
                    })}
                </div>
            </div>
            <div className="modalFooter">
                <button className="modalBtn" onClick={closeModal}>Fermer</button>
            </div>
        </Fragment>
    ) : (
        <Fragment>
            <div className="modalHeader">
                <h2>Réponse de marvel</h2>
            </div>
            <div className="modalBody">
                <Loader/>
            </div>
        </Fragment>
    )

    return(
        <Fragment>
            {decision}
            <hr/>
            <p>Les réponses aux questions posées:</p>

            <div className="answerContainer">
                <table className="answers">
                    <thead>
                    <tr>
                        <th>Question</th>
                        <th>Réponses</th>
                        <th>Infos</th>
                    </tr>
                    </thead>
                    <tbody>
                        {body}
                    </tbody>
                </table>
            </div>
            <Modal showModal={openModal}>
                {resultInModal}
            </Modal>
        </Fragment>
    )
})

export default React.memo(QuizOver)