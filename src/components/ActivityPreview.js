import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export default function ActivityPreview(props) {
    //receive name and key
    //display name and preview and edit button
    return (
        <div className="activity-preview">
            <Link to="/view" onClick={() => props.onClickedView(props.name, props.id)}>{props.name}</Link>
            <div>
                <Button icon={<EditOutlined />} onClick={() => props.onClickedEdit(props.name, props.id)} style={{marginRight: "4px"}}><Link to="/edit"></Link></Button>
                <Button icon={<DeleteOutlined />} onClick={() => props.onClickedDelete(props.name, props.id)}></Button>
            </div>
        </div>
    );
}