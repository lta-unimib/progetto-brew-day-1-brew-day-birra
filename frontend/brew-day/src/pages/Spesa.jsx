import React from "react";
import QuantityInput from "../components/QuantityInput";

const Spesa = () => {
    return (
        <div>
          <table className="myTable">
            <tr>
              <th>Foto prodotto</th>
              <th>Nome - Descrizione</th>
              <th>Quantità</th>
            </tr>
            <tr>
              <td><img className="shoppingImage" src="../../icons/inventory-icons/acqua.png"/></td>
              <td>Acqua</td>
              <td><QuantityInput /></td>
            </tr>
            <tr>
              <td><img className="shoppingImage" src="../../icons/inventory-icons/additivi.png"/></td>
              <td>Additivi</td>
              <td><QuantityInput /></td>
            </tr>
            <tr>
              <td><img className="shoppingImage" src="../../icons/inventory-icons/lievito.png"/></td>
              <td>Lievito</td>
              <td><QuantityInput /></td>
            </tr>
            <tr>
              <td><img className="shoppingImage" src="../../icons/inventory-icons/luppoli.png"/></td>
              <td>Luppoli</td>
              <td><QuantityInput /></td>
            </tr>
            <tr>
              <td><img className="shoppingImage" src="../../icons/inventory-icons/malto.png"/></td>
              <td>Malto</td>
              <td><QuantityInput /></td>
            </tr>
            <tr>
              <td><img className="shoppingImage" src="../../icons/inventory-icons/zuccheri.png"/></td>
              <td>Zuccheri</td>
              <td><QuantityInput /></td>
            </tr>
          </table>
          <button id="shoppingBuyButton">Compra</button>
        </div>
    );
}

export default Spesa;
