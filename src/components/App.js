import React from "react";
import Header from "./Header";
import Answers from "./Answers";
import { Layout, Button} from 'antd';
import QuizCreator from "./QuizCreator";
import Stimulus from "./Stimulus";
import QuizElement from "./QuizElement";
const { Head, Footer, Sider, Content } = Layout;


export default function App() {
    return (
        <Layout>
            {/* <Header />  */}
            <QuizCreator />

            {/* <Content style={{ padding: '0 300px' }}>
                <QuizElement type="text" content="teste"/> 
                <Answers /> 
            </Content> */}
        </Layout>
    );
}


