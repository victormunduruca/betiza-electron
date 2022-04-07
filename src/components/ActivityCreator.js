import React, {useState} from "react";
import { Link , useHistory} from "react-router-dom";
import { Button, PageHeader, Layout, Empty , Modal , Input} from "antd";
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import Activity from "./ActivityPreview";
import uuid from "react-uuid";


const { Content } = Layout;

const fs = window.require('fs');


// const electron = window.require('electron');


export default function ActivityCreator(props) {
    const history = useHistory();
    const [isSettingsVisible, setIsSettingsVisible] = useState(false);
    console.log(props.loadedSettings.sweepSpeed);
    const [sweepSpeed, setSweepSpeed] = useState(props.loadedSettings.sweepSpeed);

    function handleSaveSettings(){
        console.log("Saved sweepspeed:" +sweepSpeed)
        props.onClickedSaveSettings(sweepSpeed);
        setIsSettingsVisible(false);
    }

    return (
        <Layout style={{backgroundColor: "white"}}>
            <PageHeader
                ghost={false}
                title="Betiza"
                className="site-page-header"
                extra={[
                    <Button type="secondary" icon={<SettingOutlined />} onClick={() => setIsSettingsVisible(true)}>Configurações</Button>
                ]}
            />
            <Modal title="Configurações" visible={isSettingsVisible} onOk={handleSaveSettings} onCancel={() => setIsSettingsVisible(false)}>
                
                <Input size="large" value={sweepSpeed} onChange={(e) => setSweepSpeed(e.target.value)}/> 
            </Modal>
            
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