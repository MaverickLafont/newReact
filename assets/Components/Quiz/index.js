import React, {Component} from 'react';
import {Data} from './data';
import Levels from "./levels";
import ProgressBar from "./progressBar";

class Quiz extends Component{
    state = {
        levelNames: ["debutant", "confirme", "expert"],
        quizLevel: 0,
        maxQuestion: 10,
        storedQuestions: [],
        question: null,
        options: []
    }

    loadQuestions = level => {
        const fetchedArrayQuiz = Data[0].quizz[level];
        if(fetchedArrayQuiz.length >= this.state.maxQuestion){
            const newArray = fetchedArrayQuiz.map(({ answer, ...keepRest}) => keepRest);

            this.setState({
                storedQuestions: newArray
            })
        } else {
            console.log("Pas assez de question");
        }
    }

    componentDidMount(){
        this.loadQuestions(this.state.levelNames[this.state.quizLevel])
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.storedQuestions !== prevState.storedQuestions){
            this.setState({
                question: this.state.storedQuestions[0]
            })
        }
    }

    render() {

        return (
            <div>
                <Levels/>
                <ProgressBar/>
                <h2>Notre question quiz</h2>
                <p className="answerOptions">Question 1</p>
                <p className="answerOptions">Question 2</p>
                <p className="answerOptions">Question 3</p>
                <p className="answerOptions">Question 4</p>
                <button className="btnSubmit">Suivant</button>
            </div>
        )
    }
}
export default Quiz