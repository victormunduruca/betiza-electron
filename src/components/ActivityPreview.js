import React from "react";
import { Button } from "antd";
import { Link, useHistory } from "react-router-dom";
import { EditOutlined, DeleteOutlined, RightOutlined } from '@ant-design/icons';

export default function ActivityPreview(props) {
    const history = useHistory();

    return (
        <div className="activity-preview">
            <div style={{display: "flex", alignItems: "center"}}>
                <Link to="/view" style={{color: "black", fontSize: "1.5rem", marginRight: "4px"}} onClick={() => props.onClickedView(props.name, props.id)}>{props.name}</Link>
                <RightOutlined />
            </div>
            <div>
                <Button
                    icon={<EditOutlined />}
                    onClick={() => {
                        history.push("/edit")
                        props.onClickedEdit(props.name, props.id);
                    }}
                    style={{ marginRight: "4px" }}>
                </Button>
                <Button
                    icon={<DeleteOutlined color="#FF575C"/>}
                    onClick={() => props.onClickedDelete(props.name, props.id)}>
                </Button>
            </div>
        </div>
    );
}