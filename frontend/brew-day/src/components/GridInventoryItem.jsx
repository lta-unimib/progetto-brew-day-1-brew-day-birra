import React from "react";

const GridInventoryItem = (props) => {
    return(
        <div>
            <img className="inventoryImage" src={props.path}/>
            <p className="inventoryText">{props.name}</p>
            <p className="inventoryText">Disponibilità: {props.availability}</p>
        </div>
    );
}

export default GridInventoryItem;