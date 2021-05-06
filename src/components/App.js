import React, { useState, useEffect } from "react";
import uuid from 'react-uuid';
import { Layout, Button } from 'antd';

import DelAgua from "./DelAgua";
import DelWhisky from "./DelWhisky";

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


    return (
            <Router>
                <Link to="/">Home</Link>
                <Link to="/whisky">whisky</Link>
                <Link to="/agua">agua</Link>


                <Switch>
                    <Route exact path="/">
                        <ActivityCreator loadedActivities={loadedActivities}/>
                    </Route>
                    <Route path="/create">
                        <QuizCreator /> 
                    </Route>
                    <Route path="/agua">
                        <Agua />
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


