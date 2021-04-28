import React, { useEffect } from "react";
import { Card } from 'antd';


//import useSound from 'use-sound';

const defaultStyle = {borderColor: "white"};
const active = {borderColor: "green"};



let isActive = false;
let style = defaultStyle;

export default function QuizElement(props) {

    useEffect(() => {
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [props.focusedItem, props.answerId, handleClick]);

    function handleClick() {
        if(props.focusedItem == props.answerId) {
            console.log("Clicou no " +props.focusedItem);
        }
        //play();
    }
  
    function isFocused() {
        if(props.focusedItem == null) { //In case it's not in sweep
            return false;
        }
        return props.focusedItem == props.answerId;
    }


    if(isFocused()) {   
        style = active;
       // play();
    } else {
        style = defaultStyle;
    }

    let  quizElement;
    switch(props.type) {
        case "text":
            quizElement =    <Card className="text-answer" bordered={true} style={style}>
                                <div className="text-answer-type">{props.content}</div>
                            </Card>
            break;
        case "image":
            quizElement =    <Card className="answer-item" bordered={true} style={style}>
                                <img src={props.content} style={{width: "100%"}}></img>
                            </Card>;
            break
        case "audio":
            quizElement =    <Card className="answer-item" bordered={true} style={style}>
                               audio
                            </Card>;
            break
    }

    return (
        <div>
            {quizElement}
        </div>
    ); 
}