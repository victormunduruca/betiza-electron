import React, { useEffect, useState } from "react";
import { Radio, Layout, Menu, Typography, Button, PageHeader, Row, Col } from "antd";

import TypeSelector from "./TypeSelector";
import TextStimulusCreator from "./StimulusCreator";

import AnswerCreationArea from "./AnswerCreationArea";
import SideBar from "./SideBar";
import StimulusCreationArea from "./StimulusCreationArea";

const { Content } = Layout;
const { Title } = Typography;



/*
    const question = {  
        key: 0
        answers: [{key: 0, type: "", content: ""}]
    }
*/
let index = 0; //TODO Delete
const fs = window.require('fs');


export default function QuizCreator(props) {
    const [questions, setQuestions] = useState(props.questions);     //Array of questions objects
    const [answersContent, setAnswersContent] = useState([]); // Keeps track of answers input 
    const [stimulusContent, setStimulusContent] = useState(""); // Keeps track of stimulus input
    
    const [selectedQuestionKey, setSelectedQuestionKey] = useState(0);

    function addQuestion() {
        //create new question component
        index+=1;
        setQuestions(prevQuestions => {
            return [...prevQuestions, {key: index, stimulus: {}, answers: []}]; //Add new empty question to questions
        })
    }
    //onChangeSelectedQuestion -> update view from the array
    function onSelectedQuestionChange(e) {
        let selectedQuestionKey = e.key;
        setSelectedQuestionKey(selectedQuestionKey);
        setStimulusContent(getQuestion(selectedQuestionKey).stimulus.value);
        setAnswersContent(getQuestion(selectedQuestionKey).answers.map(answer => answer.value)); //Puts an array of selected question's answers to answers content array
    }

    useEffect(() => {
        console.log(props.questions);
        onSelectedQuestionChange({key: 0}); //Loads questions from file if applicable 
    }, []);

    const [questionsString, setQuestionString] = useState("");
    useEffect(() => {
        setQuestionString(JSON.stringify(questions));
    }, [questions, answersContent, stimulusContent])


    // useEffect(() => {
    //     let test = questions.find((question) => {
    //         return question.key === selectedQuestionKey;
    //     });
    //     console.log(test);
    // }, [selectedQuestionKey, questions])

    function onAnswerChange(answerValue, answerKey, answerType) {
        getQuestion(selectedQuestionKey).answers[answerKey] = {key: answerKey, type: answerType, value: answerValue}; //Changes value of one of 4 fixed ansewers

        let answersContentCopy = [...answersContent]; //Makes a copy of answer copy array and updates the value of state at that index
        answersContentCopy[answerKey] = answerValue; 
        setAnswersContent(answersContentCopy); 
    }   

    function onStimulusChange(stimulusValue, stimulusType) {
        getQuestion(selectedQuestionKey).stimulus = {type: stimulusType, value: stimulusValue};  //Add stimulus to question array
        setStimulusContent(stimulusValue);
        console.log(stimulusValue);
    }

    function getQuestion(key) {
        return questions.find((question) => {
            return question.key == key;
        });
    }



    return (
        <Layout>
            <Button onClick={fs.writeFileSync('questions.json', questionsString)}>CLica pra salvar</Button>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title="Nome Atividade"
                extra={[
                    <Button key="2">Visualizar</Button>,
                    <Button key="1" type="primary">
                        Salvar Atividade
                            </Button>,
                ]}
            />
            <Layout>
                <SideBar questions={questions} onAddQuestion={addQuestion} onSelectedQuestionChange={onSelectedQuestionChange}/>
                <Content>
                    <h1>{selectedQuestionKey}</h1>
                    <StimulusCreationArea onStimulusChange={onStimulusChange} value={stimulusContent}/>
                    <AnswerCreationArea onAnswerChange={onAnswerChange} value={answersContent}/>
                </Content>
            </Layout>
        </Layout>
    );
}