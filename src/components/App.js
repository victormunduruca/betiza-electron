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
const basePath = app.getPath("appData");

export default function App() {
    let activitiesFolder = path.join(basePath, "activities");
    let settingsFolder = path.join(activitiesFolder, "settings");

    const [loadedActivities, setLoadedActivities] = useState(loadActivities());
    const [selectedActivity, setSelectedActivity] = useState(); //Sets selected activity used in edit / view actions
    const [loadedSettings, setLoadedSettings] = useState(loadSettings());



    function loadSettings() {
        if (!fs.existsSync(settingsFolder)) { //Creates activities path if it doesn't exist in userDatas folder 
            fs.mkdirSync(settingsFolder);
            fs.writeFileSync(path.join(activitiesFolder,"settings.json"), {sweepSpeed: 2000});
        } 
        return fs.readFileSync(path.join(activitiesFolder,"settings.json"));
    }

    function loadActivities() {
        if (!fs.existsSync(activitiesFolder)) fs.mkdirSync(activitiesFolder); //Creates activities path if it doesn't exist in userDatas folder
        let loadedActivitiesTemp = []
        fs.readdirSync(activitiesFolder).forEach(file => {
            console.log(file);
            let fileName = path.basename(file, '.json');
            let fields = fileName.split("$");
            console.log("key: " + fields[0]);
            console.log("name: " + fields[1]);
            loadedActivitiesTemp.push({ key: fields[0], name: fields[1] });
        });
        return loadedActivitiesTemp;
    }

    function readActivity(activityName, activityKey) {
        let activity, rawdata;
        try {
            let activityPath = getActivityPath(activityKey, activityName);
            rawdata = fs.readFileSync(activityPath);
            activity = JSON.parse(rawdata);
        } catch {
            console.log("file not found");
            activity = [{ key: uuid(), stimulus: "", stimulusType: "text", answers: [], answerType: "text" }];
        }
        return activity;
    }

    function onClickedView(activityName, activityKey) {
        let activity = readActivity(activityName, activityKey);
        setSelectedActivity({questions: activity, name: activityName, key: activityKey});
    }

    function onClickedEdit(activityName, activityKey) {
        let activity = readActivity(activityName, activityKey);
        setSelectedActivity({questions: activity, name: activityName, key: activityKey});
    }

    function onClickedSave(questionsString, activityName, activityKey) {
        let key;
        activityKey ? key = activityKey : uuid(); //if theres a key (view or edit), use it, otherwise create uuid
        let newActivityPath = getActivityPath(key, activityName); // sets the new activity path
        fs.writeFileSync(getActivityPath(activityKey, activityName), questionsString); // saves the new activity
        setLoadedActivities(loadActivities()); //refresh
        // fs.writeFileSync(path.join(activitiesFolder, "rapaztasalvando.txt"), activityName+activityKey+questionsString);
    }

    function onClickedDelete(activityName, activityKey) {
        fs.unlinkSync(getActivityPath(activityKey, activityName));
        setLoadedActivities(loadActivities()); //refresh
    }
    

    function onClickedSaveSettings(quizSweepSpeed) {
        // save the newly set sweep speed on the disk
        fs.writeFileSync(path.join(settingsFolder,"settings.json"), {sweepSpeed: quizSweepSpeed});
    }

    function getActivityPath(activityKey, activityName) {
        return path.join(activitiesFolder, activityKey + "$" + activityName + ".json");
    }

    //TODO Loading page
    return (
            <Router>
                {/* <Link to="/">Panic</Link> */}
                <Switch>
                    <Route exact path="/">
                        <ActivityCreator loadedActivities={loadedActivities} loadedSettings={{sweepSpeed: 2000}} onClickedView={onClickedView} onClickedEdit={onClickedEdit} onClickedDelete={onClickedDelete} onClickedSaveSettings={onClickedSaveSettings}/>
                    </Route>
                    <Route path="/create">
                        <QuizCreator onClickedSave={onClickedSave} create/> 
                    </Route>
                    <Route path="/view">
                        {selectedActivity ? <QuizPlayer questions={selectedActivity.questions}/> : null} 
                    </Route>
                    <Route path="/edit">
                        {selectedActivity ? <QuizCreator activity={selectedActivity} onClickedSave={onClickedSave}/> : null} 
                    </Route>
                </Switch>
            </Router>
    );
}





