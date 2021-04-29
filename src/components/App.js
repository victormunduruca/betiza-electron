import React, {useState, useEffect} from "react";
import Header from "./Header";
import Answers from "./Answers";
import { Layout, Button} from 'antd';
import QuizCreator from "./QuizCreator";
import Stimulus from "./Stimulus";
import QuizElement from "./QuizElement";
const { Head, Footer, Sider, Content } = Layout;

//[questions, setQuestions] = useState("");
const fs = window.require('fs');

export default function App() { 
    let rawdata, questions;
    
    try {
        rawdata = fs.readFileSync('questions3.json');
        questions = JSON.parse(rawdata);
    } catch {
        console.log("file not found");
        questions = [{key: 0, stimulus: {type: "", value: ""}, answers: []}];
    }
    
    // useEffect(() => {
    //     fs.readFile('student.json', (err, data) => {
    //         if (err) throw err;
    //         let student = JSON.parse(data);
    //         console.log(student);
    //     });
    // }, []);
    return (
        <Layout>
            {/* <Header />  */}
            <QuizCreator questions={questions}/>

            {/* <Content style={{ padding: '0 300px' }}>
                <QuizElement type="text" content="teste"/> 
                <Answers /> 
            </Content> */}
        </Layout>
    );
}


