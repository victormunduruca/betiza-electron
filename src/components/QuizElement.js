import React, { useEffect } from "react";
import { Card } from 'antd';

let isActive = false;

export default function QuizElement(props) {
    const defaultStyle = {borderColor: "white"};
    const active = {borderColor: "green"};
    let style = defaultStyle;
    let audio;

    if(props.type == "sound") audio = new Audio(props.value);  //If it is an audio element, init audio object 

    useEffect(() => {
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [props.focusedItem, props.id, handleClick]);

    function handleClick() {
        if(props.focusedItem == props.id) {
            console.log("Clicou no " +props.focusedItem);
        }
    }
  
    function isFocused() {
        if(props.focusedItem == null) { //In case it's not in sweep
            return false;
        }
        return props.focusedItem == props.id;
    }


    if(isFocused()) {   
        style = active;
        if(props.type == "sound") audio.play(); //Play file if audio 
    } else {
        style = defaultStyle;
    }

    let  quizElement;
    switch(props.type) {
        case "text":
            quizElement =    <Card className="text-answer" bordered={true} style={style}>
                                <div className="text-answer-type">{props.value}</div>
                            </Card>
            break;
        case "image":
            quizElement =    <Card className="answer-item" bordered={true} style={style} focusedItem={props.focusedItem}>
                                <img src={props.value} style={{width: "100%"}}></img>
                                {props.test}
                            </Card>;
            break
        case "sound":
            quizElement =    <Card className="answer-item" bordered={true} style={style}>
                               playIcon
                            </Card>;
            break
    }

    return (
        <div>
            {quizElement}
        </div>
    ); 
}