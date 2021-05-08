import React from "react";
import { Radio } from "antd";
import { FileTextOutlined, FileImageOutlined, SoundOutlined } from '@ant-design/icons';

export default function TypeSelector(props) {
    return (
        <div className="type-selector">
            <Radio.Group onChange={props.onChange} defaultValue="text" value={props.value}>
                <Radio.Button value="text"><FileTextOutlined /> Textual</Radio.Button>
                <Radio.Button value="image"><FileImageOutlined /> Visual</Radio.Button>
                <Radio.Button value="sound"><SoundOutlined /> Auditivo</Radio.Button>
            </Radio.Group>
        </div>
    );
}