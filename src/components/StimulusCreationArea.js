import React, {useState} from "react";
import TypeSelector from "./TypeSelector";
import StimulusCreator from "./StimulusCreator"
import {Typography} from "antd";
const {Title} = Typography;

export default function StimulusCreationArea(props) {
    return (
        <div className="stimulus-creator">
            <Title level={3}>Estímulo</Title>
            <TypeSelector onChange={e => props.onStimulusTypeChange(e.target.value)} value={props.stimulusType} className="type-selector"/>
            <StimulusCreator type={props.stimulusType} onStimulusChange={(value) => props.onStimulusChange(value, props.stimulusType)} value={props.value}/>
        </div>
    );
}