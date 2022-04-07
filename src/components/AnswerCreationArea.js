import React, {useState} from "react";
import { Row, Col , Typography, Alert} from "antd";
import AnswerCreator from "./AnswerCreator";
import TypeSelector from "./TypeSelector";

const {Title} = Typography;

export default function AnswerCreationArea(props) {
    const [answerType, setAnswerType] = useState("text");
    //onCheckbox change, receive, true or false -> send index to onSelectAnswerChange
    //Receive correct answer index
    // (at answercreator (if key == answercreatorkey, send true, else send false
    return (
        <div>
            <Title level={3}>Repostas</Title>
            <TypeSelector onChange={e => props.onAnswerTypeChange(e.target.value)} value={props.answerType}/>
            <Row gutter={[16, 16]}>
                <Col className="gutter-row" span={12}>
                    <AnswerCreator 
                        type={props.answerType} 
                        id="0" 
                        onChange={(value) => props.onAnswerChange(value, 0, props.answerType)} 
                        value={props.value[0]} 
                        onCorrectAnswerChange={(e) => props.onCorrectAnswerChange(e.target.checked, 0)} 
                        checkboxValue={props.correctStates[0]}
                        errorState={props.errorState}
                        errorExample
                    />
                </Col>
                <Col className="gutter-row" span={12}>
                    <AnswerCreator 
                        type={props.answerType} 
                        id="1" onChange={(value) => props.onAnswerChange(value, 1, props.answerType)} 
                        value={props.value[1]}
                        onCorrectAnswerChange={(e) => props.onCorrectAnswerChange(e.target.checked, 1)} 
                        checkboxValue={props.correctStates[1]}
                    />
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col className="gutter-row" span={12}>
                    <AnswerCreator 
                        type={props.answerType} 
                        id="2" 
                        onChange={(value) => props.onAnswerChange(value, 2, props.answerType)} 
                        value={props.value[2]}
                        onCorrectAnswerChange={(e) => props.onCorrectAnswerChange(e.target.checked, 2)} 
                        checkboxValue={props.correctStates[2]}
                    />
                </Col>
                <Col className="gutter-row" span={12}>
                    <AnswerCreator 
                        type={props.answerType} 
                        id="3" 
                        onChange={(value) => props.onAnswerChange(value, 3, props.answerType)} 
                        value={props.value[3]}
                        onCorrectAnswerChange={(e) => props.onCorrectAnswerChange(e.target.checked, 3)} 
                        checkboxValue={props.correctStates[3]}
                    />
                </Col>
            </Row>
        </div>
    );
}