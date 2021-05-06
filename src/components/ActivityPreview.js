import React from "react";
import {Button} from "antd";

export default function ActivityPreview(props) {
    //receive name and key
    //display name and preview and edit button
    return (
        <div>
            {props.name}
            <Button onClick={() => props.onClickedEdit(props.name, props.id)}>Editar</Button>
            <Button onClick={() => props.onClickedView(props.name, props.id)}>Visualizar</Button>
        </div>
    );
}