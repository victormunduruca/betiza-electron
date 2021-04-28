import React, { useState, useEffect }from "react";
import { Card, Row, Col, Switch } from 'antd';
import QuizElement from "./QuizElement";
import CheckBox from "./CheckBox";
//import GatoSound from './gato.mp3';
//import useSound from 'use-sound';
import answers from './TestAnswers'

function Answers() {
    const [focusItem, setfocusItem] = useState(0);

    function changeFocus() {
        setfocusItem(focusItem == 3 ? 0 : focusItem + 1);
    }

    // const [play] = useSound("./src/components/gato.mp3");

    useEffect(() => {
        const interval = setInterval(() => {
           // console.log("teste " + focusItem);
            changeFocus();
            if(checkedState) {
                // play();
            }
        }, 1000);
        return () => clearInterval(interval);
      }, [focusItem, setfocusItem]);


    const [checkedState, setCheckedState] = useState(false);

    function onChange(checked) {
        setCheckedState(!checkedState);
    }

    return (
        <div>
            <Switch onChange={onChange} />
            <h2>{checkedState}</h2> 
            <Row gutter={[16, 16]}>
                <Col className="gutter-row" span={12}>
                    <QuizElement answerId = {answers[0].id} type = {answers[0].type} content = {answers[0].content} focusedItem = {focusItem}/>
                </Col>
                <Col className="gutter-row" span={12}>
                    <QuizElement answerId = {answers[1].id} type = {answers[1].type} content = {answers[1].content} focusedItem = {focusItem}/>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col className="gutter-row" span={12}>
                    <QuizElement answerId = {answers[2].id} type = {answers[2].type} content = {answers[2].  content} focusedItem = {focusItem}/>
                </Col>
                <Col className="gutter-row" span={12}>
                    <QuizElement answerId = {answers[3].id} type = {answers[3].type} content = {answers[3].content} focusedItem = {focusItem}/>
                </Col>
            </Row>
        </div>
    );
}

export default Answers;