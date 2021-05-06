import React, { useState, useEffect } from "react";
import uuid from 'react-uuid';
import { Layout, Button } from 'antd';



import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import QuizCreator from "./QuizCreator";
import AudioSelector from "./AudioSelector";
import QuizPlayer from "./QuizPlayer"
import ActivityCreator from "./ActivityCreator";


const { Content } = Layout;
const fs = window.require('fs');
const { dialog } = window.require("electron").remote;

const { app } = window.require('electron').remote;
const path = window.require('path');
const basePath = app.getAppPath("appData");

export default function App() {
    let activitiesFolder = path.join(basePath, "activities");
    let loadedActivities = [];
    const [selectedActivity, setSelectedActivity] = useState(); //Sets selected activity used in edit / view actions

    if (!fs.existsSync(activitiesFolder)) fs.mkdirSync(activitiesFolder); //Creates activities path if it doesn't exist in userDatas folder

    //TODO put this inside useEffect
    fs.readdirSync(activitiesFolder).forEach(file => {
        let fileName = path.basename(file, '.json');
        let fields = fileName.split("*");
        console.log("key: " + fields[0]);
        console.log("name: " + fields[1]);
        loadedActivities.push({ key: fields[0], name: fields[1] });
    });

    function readActivity(activityName, activityKey) {
        let activity, rawdata;
        try {
            let activityPath = path.join(activitiesFolder, activityKey + "*" + activityName + ".json")
            rawdata = fs.readFileSync(activityPath);
            activity = JSON.parse(rawdata);
        } catch {
            console.log("file not found");
            activity = [{ key: uuid(), stimulus: "", stimulusType: "text", answers: [], answerType: "text" }];
        }
        return activity;
    }

    function onClickedView(activityName, activityKey) {
       // setSelectedActivity("robson");
        let activity = readActivity(activityName, activityKey);
        setSelectedActivity(activity);
        // console.log(activity);
        //read questions
        //go to QuizViewer, on router 
    }

    function onClickedEdit(activityName, activityKey) {
        let activity = readActivity(activityName, activityKey);
        setSelectedActivity(activity);
        //got to QuizCreator, on react router
    }

    function onClickedSave(questionsString, activityName) {
        let newActivityPath = path.join(activitiesFolder, uuid() + "*" + activityName + ".json"); // sets the new activity path
        fs.writeFileSync(newActivityPath, questionsString); // saves the new activity
        //Receives an activity object 
        //creates uuid key
        //saves the file as JSON
        //What if it already exists?
    }

    //TODO Loading page
    return (
            <Router>
                <Link to="/">Home</Link>
                <Link to="/whisky">whisky</Link>
                <Link to="/agua">agua</Link>
                <Button onClick={() => setSelectedActivity("sheila")}>Set Sheila</Button>

                <Switch>
                    <Route exact path="/">
                        <ActivityCreator loadedActivities={loadedActivities} onClickedView={onClickedView} onClickedEdit={onClickedEdit}/>
                    </Route>
                    <Route path="/create">
                        <QuizCreator onClickedSave={onClickedSave}/> 
                    </Route>
                    <Route path="/view">
                        {selectedActivity ? <QuizPlayer questions={selectedActivity} onClickedSave={onClickedSave}/> : null} 
                    </Route>
                    <Route path="/edit">
                        {selectedActivity ? <QuizCreator questions={selectedActivity} onClickedSave={onClickedSave}/> : null} 
                    </Route>
                </Switch>
            </Router>
    );
}


function Inicio() {
    return (
        <div>
            Esse era pra ser o primerio
            <Button><Link to="/whisky"> Va para agua </Link></Button>
        </div>
    );
}

function Whisky() {
    return (
        <div>
            Whisky
            <Button><Link to="/agua"> Va para agua </Link></Button>
        </div>
    );
}

function Agua(props) {
    return (
        <div>
        Agua de coco
            <Link to="/"> Voltar para tela inicial </Link>
        </div>
    );
}


