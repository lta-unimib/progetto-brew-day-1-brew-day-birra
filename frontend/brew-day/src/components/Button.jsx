import React, { useState } from "react";

const Button = () => {
    const [count, setCount] = useState(0);

    return (
        <React.Fragment>
            <span className = "shoppingItemText">{count}</span>
            <button onClick={() => {if (count > 0) setCount(count - 1)}}>-</button>
            <button onClick={() => setCount(count + 1)}>+</button>
        </React.Fragment>
    );
}

export default Button;
