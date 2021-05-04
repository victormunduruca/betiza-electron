import React, {useState} from "react";
import { Button, PageHeader, Layout } from "antd";
import Activity from "./Activity";

const { Content } = Layout;

const fs = window.require('fs');

// const electron = window.require('electron');
const { app } = window.require('electron').remote;
const basePath = app.getAppPath("appData");


export default function ActivityCreator() {
    //on load (useeffect)
    //state of activities from the file read
    // const [activities, setActivities] = useState();
    
    fs.readdirSync(basePath).forEach(file => {
         console.log(file);
    });

    return (
        <Layout>
            <PageHeader
                ghost={false}
                title="Betiza"
            />
            <Content>
                <Activity name="nome da atividade"/>
                <Button>Criar Nova Atividade</Button>
            </Content>
        </Layout>
    );
}