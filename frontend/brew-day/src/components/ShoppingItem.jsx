import React from "react";
import Button from "./Button";

const shoppingItem = (props) => {
    return(
        <div id="shoppingItemDiv">
            <img src={props.path} height="80px"/>
            <span className="shoppingItemText">{props.name}</span>
            <Button />
        </div>
    );
}

export default shoppingItem;