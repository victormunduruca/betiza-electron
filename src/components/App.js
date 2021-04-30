import React, {useState, useEffect} from "react";
import Header from "./Header";
import Answers from "./Answers";
import { Layout, Button} from 'antd';
import QuizCreator from "./QuizCreator";
import Stimulus from "./Stimulus";
import QuizElement from "./QuizElement";
import ImageTest from "./ImageTest";
import ImageSelector from "./ImageSelector";
const { Head, Footer, Sider, Content } = Layout;


const fs = window.require('fs');
const { dialog } = window.require("electron").remote;

export default function App() { 
    let rawdata, questions;

    try {
        rawdata = fs.readFileSync('APAGAquestions3.json');
        questions = JSON.parse(rawdata);
    } catch {
        console.log("file not found");
        questions = [{key: 0, stimulus: {type: "", value: ""}, answers: []}];
    }
    return (
        <Layout>
        {/* <ImageSelector onImageReady={(value) => setImgSrc(value)} value={imgSrc}/> */}
            {/* <input type="file"
       id="avatar" name="avatar"
       accept="image/png, image/jpeg" onChange={(e) => console.log(e.target.value)}></input> */}
            {/* <Header />  */}
            <QuizCreator questions={questions}/>

            {/* <Content style={{ padding: '0 300px' }}>
                <QuizElement type="text" content="teste"/> 
                <Answers /> 
            </Content> */}
        </Layout>
    );
}


