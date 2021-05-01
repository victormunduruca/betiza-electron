import React, { useState } from "react";
import { Card , Input, Checkbox} from 'antd';
import FileDragger from "./FileDragger";
import ImageSelector from "./ImageSelector";
import AudioSelector from "./AudioSelector";

export default function AnswerCreator(props){
    let answer;

    switch(props.type) {
        case "text":
            answer =    <Card className="text-answer" bordered={true}>
                            <Checkbox onChange={props.onCorrectAnswerChange} checked={props.checkboxValue}></Checkbox> 
                            <Input placeholder="Basic usage" onChange={(e) => props.onChange(e.target.value)} value={props.value}/>
                        </Card>
            break;
        case "image":
            answer =    <Card className="answer-item" bordered={true}>
                                <Checkbox onChange={props.onCorrectAnswerChange} checked={props.checkboxValue}>></Checkbox>
                                <ImageSelector onImageReady={(imgSrc) => props.onChange(imgSrc)} value={props.value}/> 
                            </Card>;
            break
        case "sound":
            answer =    <Card className="answer-item" bordered={true}>
                                <Checkbox onChange={props.onCorrectAnswerChange} checked={props.checkboxValue}>></Checkbox>
                                <AudioSelector onAudioReady={(audioSrc) => props.onChange(audioSrc)}/>
                            </Card>;
            break
    }   
    return (
        <div>
            {answer}
        </div>
    );
}