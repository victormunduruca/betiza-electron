import React from "react";
import {Menu, Button, Layout} from "antd";
const {Sider} = Layout;

export default function SideBar(props) {


    return (
        <Sider theme="light">
            <Menu theme="light" mode="inline" selectedKeys={[props.selectedQuestionKey]} onClick={props.onSelectedQuestionChange}>
                <h4>Questões</h4>
                {props.questions.map((question, index) => <Menu.Item key={question.key}>Questão {index+1}</Menu.Item>)}
            </Menu>
            <Button type="primary" onClick={props.onAddQuestion}>Adicionar Questão</Button>
        </Sider>
    );
}