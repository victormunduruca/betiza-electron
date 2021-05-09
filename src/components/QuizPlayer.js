import React, { useState, useEffect }from "react";
import { useHistory } from "react-router-dom";

import { message, Card, Row, Col, Switch , Modal} from 'antd';
import QuizElement from "./QuizElement";
import { SmileTwoTone , MehTwoTone, CrownTwoTone, InfoCircleTwoTone} from '@ant-design/icons';




function QuizPlayer(props) {
    let startSweepId;

    const [currentQuestion, setCurrentQuestion] = useState(props.questions[0]); //sets the first question as current one
    const [isSweepPaused, setIsSweepPaused] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false); //Used in the escape confirmation
    const history = useHistory(); //Used to go back to home after quiz is finished

   currentQuestion.stimulusType == "sound" ? startSweepId = 0 : startSweepId = 1;
    console.log(startSweepId);
    
    const [focusItem, setfocusItem] = useState(startSweepId);

    useEffect(() => {
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, []);
    

    function handleEscape(event) {
        const keyName = event.key;
        if(keyName == "Escape") {
            setIsModalVisible(true);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if(!isSweepPaused)
                setfocusItem(focusItem == 4 ? startSweepId : focusItem + 1);

        }, 1000);
        return () => clearInterval(interval);
      }, [focusItem, setfocusItem, isSweepPaused]);

    

    function onElementClicked(answerId) {
        if(answerId == currentQuestion.correctAnswerKey) { // Check if answer was correct 
            setIsSweepPaused(true)
            message.success({
                content:  "Boaa! você acertou.",
                className: "feedback-message",
                icon: <SmileTwoTone style={{fontSize: "5rem"}} twoToneColor="#52c41a"/>,
                duration: 2,
            })
            .then(() => {
                let currentIndex = props.questions.indexOf(currentQuestion);
                console.log(currentIndex);
                if(currentIndex < props.questions.length - 1) {
                    console.log(props.questions.length);
                    setCurrentQuestion(props.questions[currentIndex + 1]);
                } else {
                    message.success({
                        content:  "Parabéens, você terminou a atividade!",
                        className: "feedback-message",
                        icon: <CrownTwoTone style={{fontSize: "5rem"}} twoToneColor="#fce33f"/>,
                        duration: 2,
                    }).then(() => history.push("/"));
                }
                setIsSweepPaused(false)
                setfocusItem(startSweepId);
            })
        } else {
            setIsSweepPaused(true)
            message.error({
                content: "Ops, resposta errada.",
                className: "feedback-message",
                icon: <MehTwoTone style={{fontSize: "5rem"}} twoToneColor="#FF2F3A"/>,
                duration: 1,
            }).then(() => setIsSweepPaused(false));
        }

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
            <Modal 
                title="Aviso"
                visible={isModalVisible}
                onOk={() => {
                    setIsModalVisible(false)
                    history.push("/");
                }}
                onCancel={() => setIsModalVisible(false)}
                icon={<InfoCircleTwoTone />}
            >
                <p>Tem certeza que gostaria de sair da atividade?</p>
            </Modal>
        </div>
    );
}

export default QuizPlayer;