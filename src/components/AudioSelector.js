import React, {useState, useEffect} from "react";
import { Button } from "antd";


const fs = window.require('fs');
const { dialog } = window.require("electron").remote;
const path = window.require('path');

export default function AudioSelector(props) {
    const [filePath, setFilePath] = useState(""); 

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
            console.log("file path ready");
            let audio = new Audio("data:audio/mp3;base64," + fs.readFileSync(filePath[0]).toString('base64'));
            audio.play();
            props.onAudioReady("data:audio/mp3;base64," + fs.readFileSync(filePath[0]).toString('base64'));
        }
    }, [filePath]);
    return (
        <>
            <Button onClick={openDialog}> Clique para selecionar um áudio</Button>
            {filePath !== "" ? path.basename(filePath[0]) : ""}
        </>
    );
}
