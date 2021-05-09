import React, {useState, useEffect} from "react";
import { Button } from "antd";
import { PlaySquareTwoTone } from '@ant-design/icons';


const fs = window.require('fs');
const { dialog } = window.require("electron").remote;
const path = window.require('path');

export default function AudioSelector(props) {
    const [filePath, setFilePath] = useState(""); 

    function handlePlay() { //Function used to play audio 
        let audio = new Audio(props.value);
        audio.play();
    }
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
            props.onAudioReady("data:audio/mp3;base64," + fs.readFileSync(filePath[0]).toString('base64'));
        }
    }, [filePath]);
    return (
        <div className="selector">
            {props.value != undefined ? <Button ghost 
                                    onClick={handlePlay} 
                                    size="large" 
                                    icon={<PlaySquareTwoTone style={{fontSize: "2rem"}}/>}
                                    style={{marginBottom: "8px"}}
                                >
                                </Button> : ""}
            <Button onClick={openDialog}> Selecionar um áudio</Button>
        </div>
    );
}
