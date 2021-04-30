import React, { useState } from  "react";
import FileDragger from "./FileDragger";
import {Input} from "antd"
import ImageSelector from "./ImageSelector";

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
            stimulus =    <FileDragger uploadText="Clique para fazer o upload de um estímulo auditivo"/>;
            break
    }
    return (
      <div>
        {stimulus}
      </div>
    );
}