import React from "react";
import { Button, Tooltip } from "antd";
import { Link, useHistory } from "react-router-dom";
import { EditOutlined, DeleteOutlined, RightOutlined, PlayCircleOutlined } from '@ant-design/icons';

export default function ActivityPreview(props) {
    const history = useHistory();

    return (
        <div className="activity-preview">
            <div style={{ display: "flex", alignItems: "center" }}>
                {/* <Link to="/view" style={{color: "black", fontSize: "1.5rem", marginRight: "4px"}} onClick={() => props.onClickedView(props.name, props.id)}>{props.name}</Link> */}
                <span style={{ color: "black", fontSize: "1.5rem", marginRight: "4px" }}>{props.name}</span>
            </div>
            <div>
                <Tooltip placement="top" title={"Visualizar atividade"}>
                    <Button
                        icon={<PlayCircleOutlined />}
                        onClick={() => {
                            history.push("/view");
                            props.onClickedView(props.name, props.id);
                        }}
                        style={{ marginRight: "4px" }}>
                    </Button>
                </Tooltip>
                <Tooltip placement="top" title={"Editar"}>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => {
                            history.push("/edit")
                            props.onClickedEdit(props.name, props.id);
                        }}
                        style={{ marginRight: "4px" }}>
                    </Button>
                </Tooltip>
                <Tooltip placement="top" title={"Remover"}>
                    <Button
                        icon={<DeleteOutlined color="#FF575C" />}
                        onClick={() => props.onClickedDelete(props.name, props.id)}>
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
}