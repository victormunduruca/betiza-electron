import React, { useState, useEffect }from "react";
import { Card, Row, Col, Switch } from 'antd';
import QuizElement from "./QuizElement";

function QuizPlayer(props) {
    let startSweepId;
    props.question.stimulusType == "sound" ? startSweepId = 0 : startSweepId = 1;
    
    const [focusItem, setfocusItem] = useState(startSweepId);
    useEffect(() => {
        const interval = setInterval(() => {
            setfocusItem(focusItem == 4 ? startSweepId : focusItem + 1);
        }, 1000);
        return () => clearInterval(interval);
      }, [focusItem, setfocusItem]);


    function onElementClicked(answerId) {
        if(answerId == props.question.correctAnswerKey) {
            console.log("Uhuuuul resposta correta");
        }
    }

    return (
        <div>
            <QuizElement sweepId = {0} type = {props.question.stimulusType} clickable = {false} value = {props.question.stimulus} focusedItem = {focusItem} />
            <Row gutter={[16, 16]}>
                <Col className="gutter-row" span={12}>
                    <QuizElement sweepId = {1} answerId = {0} clickable onElementClicked = {onElementClicked} type = {props.question.answerType} value = {props.question.answers[0].value} focusedItem = {focusItem} />
                </Col>
                <Col className="gutter-row" span={12}>
                    <QuizElement sweepId = {2} answerId = {1} clickable onElementClicked = {onElementClicked} type = {props.question.answerType} value = {props.question.answers[1].value} focusedItem = {focusItem} />
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col className="gutter-row" span={12}>
                    <QuizElement sweepId = {3} answerId = {2} clickable onElementClicked = {onElementClicked} type = {props.question.answerType} value = {props.question.answers[2].value} focusedItem = {focusItem} />
                </Col>
                <Col className="gutter-row" span={12}>
                    <QuizElement sweepId = {4} answerId = {3} clickable onElementClicked = {onElementClicked} type = {props.question.answerType} value = {props.question.answers[3].value} focusedItem = {focusItem} />
                </Col>
            </Row>
        </div>
    );
}

export default QuizPlayer;