import React, { useEffect } from "react";
import { Card } from 'antd';


export default function Stimulus(props) {
    let  stimulus;
    switch(props.type) {
        case "text":
            stimulus =    <Card className="text-answer" bordered={true}>
                                <div className="text-answer-type">{props.content}</div>
                            </Card>
            break;
        case "image":
            stimulus =    <Card className="answer-item" bordered={true}>
                                <img src={props.content} style={{width: "100%"}}></img>
                            </Card>;
            break
    }

    return (
        <div>
            {stimulus}
        </div>
    ); 
}