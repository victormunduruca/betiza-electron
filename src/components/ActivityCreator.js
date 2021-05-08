import React, {useState} from "react";
import { Link , useHistory} from "react-router-dom";
import { Button, PageHeader, Layout, Empty } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import Activity from "./ActivityPreview";
import uuid from "react-uuid";


const { Content } = Layout;

const fs = window.require('fs');



// const electron = window.require('electron');



export default function ActivityCreator(props) {
    const history = useHistory();
    return (
        <Layout style={{backgroundColor: "white"}}>
            <PageHeader
                ghost={false}
                title="Betiza"
                className="site-page-header"
            />
            
            <Content style={{marginTop: "16px"}}>
                {props.loadedActivities != [] ? props.loadedActivities.map((activity) => 
                                                    <Activity 
                                                        name={activity.name} 
                                                        key={activity.key} 
                                                        id={activity.key} 
                                                        onClickedView={props.onClickedView} 
                                                        onClickedEdit={props.onClickedEdit} 
                                                        onClickedDelete={props.onClickedDelete}
                                                    />) : <Empty description={<span>Nenhuma Atividade Criada</span>}/>}
                <Button type="primary" icon={<PlusOutlined />} onClick={() => history.push("/create")} style={{margin: "24px"}}>Criar Nova Atividade</Button>
            </Content>
        </Layout>
    );
}