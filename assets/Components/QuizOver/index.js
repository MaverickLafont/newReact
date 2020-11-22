import React, {Fragment, useEffect, useState} from 'react';
import {GiTrophyCup} from "react-icons/gi";

const QuizOver = React.forwardRef((props, ref) => {

    const {levelNames, score, maxQuestions, quizLevel, percent, loadLevelQuestions} = props;
    const [question, setQuestion] = useState([]);
    //Retourne la moyenne
    const averageGrade = maxQuestions / 2;

    useEffect(() => {
        setQuestion(ref.current)
    }, [ref])

    /**
     * Si score plus petit que la moyenne on redirige accueil
     */
    if(score < averageGrade) {
        setTimeout(() => loadLevelQuestions(quizLevel), 3000);
    }

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
                        <button className="btnInfo">INFOS</button>
                    </td>
                </tr>
            )
        })
    ) :
        (
            <tr>
                <td colSpan="3">
                    <div className="loader"></div>
                    <p style={{textAlign: 'center', color: 'red'}}>
                        Pas de réponse!
                    </p>
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
        </Fragment>
    )
})

export default React.memo(QuizOver)