import React, { useState } from "react";
import { Card , Input, Checkbox} from 'antd';
import FileDragger from "./FileDragger";
import ImageSelector from "./ImageSelector";

export default function AnswerCreator(props){
    function onCheckboxChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }
    let answer;

    switch(props.type) {
        case "text":
            answer =    <Card className="text-answer" bordered={true}>
                            <Checkbox onChange={onCheckboxChange}></Checkbox>
                            <Input placeholder="Basic usage" onChange={(e) => props.onChange(e.target.value)} value={props.value}/>
                        </Card>
            break;
        case "image":
            answer =    <Card className="answer-item" bordered={true}>
                                <Checkbox onChange={onCheckboxChange}></Checkbox>
                                <ImageSelector onImageReady={(imgSrc) => props.onChange(imgSrc)} value={props.value}/> 
                            </Card>;
            break
        case "sound":
            answer =    <Card className="answer-item" bordered={true}>
                                <Checkbox onChange={onCheckboxChange}></Checkbox>
                                <FileDragger /> 
                            </Card>;
            break
    }   
    return (
        <div>
            {answer}
        </div>
    );
}