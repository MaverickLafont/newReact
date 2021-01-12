import React, {Component, Fragment} from 'react';
import {Data} from './data';
import Levels from "./levels";
import ProgressBar from "./progressBar";
import QuizOver from "../QuizOver";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FaChevronRight} from 'react-icons/fa'

toast.configure();

const initial = {
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
    btnNextName: 'Suivant',
    percent: null
}

const levelNames = ["debutant", "confirme", "expert"];

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
 *
 *      storedDataRef: contient les questions et réponses
 */
class Quiz extends Component{
    constructor(props) {
        super(props);
        this.state = initial;
        this.storedDataRef = React.createRef();
    }

    /**
     * Methode qui charge les questions dans le state de type array storedQuestions.
     * Il y a un max de question qui est a 10. Si supérieur à 10 on envoie un erreur sinon on
     * store dans le state storedQuestions
     * On ne garde que les questions cad sans la réponse.
     * @param level
     */
    loadQuestions = level => {
        const fetchedArrayQuiz = Data[0].quizz[level];
        if(fetchedArrayQuiz.length >= this.state.maxQuestion){
            this.storedDataRef.current = fetchedArrayQuiz;
            const newArray = fetchedArrayQuiz.map(({ answer, ...keepRest}) => keepRest);

            this.setState({storedQuestions: newArray})
        }
    }

    /**
     * Fonction qui affiche bonjour + pseudo à l'utilisateur, seulement une fois sur la page welcome
     * Le toast est affiché uniquement si showWelcomeMsg est à false. Après execution on le passe a vrai
     * @param pseudo
     */
    showToastMsg = pseudo => {
        if(!this.state.showWelcomeMsg){
            //On passe le state en true pour ne plus afficher le message welcome
            this.setState({showWelcomeMsg: true})

            toast.warn(`Bienvenue ${pseudo}, et bonne chance !`, {
                position: "top-right",
                autoClose: 6000,
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
        this.loadQuestions(levelNames[this.state.quizLevel])
    }

    /**
     * Une fois qu'il y a eu une maj sur un state :
     *
     * On change les states question et options par les suivants
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps, prevState){
        const {maxQuestion,
            storedQuestions,
            idQuestion,
            score,
            quizEnd
        } = this.state;

        if((storedQuestions !== prevState.storedQuestions) && storedQuestions.length){
            this.setState({
                question: storedQuestions[idQuestion].question,
                options: storedQuestions[idQuestion].options
            })
        }
        if((idQuestion !== prevState.idQuestion) && storedQuestions.length){
            this.setState({
                question: storedQuestions[idQuestion].question,
                options: storedQuestions[idQuestion].options,
                userAnswer: null,
                btnDisabled: true
            })
        }

        if(quizEnd !== prevState.quizEnd){
            // Retourne le score en pourcentage
            const gradePercent = (score / maxQuestion) * 100;
            this.gameOver(gradePercent);
        }

        //TODO ça affiche pas le message bijour
        if(this.props.user.pseudo){
            this.showToastMsg(this.props.user.pseudo)
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
     * Fonction qui est appelé par le "bouton suivant"
     *
     * On passe l'idQuestion à +1 pour passer à la prochaine question
     * On verifie ici si la reponse est juste pour afficher un toast success ou error
     */
    nextQuestion = () => {
        //fin du quiz (apres avoir clicker sur terminer)
        if(this.state.idQuestion === this.state.maxQuestion - 1){
            // on indique qu'on est a la fin du quiz pour passer dans le componentDidUpdate
            this.setState({quizEnd: true})
        } else {
            this.setState(prevState => ({ idQuestion: prevState.idQuestion + 1 }))
        }

        if( this.state.userAnswer === this.storedDataRef.current[this.state.idQuestion].answer){
            this.setState(prevState => ({ score: prevState.score + 1 }))
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
     * Function appelé à la fin d'un lvl du quiz
     *
     * Ajoute un niveau au state quizLevel et passe au state percent le pourcentage
     * de réussite
     */
    gameOver = percent => {
        if(percent >= 50){
            this.setState(prevState => ({
                quizLevel: prevState.quizLevel + 1,
                percent
            }))
        } else {
            this.setState({ percent })
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

    /**
     * Methode appelé dans le quizOver/index.js afin de charger le prochain niveau
     * @param param
     */
    loadLevelQuestions = param => {
        this.setState({...initial, quizLevel: param})

        this.loadQuestions(levelNames[param]);
    }

    render() {
        const {quizLevel,
            maxQuestion,
            question,
            options,
            idQuestion,
            btnDisabled,
            userAnswer,
            score,
            quizEnd,
            percent
        } = this.state;

        const displayOptions = options.map((option, index) => {
            return (
                <p key={index}
                   onClick={() => this.submitAnswer(option)}
                   className={`answerOptions ${userAnswer === option ? 'selected' : null}`}>
                    <FaChevronRight /> {option}
                </p>

            )
        })

        return quizEnd ? (
            <QuizOver ref={this.storedDataRef}
                      levelNames={levelNames}
                      score={score}
                      maxQuestions={maxQuestion}
                      quizLevel={quizLevel}
                      percent={percent}
                      loadLevelQuestions={this.loadLevelQuestions}
            />
        ) : (
            <Fragment>
                <Levels
                    levelsName={levelNames}
                    quizLevel={quizLevel}
                />
                <ProgressBar
                    idQuestion={idQuestion}
                    maxQuestion={maxQuestion}
                />
                <h2>{question}</h2>
                {displayOptions}
                <button className="btnSubmit" disabled={btnDisabled} onClick={() => this.nextQuestion()}>{this.btnNextName()}</button>
            </Fragment>
        )
    }
}
export default Quiz