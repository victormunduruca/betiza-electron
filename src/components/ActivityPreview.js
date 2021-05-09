import React from "react";
import { Button } from "antd";
import { Link, useHistory } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export default function ActivityPreview(props) {
    const history = useHistory();

    return (
        <div className="activity-preview">
            <Link to="/view" onClick={() => props.onClickedView(props.name, props.id)}>{props.name}</Link>
            <div>
                <Button                         
                    icon={<EditOutlined />} 
                    onClick={() => {
                        history.push("/edit")
                        props.onClickedEdit(props.name, props.id);
                    }} 
                    style={{marginRight: "4px"}}>
                </Button>
                <Button 
                    icon={<DeleteOutlined />} 
                    onClick={() => props.onClickedDelete(props.name, props.id)}>
                </Button>
            </div>
        </div>
    );
}