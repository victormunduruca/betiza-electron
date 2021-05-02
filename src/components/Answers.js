import React, { useState, useEffect }from "react";
import { Card, Row, Col, Switch } from 'antd';
import QuizElement from "./QuizElement";

import answers from './TestAnswers'
import AudioSelector from "./AudioSelector";

function Answers(props) {
    const [focusItem, setfocusItem] = useState(0);

    function changeFocus() {
        setfocusItem(focusItem == 3 ? 0 : focusItem + 1);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            changeFocus();
            // if(audioSrc !== "") {
            //     let audio = new Audio(audioSrc);
            //     audio.play();
            // }
        }, 1000);
        return () => clearInterval(interval);
      }, [focusItem, setfocusItem]);


    const [checkedState, setCheckedState] = useState(false);

    function onChange(checked) {
        setCheckedState(!checkedState);
    }



    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col className="gutter-row" span={12}>
                    <QuizElement id = {0} type = {props.question.answerType} value = {props.question.answers[0].value} focusedItem = {focusItem}/>
                </Col>
                <Col className="gutter-row" span={12}>
                    <QuizElement id = {1} type = {props.question.answerType} value = {props.question.answers[1].value} focusedItem = {focusItem}/>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col className="gutter-row" span={12}>
                    <QuizElement id = {2} type = {props.question.answerType} value = {props.question.answers[2].value} focusedItem = {focusItem}/>
                </Col>
                <Col className="gutter-row" span={12}>
                    <QuizElement id = {3} type = {props.question.answerType} value = {props.question.answers[3].value} focusedItem = {focusItem}/>
                </Col>
            </Row>
        </div>
    );
}

export default Answers;