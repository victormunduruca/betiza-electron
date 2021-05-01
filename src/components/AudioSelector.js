import React, {useState, useEffect} from "react";
import { Button } from "antd";


const fs = window.require('fs');
const { dialog } = window.require("electron").remote;
const path = window.require('path');

export default function AudioSelector(props) {
    const [filePath, setFilePath] = useState(""); 
   // const [img64, setImg64] = useState("");

    function openDialog() {
        dialog.showOpenDialog({
            properties: ['openFile', 'openDirectory']
        }).then(result => {
            console.log(result)
            console.log(result.filePaths)
            setFilePath(result.filePaths)
        }).catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        if(filePath !== "") {
            //setImg64(fs.readFileSync(filePath[0]).toString('base64'));
            console.log("file path ready");
            let audio = new Audio("data:audio/mp3;base64," + fs.readFileSync(filePath[0]).toString('base64'));
            audio.play();
            //props.onImageReady("data:image/png;base64," + fs.readFileSync(filePath[0]).toString('base64')); //Calls back functon when ready, with image src as content
        }
    }, [filePath]);
    return (
        <>
            <Button onClick={openDialog}> Clique para selecionar audio</Button>
            {filePath !== "" ? path.basename(filePath[0]) : ""}
        </>
    );
}
