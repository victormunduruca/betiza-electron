import React from "react";
import { Menu, Button, Layout } from "antd";
import { PlusOutlined } from '@ant-design/icons';
const { Sider } = Layout;


export default function SideBar(props) {


    return (
        <Sider theme="light">
                <Menu theme="light" mode="inline" selectedKeys={[props.selectedQuestionKey]} onClick={props.onSelectedQuestionChange}>
                    <div className="side-bar-title">Questões</div>
                    {props.questions.map((question, index) => <Menu.Item key={question.key}>Questão {index + 1}</Menu.Item>)}
                </Menu>
                <Button className="side-bar-button" type="primary" onClick={props.onAddQuestion} icon={<PlusOutlined />}> Adicionar Questão</Button>
        </Sider>
    );
}