import React from "react";
import { Layout, Button } from 'antd';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
function DelWhisky() {
    return (
        <div>
            Whisky
            <Button><Link to="/view"> Va para agua </Link></Button>
        </div>
    );
}

export default DelWhisky;