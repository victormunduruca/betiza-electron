import React, { useState } from  "react";
import FileDragger from "./FileDragger";
import {Input} from "antd"

export default function StimulusCreator(props) {
    let stimulus;
    switch(props.type) {
        case "text":
            stimulus =  <Input size="large" placeholder="Ex. BOLA, PATO" onChange={(e) => props.onStimulusChange(e.target.value)} value={props.value}/>;
            break;
        case "image":
            stimulus =    <FileDragger uploadText="Clique para fazer o upload de um estímulo visual"/>;
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