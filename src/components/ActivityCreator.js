import React, {useState} from "react";
import { Link , useHistory} from "react-router-dom";
import { Button, PageHeader, Layout } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import Activity from "./ActivityPreview";
import uuid from "react-uuid";


const { Content } = Layout;

const fs = window.require('fs');



// const electron = window.require('electron');



export default function ActivityCreator(props) {
    const history = useHistory();
    return (
        <Layout>
            <PageHeader
                ghost={false}
                title="Betiza"
            />
            
            <Content>
                {props.loadedActivities.map((activity) => <Activity name={activity.name} key={activity.key} id={activity.key} onClickedView={props.onClickedView} onClickedEdit={props.onClickedEdit} onClickedDelete={props.onClickedDelete}/>)}
                <Button type="primary" icon={<PlusOutlined />} onClick={() => history.push("/create")}>Criar Nova Atividade</Button>
            </Content>
        </Layout>
    );
}