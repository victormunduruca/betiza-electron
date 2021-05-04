import React, {useState} from "react";
import { Button, PageHeader, Layout } from "antd";
import Activity from "./ActivityPreview";

const { Content } = Layout;

const fs = window.require('fs');


// const electron = window.require('electron');
const { app } = window.require('electron').remote;
const path = window.require('path');
const basePath = app.getAppPath("appData");


export default function ActivityCreator() {
    //on load (useeffect)
    //state of activities from the file read
    // const [activities, setActivities] = useState();
    let activitiesFolder = path.join(basePath, "activities");
    let loadedActivities = [];

    if (!fs.existsSync(activitiesFolder)) fs.mkdirSync(activitiesFolder); //Creates activities path if it doesn't exist in userDatas folder
    
    fs.readdirSync(activitiesFolder).forEach(file => {
        let fileName = path.basename(file, '.json');
        let fields = fileName.split("*");
        console.log("key: " + fields[0]);
        console.log("name: " + fields[1]);
        loadedActivities.push({key: fields[0], name: fields[1]});
    });


    return (
        <Layout>
            <PageHeader
                ghost={false}
                title="Betiza"
            />
            <Content>
                <Button>Criar Nova Atividade</Button>
                {loadedActivities.map((activity) => <Activity name={activity.name} key={activity.key}/>)}
            </Content>
        </Layout>
    );
}