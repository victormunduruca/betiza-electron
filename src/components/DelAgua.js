import React from "react";
import { Layout, Button } from 'antd';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function DelAgua(props) {
    return (
        <div>
        Agua de coco
            <Link to="/create"> {props.text} </Link>
        </div>
    );
}

export default DelAgua;