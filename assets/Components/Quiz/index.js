import React, {Component, Fragment} from 'react';
import {Data} from './data';
import Levels from "./levels";
import ProgressBar from "./progressBar";
import QuizOver from "../QuizOver";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

/**
 * Chargement des states :
 *
 *      levelNames: niveau des questions
 *      quizLevel: id qui choisit l'élément dans du tableau levelNames
 *      maxQuestions: nombre de question max
 *      storedQuestions: les questions
 *      options: les reponses disponibles
 *      idQuestion: id qui choisit l'élément du tableau storedQuestions
 *      btnDisabled: permet de savoir si le bouton "Suivant" est disabled ou pas
 *      userAnswer: la reponse que l'utilisateur a choisit
 *      score: Le score de l'utilisateur (+1 si bonne reponse)
 *      showWelcomeMsg: Si false affiche message bienvenu
 *      quizEnd: Permet de savoir si le quiz est fini pour ce niveau
 *      btnNextName: Le nom du bouton
 */
class Quiz extends Component{
    state = {
        levelNames: ["debutant", "confirme", "expert"],
        quizLevel: 0,
        maxQuestion: 10,
        storedQuestions: [],
        question: null,
        options: [],
        idQuestion: 0,
        btnDisabled: true,
        userAnswer: null,
        score: 0,
        showWelcomeMsg: false,
        quizEnd : false,
        btnNextName: 'Suivant'
    }

    //On stock ici les données dont les réponses
    storedDataRef = React.createRef();

    /**
     * Methode qui charge les questions dans le state de type array storedQuestions.
     * Il y a un max de question qui est a 10. Si supérieur à 10 on envoie un erreur sinon on
     * store dans le state storedQuestions
     * On ne garde que les qestions cad sans la réponse.
     * @param level
     */
    loadQuestions = level => {
        const fetchedArrayQuiz = Data[0].quizz[level];
        if(fetchedArrayQuiz.length >= this.state.maxQuestion){
            this.storedDataRef.current = fetchedArrayQuiz;
            const newArray = fetchedArrayQuiz.map(({ answer, ...keepRest}) => keepRest);

            this.setState({
                storedQuestions: newArray
            })
        } else {
            console.log("Pas assez de question");
        }
    }

    /**
     * Fonction qui affiche bonjour + pseudo à l'utilisateur, seulement une fois sur la page welcome
     * Le toast est affiché uniquement si showWelcomeMsg est à false. Après execution on le passe a vrai
     * @param pseudo
     */
    showWelcomeMessage = pseudo => {
        if(this.state.showWelcomeMsg === false){
            //On passe le state en true pour ne plus afficher le message welcome
            this.setState({
                showWelcomeMsg: true
            })

            toast.warn(`Bienvenu ${pseudo}, et bonne chance !`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        }
    }

    /**
     * Seulement après montage du dom on charge les questions
     */
    componentDidMount(){
        this.loadQuestions(this.state.levelNames[this.state.quizLevel])
    }

    /**
     * Une fois qu'il y a eu une maj sur un state :
     *
     * On change les states question et options par les suivants
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps, prevState){
        if(this.state.storedQuestions !== prevState.storedQuestions){
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options
            })
        }
        if(this.state.idQuestion !== prevState.idQuestion){
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options,
                userAnswer: null,
                btnDisabled: true
            })
        }
        if(this.props.user.pseudo){
            this.showWelcomeMessage(this.props.user.pseudo)
        }
    }

    /**
     * Function sur l'évenement onclick d'une reponse (<p>)
     * @param selectedAnswer
     */
    submitAnswer = selectedAnswer => {
        this.setState({
            userAnswer: selectedAnswer,
            btnDisabled: false
        })
    }

    /**
     * Fonction qui est appelé par le bouton suivant
     *
     * On passe l'idQuestion à +1 pour passer à la prochaine question
     * On verifie ici si la reponse est juste pour afficher un toast success ou error
     */
    nextQuestion = () => {
        //fin du quiz
        if(this.state.idQuestion === this.state.maxQuestion - 1){
            this.setState({
                quizEnd: true
            })
        } else {
            this.setState(prevState => ({
                idQuestion: prevState.idQuestion + 1
            }))
        }

        if( this.state.userAnswer === this.storedDataRef.current[this.state.idQuestion].answer){
            this.setState(prevState => ({
                score: prevState.score + 1
            }))
            toast.success('Bravo ! +1', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error('aaaarrrghhhh !', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }

    /**
     * Fonction qui renvoie le nom du bouton soit "Suivant" soit "Terminer".
     * Si l'utilisateur se trouve sur la dernière question on affiche terminer sinon suivant
     * @returns {string}
     */
    btnNextName = () => {
        if (this.state.idQuestion < this.state.maxQuestion - 1){
            return "Suivant";
        }
        return "Terminer";
    }

    render() {
        const displayOptions = this.state.options.map((option, index) => {
            return <p key={index} onClick={() => this.submitAnswer(option)} className={`answerOptions ${this.state.userAnswer === option ? 'selected' : null}`}>{option}</p>
        })

        return this.state.quizEnd ? (
            <QuizOver ref={this.storedDataRef}/>
        ) : (
            <Fragment>
                <Levels/>
                <ProgressBar
                    idQuestion={this.state.idQuestion}
                    maxQuestion={this.state.maxQuestion}
                />
                <h2>{this.state.question}</h2>
                {displayOptions}
                <button className="btnSubmit" disabled={this.state.btnDisabled} onClick={() => this.nextQuestion()}>{this.btnNextName()}</button>
            </Fragment>
        )


    }
}
export default Quiz