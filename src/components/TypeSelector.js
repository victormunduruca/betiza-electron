import React from "react";
import {Radio} from "antd";

export default function TypeSelector(props) {
    return (
        <Radio.Group onChange={props.onChange} defaultValue="text">
            <Radio.Button value="text">Textual</Radio.Button>
            <Radio.Button value="image">Visual</Radio.Button>
            <Radio.Button value="sound">Auditivo</Radio.Button>
        </Radio.Group>
    );
}