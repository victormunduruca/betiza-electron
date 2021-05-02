import React, {useState, useEffect} from "react";
import uuid from 'react-uuid';
import { Layout, Button} from 'antd';


import {
    HashRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import QuizCreator from "./QuizCreator";
import AudioSelector from "./AudioSelector";
import QuizPlayer from "./QuizPlayer"


const {Content } = Layout;
const fs = window.require('fs');
const { dialog } = window.require("electron").remote;

export default function App() { 
    let rawdata, questions;

    try {
        rawdata = fs.readFileSync('questionsText.json');
        questions = JSON.parse(rawdata);
    } catch {
        console.log("file not found");
        questions = [{key: uuid(), stimulus: "", stimulusType: "text", answers: [], answerType: "text"}];
    }
    return (
        <Layout>
        {/* <ImageSelector onImageReady={(value) => setImgSrc(value)} value={imgSrc}/> */}
            {/* <input type="file"
       id="avatar" name="avatar"
       accept="image/png, image/jpeg" onChange={(e) => console.log(e.target.value)}></input> */}
            {/* <Header />  */}
            {/* <QuizCreator questions={questions}/> */}

            {/* <Router>
                <Link to = "/create"> Criar uma atividade </Link>
                <Link to = "/view"> Visualiar uma atividade </Link>
                <Switch>
                    <Route path="/create">
                        <QuizCreator questions={questions}/>
                    </Route>
                    <Route path="/view">
                        <QuizPlayer questions={questions[0]}/>
                    </Route>
                </Switch>
            </Router> */}
            <Content style={{ padding: '0 300px' }}>
                <QuizPlayer questions={questions} /> 
            </Content>
        </Layout>
    );
}


