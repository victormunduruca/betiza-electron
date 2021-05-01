import React, { useState } from  "react";
import FileDragger from "./FileDragger";
import {Input} from "antd"
import ImageSelector from "./ImageSelector";
import AudioSelector from "./AudioSelector";

export default function StimulusCreator(props) {
    let stimulus;
    switch(props.type) {
        case "text":
            stimulus =  <Input size="large" placeholder="Ex. BOLA, PATO" onChange={(e) => props.onStimulusChange(e.target.value)} value={props.value}/>;
            break;
        case "image":
            stimulus =    <ImageSelector onImageReady={(imgSrc) => props.onStimulusChange(imgSrc)} value={props.value}/> ;
            break
        case "sound":
            stimulus =    <AudioSelector onAudioReady={(audioSrc) => props.onStimulusChange(audioSrc)}/>
            break
    }
    return (
      <div>
        {stimulus}
      </div>
    );
}