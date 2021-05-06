import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Button, PageHeader, Layout } from "antd";
import Activity from "./ActivityPreview";
import uuid from "react-uuid";


const { Content } = Layout;

const fs = window.require('fs');



// const electron = window.require('electron');



export default function ActivityCreator(props) {
    //on load (useeffect)
    //state of activities from the file read
    // const [activities, setActivities] = useState();






    return (
        <Layout>
            <PageHeader
                ghost={false}
                title="Betiza"
            />
            
            <Content>
                <Link to="/create">Criar Nova Atividade</Link>
                {props.loadedActivities.map((activity) => <Activity name={activity.name} key={activity.key} id={activity.key} onClickedView={props.onClickedView} onClickedEdit={props.onClickedEdit}/>)}
            </Content>
        </Layout>
    );
}