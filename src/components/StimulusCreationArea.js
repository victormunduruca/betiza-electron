import React, {useState} from "react";
import TypeSelector from "./TypeSelector";
import StimulusCreator from "./StimulusCreator"
import {Typography} from "antd";
const {Title} = Typography;

export default function StimulusCreationArea(props) {
    const [stimulusType, setStimulusType] = useState("text");
    return (
        <div>
            <h1>{stimulusType}</h1>
            <Title level={3}>Estímulo</Title>
            <TypeSelector onChange={e => setStimulusType(e.target.value)}/>
            <StimulusCreator type={stimulusType} onStimulusChange={(value) => props.onStimulusChange(value, stimulusType)} value={props.value}/>
        </div>
    );
}