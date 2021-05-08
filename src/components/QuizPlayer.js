import React, { useState, useEffect }from "react";
import { Card, Row, Col, Switch } from 'antd';
import QuizElement from "./QuizElement";

function QuizPlayer(props) {
    let startSweepId;
    let currentQuestionIndex = 0; //TODO Delete

    const [currentQuestion, setCurrentQuestion] = useState(props.activity.questions[0]); //sets the first question as current one

    currentQuestion.stimulusType == "sound" ? startSweepId = 0 : startSweepId = 1;
    
    const [focusItem, setfocusItem] = useState(startSweepId);
    useEffect(() => {
        const interval = setInterval(() => {
            setfocusItem(focusItem == 4 ? startSweepId : focusItem + 1);
        }, 1000);
        return () => clearInterval(interval);
      }, [focusItem, setfocusItem]);


    function onElementClicked(answerId) {
        if(answerId == currentQuestion.correctAnswerKey) { // Check if answer was correct 
            console.log("Uhuuuul resposta correta");
            let currentIndex = props.questions.indexOf(currentQuestion);
            console.log(currentIndex);
            if(currentIndex < props.questions.length) {
                console.log(props.questions.length);
                setCurrentQuestion(props.questions[currentIndex + 1]);
            }
        } else {
            console.log("Oppsss errou");
        }
        //Give feedback and go to next question
    }

    return (
        <div className="quiz-player-container">
            <div style={{marginBottom: "32px"}}>
                <QuizElement sweepId = {0} type = {currentQuestion.stimulusType} clickable = {false} value = {currentQuestion.stimulus} focusedItem = {focusItem}/>
            </div>
            <Row gutter={[16, 4]}>
                <Col className="gutter-row" span={12}>
                    <QuizElement sweepId = {1} answerId = {0} clickable onElementClicked = {onElementClicked} type = {currentQuestion.answerType} value = {currentQuestion.answers[0].value} focusedItem = {focusItem} />
                </Col>
                <Col className="gutter-row" span={12}>
                    <QuizElement sweepId = {2} answerId = {1} clickable onElementClicked = {onElementClicked} type = {currentQuestion.answerType} value = {currentQuestion.answers[1].value} focusedItem = {focusItem} />
                </Col>
                <Col className="gutter-row" span={12}>
                    <QuizElement sweepId = {3} answerId = {2} clickable onElementClicked = {onElementClicked} type = {currentQuestion.answerType} value = {currentQuestion.answers[2].value} focusedItem = {focusItem} />
                </Col>
                <Col className="gutter-row" span={12}>
                    <QuizElement sweepId = {4} answerId = {3} clickable onElementClicked = {onElementClicked} type = {currentQuestion.answerType} value = {currentQuestion.answers[3].value} focusedItem = {focusItem} />
                </Col>
            </Row>
        </div>
    );
}

export default QuizPlayer;