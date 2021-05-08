import React, {useState, useEffect} from "react";
import { Button } from "antd";


const fs = window.require('fs');
const { dialog } = window.require("electron").remote;

export default function ImageSelector(props) {
    const [filePath, setFilePath] = useState(""); 
   // const [img64, setImg64] = useState("");

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
    useEffect(() => {
        if(filePath !== "") {
            //setImg64(fs.readFileSync(filePath[0]).toString('base64'));
            props.onImageReady("data:image/png;base64," + fs.readFileSync(filePath[0]).toString('base64')); //Calls back functon when ready, with image src as content
        }
    }, [filePath]);
    return (
        <div className="image-selector">
            <Button onClick={openDialog}> Clique para selecionar imagem</Button>
            {props.value != "" ? <img src={props.value} className="image-thumb" style={{marginTop: "16px"}}></img> : ""}
        </div>
    );
}
