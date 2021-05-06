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
    const [loadedActivities, setLoadedActivities] = useState(loadActivities());
    const [selectedActivity, setSelectedActivity] = useState(); //Sets selected activity used in edit / view actions

    if (!fs.existsSync(activitiesFolder)) fs.mkdirSync(activitiesFolder); //Creates activities path if it doesn't exist in userDatas folder

    function loadActivities() {
        let loadedActivitiesTemp = []
        fs.readdirSync(activitiesFolder).forEach(file => {
            let fileName = path.basename(file, '.json');
            let fields = fileName.split("*");
            console.log("key: " + fields[0]);
            console.log("name: " + fields[1]);
            loadedActivitiesTemp.push({ key: fields[0], name: fields[1] });
        });
        return loadedActivitiesTemp;
    }

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
        setSelectedActivity({questions: activity, name: activityName, key: activityKey});
    }

    function onClickedEdit(activityName, activityKey) {
        let activity = readActivity(activityName, activityKey);
        setSelectedActivity({questions: activity, name: activityName, key: activityKey});
        //got to QuizCreator, on react router
    }

    function onClickedSave(questionsString, activityName, activityKey) {
        let key;
        activityKey ? key = activityKey : uuid(); //if theres a key (view or edit), use it, otherwise create uuid
        let newActivityPath = path.join(activitiesFolder, key + "*" + activityName + ".json"); // sets the new activity path
        fs.writeFileSync(newActivityPath, questionsString); // saves the new activity
        setLoadedActivities(loadActivities());
    }

    //TODO Loading page
    return (
            <Router>
                <Link to="/">Home</Link>

                <Switch>
                    <Route exact path="/">
                        <ActivityCreator loadedActivities={loadedActivities} onClickedView={onClickedView} onClickedEdit={onClickedEdit}/>
                    </Route>
                    <Route path="/create">
                        <QuizCreator onClickedSave={onClickedSave} create/> 
                    </Route>
                    <Route path="/view">
                        {selectedActivity ? <QuizPlayer activity={selectedActivity}/> : null} 
                    </Route>
                    <Route path="/edit">
                        {selectedActivity ? <QuizCreator activity={selectedActivity} onClickedSave={onClickedSave}/> : null} 
                    </Route>
                </Switch>
            </Router>
    );
}





