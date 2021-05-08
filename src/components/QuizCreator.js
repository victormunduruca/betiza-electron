import React, { useEffect, useState } from "react";
import uuid from "react-uuid";

import { Modal, Input, Layout, Typography, Button, PageHeader} from "antd";


import AnswerCreationArea from "./AnswerCreationArea";
import SideBar from "./SideBar";
import StimulusCreationArea from "./StimulusCreationArea";

import {
    Link, useHistory
} from "react-router-dom";


const { Content } = Layout;
const { Title } = Typography;




const fs = window.require('fs');


export default function QuizCreator(props) {
    var startingQuestions, startingActivityName = "";
    //If in edit or view, there will be a activity prop, else, create blank starting array
    if (!props.create){
        startingQuestions = props.activity.questions;
        startingActivityName = props.activity.name;
    } else {
        startingQuestions = [{ key: uuid(), stimulus: "", stimulusType: "text", answers: [], answerType: "text" }];
    }

    const [questions, setQuestions] = useState(startingQuestions);     //Array of questions objects
    const [answersContent, setAnswersContent] = useState([]); // Keeps track of answers input 
    const [stimulusContent, setStimulusContent] = useState(""); // Keeps track of stimulus input
    const [stimulusType, setStimulusType] = useState("text"); // Keeps track of stimulus radio button
    const [answerType, setAnswerType] = useState("text"); // Keeps track of stimulus radio button
    const [selectedQuestionKey, setSelectedQuestionKey] = useState(0); //Keeps track of the correct answer key

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activityName, setActivityName] = useState(startingActivityName);

    const [correctStates, setCorrectStates] = useState([false, false, false, false]); //Keeps an array with the value of checkboxes (correct answers or not)

    const history = useHistory();
    
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

    //Things to run in the start of the program
    useEffect(() => {
        //if(props.create) setIsModalVisible(true); //Show activity name modal in create mode
        onSelectedQuestionChange(startingQuestions[0]); //Loads questions from file if applicable TODO trocar
    }, []); 

    const [questionsString, setQuestionString] = useState("");
    useEffect(() => {
        setQuestionString(JSON.stringify(questions));
    }, [questions, answersContent, stimulusContent, correctStates])

    function onActivityNameChange(e) {
        let activityNewName = e.target.value;
        setActivityName(activityNewName);
    }

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
            <PageHeader
                ghost={false}
                onBack={() => history.push("/")}
                title={activityName}
                className="site-page-header"
                extra={[
                    <Button key="1" 
                            type="primary" 
                            onClick={() => {
                                //if it is in create mode, send new name created with modal. If in view or edit, send read activities properties
                                props.create ? props.onClickedSave(questionsString, activityName) : props.onClickedSave(questionsString, activityName, props.activity.key);
                            }}>
                       <Link to="/">Salvar Atividade</Link>
                    </Button>,
                ]}
            />
            <Layout>
                <SideBar className="site-page-header" theme="dark" questions={questions} onAddQuestion={addQuestion} onSelectedQuestionChange={onSelectedQuestionChange} selectedQuestionKey={selectedQuestionKey}/>
                <Content className="creation-area">
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
            <Modal 
                title="Nome da atividade"
                visible={isModalVisible}
                onOk={() => setIsModalVisible(false)}
                onCancel={() => setIsModalVisible(false)}
            >
                <Input value={activityName} onChange={onActivityNameChange}></Input>
            </Modal>
        </Layout>
    );
}