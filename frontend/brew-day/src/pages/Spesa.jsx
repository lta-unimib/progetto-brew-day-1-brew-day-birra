import React from "react";
import ShoppingItem from "../components/ShoppingItem"

const Spesa = () => {
    return (
        <div id="divSpesa">
          <ShoppingItem path="../../icons/inventory-icons/acqua.png" name="Acqua"/>
          <ShoppingItem path="../../icons/inventory-icons/additivi.png" name="Additivi"/>
          <ShoppingItem path="../../icons/inventory-icons/lievito.png" name="Lievito"/>
          <ShoppingItem path="../../icons/inventory-icons/luppoli.png" name="Luppoli"/>
          <ShoppingItem path="../../icons/inventory-icons/malto.png" name="Malto"/>
          <ShoppingItem path="../../icons/inventory-icons/zuccheri.png" name="Zuccheri"/>
        </div>
    );
}

export default Spesa;
