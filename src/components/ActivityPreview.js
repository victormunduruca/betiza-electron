import React from "react";
import {Button} from "antd";
import { Link } from "react-router-dom";

export default function ActivityPreview(props) {
    //receive name and key
    //display name and preview and edit button
    return (
        <div>
            {props.name}
            <Button onClick={() => props.onClickedEdit(props.name, props.id)}><Link to="/edit">Editar</Link></Button>
            <Button onClick={() => props.onClickedView(props.name, props.id)}><Link to="/view">Visualizar</Link></Button>
            <Button onClick={() => props.onClickedDelete(props.name, props.id)}>Deletar</Button>
        </div>
    );
}