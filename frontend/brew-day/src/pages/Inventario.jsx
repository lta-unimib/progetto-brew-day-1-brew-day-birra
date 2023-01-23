import React from "react";
import GridInventoryItem from "../components/GridInventoryItem";

const Inventario = () => {
  return (
    <div id="inventoryDiv">
        <table id="inventoryTable">
          <tr>
            <th><GridInventoryItem path="../../icons/inventory-icons/acqua.png" name="Acqua" availability="0"/></th>
            <th><GridInventoryItem path="../../icons/inventory-icons/additivi.png" name="Additivi" availability="0"/></th>
            <th><GridInventoryItem path="../../icons/inventory-icons/lievito.png" name="Lievito" availability="0"/></th>
          </tr>
          <tr>
            <th><GridInventoryItem path="../../icons/inventory-icons/luppoli.png" name="Luppoli" availability="0"/></th>
            <th><GridInventoryItem path="../../icons/inventory-icons/malto.png" name="Malto" availability="0"/></th>
            <th><GridInventoryItem path="../../icons/inventory-icons/zuccheri.png" name="Zuccheri" availability="0"/></th>
          </tr>
        </table>
    </div>
  );
};

export default Inventario;