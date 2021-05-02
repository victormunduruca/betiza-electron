import React, { useEffect, useState } from "react";
import uuid from "react-uuid";

import { Radio, Layout, Menu, Typography, Button, PageHeader, Row, Col } from "antd";

import TypeSelector from "./TypeSelector";
import TextStimulusCreator from "./StimulusCreator";

import AnswerCreationArea from "./AnswerCreationArea";
import SideBar from "./SideBar";
import StimulusCreationArea from "./StimulusCreationArea";

const { Content } = Layout;
const { Title } = Typography;




const fs = window.require('fs');


export default function QuizCreator(props) {
    const [questions, setQuestions] = useState(props.questions);     //Array of questions objects
    const [answersContent, setAnswersContent] = useState([]); // Keeps track of answers input 
    const [stimulusContent, setStimulusContent] = useState(""); // Keeps track of stimulus input
    const [stimulusType, setStimulusType] = useState("text"); // Keeps track of stimulus radio button
    const [answerType, setAnswerType] = useState("text"); // Keeps track of stimulus radio button
    const [selectedQuestionKey, setSelectedQuestionKey] = useState(0); //Keeps track of the correct answer key

    const [correctStates, setCorrectStates] = useState([false, false, false, false]); //Keeps an array with the value of checkboxes (correct answers or not)

    function addQuestion() {
        //create new question component
        let newQuestionKey = uuid();
        setQuestions(prevQuestions => {
            return [...prevQuestions, {key: newQuestionKey, stimulus: "", stimulusType: "text", answers: [], answerType: "text"}]; //Add new empty question to questions
        })
    }
    //onChangeSelectedQuestion -> update view from the array or file
    function onSelectedQuestionChange(e) {
        let selectedQuestionKey = e.key;
        setSelectedQuestionKey(selectedQuestionKey);
        setStimulusType(getQuestion(selectedQuestionKey).stimulusType); 
        setStimulusContent(getQuestion(selectedQuestionKey).stimulus);
        setAnswersContent(getQuestion(selectedQuestionKey).answers.map(answer => answer.value)); //Puts an array of selected question's answers to answers content array
        setAnswerType(getQuestion(selectedQuestionKey).answerType);
        
        let newCorrectedStates = [false, false, false, false]; 
        newCorrectedStates[getQuestion(selectedQuestionKey).correctAnswerKey] = true;
        setCorrectStates(newCorrectedStates)
    }

    useEffect(() => {
        console.log(props.questions);
        onSelectedQuestionChange(props.questions[0]); //Loads questions from file if applicable TODO trocar
    }, []);

    const [questionsString, setQuestionString] = useState("");
    useEffect(() => {
        setQuestionString(JSON.stringify(questions));
    }, [questions, answersContent, stimulusContent, correctStates])

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

    function onCorrectAnswerChange(checked, answerKey) {
        let newCorrectedStates = [false, false, false, false]; //Only one answer can be right, so an empty array is initialized
        if(checked) {
            newCorrectedStates[answerKey] = true; //If the answer was checked corrected
            getQuestion(selectedQuestionKey).correctAnswerKey = answerKey; //Updates the questions array
        }
        setCorrectStates(newCorrectedStates);
    }

    function getQuestion(key) {
        return questions.find((question) => {
            return question.key == key;
        });
    }



    return (
        <Layout>
            <Button onClick={fs.writeFileSync('questionsText.json', questionsString)}>CLica pra salvar</Button>
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
                <SideBar questions={questions} onAddQuestion={addQuestion} onSelectedQuestionChange={onSelectedQuestionChange} selectedQuestionKey={selectedQuestionKey}/>
                <Content>
                    <StimulusCreationArea 
                        onStimulusChange={onStimulusChange} 
                        value={stimulusContent} 
                        stimulusType={stimulusType} 
                        onStimulusTypeChange={onStimulusTypeChange}
                        />
                    <AnswerCreationArea 
                        onAnswerChange={onAnswerChange} 
                        value={answersContent} 
                        answerType={answerType} 
                        onAnswerTypeChange={onAnswerTypeChange}
                        onCorrectAnswerChange={onCorrectAnswerChange}
                        correctStates={correctStates}
                    />
                </Content>
            </Layout>
        </Layout>
    );
}