import React, { useEffect, useState } from "react";
import { Radio, Layout, Menu, Typography, Button, PageHeader, Row, Col } from "antd";

import TypeSelector from "./TypeSelector";
import TextStimulusCreator from "./StimulusCreator";

import AnswerCreationArea from "./AnswerCreationArea";
import SideBar from "./SideBar";
import StimulusCreationArea from "./StimulusCreationArea";

const { Content } = Layout;
const { Title } = Typography;




let index = 0; //TODO Delete
const fs = window.require('fs');


export default function QuizCreator(props) {
    const [questions, setQuestions] = useState(props.questions);     //Array of questions objects
    const [answersContent, setAnswersContent] = useState([]); // Keeps track of answers input 
    const [stimulusContent, setStimulusContent] = useState(""); // Keeps track of stimulus input
    const [stimulusType, setStimulusType] = useState("text"); // Keeps track of stimulus radio button
    const [answerType, setAnswerType] = useState("text"); // Keeps track of stimulus radio button

    const [selectedQuestionKey, setSelectedQuestionKey] = useState(0);

    function addQuestion() {
        //create new question component
        index+=1;
        setQuestions(prevQuestions => {
            return [...prevQuestions, {key: index, stimulus: "", stimulusType: "text", answers: [], answerType: "text"}]; //Add new empty question to questions
        })
    }
    //onChangeSelectedQuestion -> update view from the array or file
    function onSelectedQuestionChange(e) {
        let selectedQuestionKey = e.key;
        //Set Stimulus and Answer radios
        //If Stimulus type is the same as 
        setSelectedQuestionKey(selectedQuestionKey);
        setStimulusType(getQuestion(selectedQuestionKey).stimulusType); 
        setStimulusContent(getQuestion(selectedQuestionKey).stimulus);
        setAnswersContent(getQuestion(selectedQuestionKey).answers.map(answer => answer.value)); //Puts an array of selected question's answers to answers content array
        setAnswerType(getQuestion(selectedQuestionKey).answerType);
    }

    useEffect(() => {
        console.log(props.questions);
        onSelectedQuestionChange({key: 0}); //Loads questions from file if applicable TODO trocar
    }, []);

    const [questionsString, setQuestionString] = useState("");
    useEffect(() => {
        setQuestionString(JSON.stringify(questions));
    }, [questions, answersContent, stimulusContent])

    function onAnswerChange(answerValue, answerKey, answerType) {
        getQuestion(selectedQuestionKey).answers[answerKey] = {key: answerKey, value: answerValue}; //Changes value of one of 4 fixed ansewers

        let answersContentCopy = [...answersContent]; //Makes a copy of answer array and updates the value of state at that index
        answersContentCopy[answerKey] = answerValue; 
        setAnswersContent(answersContentCopy);  
    }   

    function onStimulusChange(stimulusValue, stimulusType) {
        getQuestion(selectedQuestionKey).stimulus = stimulusValue;  //Add stimulus to question array
        setStimulusContent(stimulusValue);
        console.log(stimulusValue);
    }

    function onStimulusTypeChange(stimulusType) {
        getQuestion(selectedQuestionKey).stimulusType = stimulusType; //Sets selected question's type as the current stimulusType
        setStimulusType(stimulusType);
    }

    function onAnswerTypeChange(answerType) {
        getQuestion(selectedQuestionKey).answerType = answerType;
        setAnswerType(answerType);
    }

    function getQuestion(key) {
        return questions.find((question) => {
            return question.key == key;
        });
    }



    return (
        <Layout>
            {/* <Button onClick={fs.writeFileSync('questions.json', questionsString)}>CLica pra salvar</Button> */}
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
                    <StimulusCreationArea onStimulusChange={onStimulusChange} value={stimulusContent} stimulusType={stimulusType} onStimulusTypeChange={onStimulusTypeChange}/>
                    <AnswerCreationArea onAnswerChange={onAnswerChange} value={answersContent} answerType={answerType} onAnswerTypeChange={onAnswerTypeChange}/>
                </Content>
            </Layout>
        </Layout>
    );
}