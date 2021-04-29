import React, {useState, useEffect} from "react";
import Header from "./Header";
import Answers from "./Answers";
import { Layout, Button} from 'antd';
import QuizCreator from "./QuizCreator";
import Stimulus from "./Stimulus";
import QuizElement from "./QuizElement";
import ImageTest from "./ImageTest";
const { Head, Footer, Sider, Content } = Layout;

//[questions, setQuestions] = useState("");
const fs = window.require('fs');
const { dialog } = window.require("electron").remote;

// dialog.showOpenDialog(window.require('electron').remote.getCurrentWindow(),
//    {
//     filters: [
//       {name: 'Images', extensions: ['png']}
//     ]
//    }, 
//    function(result) {
//     console.log("Disgracaaaaa");
//     console.log(result);
//     //  //read image (note: use async in production)
//     //  var _img = fs.readFileSync(filepaths[0]).toString('base64');
//     //  //example for .png
//     //  src = "data:image/png;base64," + _img;
//     //  console.log(src);
// });

//console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))

export default function App() { 
    const [filePath, setFilePath] = useState(""); 
    function openDialog() {
        dialog.showOpenDialog({
            properties: ['openFile', 'openDirectory']
        }).then(result => {
            console.log(result.canceled)
            console.log(result.filePaths)
            setFilePath(result.filePaths)
        }).catch(err => {
            console.log(err)
        })
    }
    
    let rawdata, questions;

    try {
        rawdata = fs.readFileSync('questions3.json');
        questions = JSON.parse(rawdata);
    } catch {
        console.log("file not found");
        questions = [{key: 0, stimulus: {type: "", value: ""}, answers: []}];
    }
    return (
        <Layout>
        <h1>{filePath}</h1>
        <Button onClick={openDialog}>Escolher arquivos</Button>
            {/* <input type="file"
       id="avatar" name="avatar"
       accept="image/png, image/jpeg" onChange={(e) => console.log(e.target.value)}></input> */}
            {/* <Header />  */}
            {/* <QuizCreator questions={questions}/> */}

            {/* <Content style={{ padding: '0 300px' }}>
                <QuizElement type="text" content="teste"/> 
                <Answers /> 
            </Content> */}
        </Layout>
    );
}


