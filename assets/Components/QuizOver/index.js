import React, {Fragment, useEffect, useState} from 'react';
import {GiTrophyCup} from "react-icons/gi";
import Loader from "../Loader";
import Modal from "./modal";

const QuizOver = React.forwardRef((props, ref) => {

    const {levelNames, score, maxQuestions, quizLevel, percent, loadLevelQuestions} = props;
    const [question, setQuestion] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    //Retourne la moyenne
    const averageGrade = maxQuestions / 2;

    const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;

    console.log(API_PUBLIC_KEY);

    const hash = '45ac438bbbf9a9fa4e9bcd08503b5594';

    useEffect(() => {
        setQuestion(ref.current)
    }, [ref]);

    /**
     * Affiche la modal avec les infos
     * @param id
     */
    const showModal = id => {
        setOpenModal(true);
    }

    /**
     * Ferme la modal
     */
    const closeModal = () => {
        setOpenModal(false);
    }

    /**
     * Si score plus petit que la moyenne on redirige accueil
     */
    if(score < averageGrade) {
        setTimeout(() => loadLevelQuestions(quizLevel), 3000);
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
                <p className="failureMsg">Hélas mon ami, tu as échoué</p>
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
            <Modal showModal={openModal} closeModal={closeModal}>
                <div className="modalHeader">
                    <h2>Titre</h2>
                </div>
                <div className="modalBody">
                    <h3>Titre 2</h3>
                </div>
                <div className="modalFooter">
                    <button className="modalBtn">Fermer</button>
                </div>
            </Modal>
        </Fragment>
    )
})

export default React.memo(QuizOver)