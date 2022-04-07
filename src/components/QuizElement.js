import React, { useEffect } from "react";
import { Card } from 'antd';
import { PlaySquareTwoTone } from '@ant-design/icons';

let isActive = false;

export default function QuizElement(props) {
    const defaultStyle = {borderColor: "rgb(235, 237, 240)", display: "flex", justifyContent: "center"};
    const active = {borderColor: "#5eff76", display: "flex", justifyContent: "center"};
    let style = defaultStyle;
    let audio;

    if(props.type == "sound") audio = new Audio(props.value);  //If it is an audio element, init audio object 

    useEffect(() => {
        window.addEventListener('click', handleInteraction);
        window.addEventListener('keypress', handleEnter);
        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('keypress', handleEnter);
        };
    }, [props.focusedItem, props.sweepId, handleInteraction]);

    function handleInteraction() {
        if(props.focusedItem == props.sweepId && props.clickable == true) {
            props.onElementClicked(props.answerId);
        }
    }

    function handleEnter(event) {
        const keyName = event.key;
        if(keyName == "Enter") {
            handleInteraction();
        }
    }

  
    function isFocused() {
        // if(props.focusedItem == null) { //In case it's not in sweep
        //     return false;
        // }
        return props.focusedItem == props.sweepId;
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
            quizElement =    <div className="answer-item" style={style}>
                                <div className="text-answer-type">{props.value}</div>
                            </div>
            break;
        case "image":
            quizElement =    <div className="answer-item" style={style}>
                                <img src={props.value} className="responsive-image"></img>
                            </div>;
            break
        case "sound":
            quizElement =    <div className="answer-item" style={style}>
                               <PlaySquareTwoTone style={{fontSize: "5rem"}}/>
                            </div>;
            break
    }

    return (
        <div>
            {quizElement}
        </div>
    ); 
}