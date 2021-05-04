import React from "react";
import {Button} from "antd";

export default function Activity(props) {
    //receive name and key
    //display name and preview and edit button
    return (
        <div>
            {props.name}
            <Button>Editar</Button>
            <Button>Visualizar</Button>
        </div>
    );
}