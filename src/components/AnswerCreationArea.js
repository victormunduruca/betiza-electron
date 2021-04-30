import React, {useState} from "react";
import { Row, Col , Typography} from "antd";
import AnswerCreator from "./AnswerCreator";
import TypeSelector from "./TypeSelector";

const {Title} = Typography;

export default function AnswerCreationArea(props) {
    const [answerType, setAnswerType] = useState("text");
    return (
        <div>
            <Title level={3}>Repostas</Title>
            <TypeSelector onChange={e => props.onAnswerTypeChange(e.target.value)} value={props.answerType}/>
            <Row gutter={[16, 16]}>
                <Col className="gutter-row" span={12}>
                    <AnswerCreator type={props.answerType} id="0" onChange={(value) => props.onAnswerChange(value, 0, props.answerType)} value={props.value[0]}/>
                </Col>
                <Col className="gutter-row" span={12}>
                    <AnswerCreator type={props.answerType} id="1" onChange={(value) => props.onAnswerChange(value, 1, props.answerType)} value={props.value[1]}/>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col className="gutter-row" span={12}>
                    <AnswerCreator type={props.answerType} id="2" onChange={(value) => props.onAnswerChange(value, 2, props.answerType)} value={props.value[2]}/>
                </Col>
                <Col className="gutter-row" span={12}>
                    <AnswerCreator type={props.answerType} id="3" onChange={(value) => props.onAnswerChange(value, 3, props.answerType)} value={props.value[3]}/>
                </Col>
            </Row>
        </div>
    );
}