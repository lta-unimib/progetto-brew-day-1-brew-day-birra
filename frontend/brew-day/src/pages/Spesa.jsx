import React from "react";
import QuantityInput from "../components/QuantityInput";
import { ThemeProvider } from "@mui/material";
import theme from "../theme/theme";
import MButton from '../components/MButton';

const Spesa = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <table className="myTable">
          <thead>
            <tr>
              <th>Foto prodotto</th>
              <th>Nome - Descrizione</th>
              <th>Quantità</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img
                  className="shoppingImage"
                  src="../../icons/inventory-icons/acqua.png"
                  alt=""
                />
              </td>
              <td>Acqua</td>
              <td>
                <QuantityInput />
              </td>
            </tr>
            <tr>
              <td>
                <img
                  className="shoppingImage"
                  src="../../icons/inventory-icons/additivi.png"
                  alt=""
                />
              </td>
              <td>Additivi</td>
              <td>
                <QuantityInput />
              </td>
            </tr>
            <tr>
              <td>
                <img
                  className="shoppingImage"
                  src="../../icons/inventory-icons/lievito.png"
                  alt=""
                />
              </td>
              <td>Lievito</td>
              <td>
                <QuantityInput />
              </td>
            </tr>
            <tr>
              <td>
                <img
                  className="shoppingImage"
                  src="../../icons/inventory-icons/luppoli.png"
                  alt=""
                />
              </td>
              <td>Luppoli</td>
              <td>
                <QuantityInput />
              </td>
            </tr>
            <tr>
              <td>
                <img
                  className="shoppingImage"
                  src="../../icons/inventory-icons/malto.png"
                  alt=""
                />
              </td>
              <td>Malto</td>
              <td>
                <QuantityInput />
              </td>
            </tr>
            <tr>
              <td>
                <img
                  className="shoppingImage"
                  src="../../icons/inventory-icons/zuccheri.png"
                  alt=""
                />
              </td>
              <td>Zuccheri</td>
              <td>
                <QuantityInput />
              </td>
            </tr>
          </tbody>
        </table>
        <MButton text="Compra" id="shoppingBuyButton" />
      </div>
    </ThemeProvider>
  );
};

export default Spesa;
