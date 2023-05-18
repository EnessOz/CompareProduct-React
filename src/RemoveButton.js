// Button.js

import React from "react";
//<button onClick={() => handleRemove(product)}>Sil</button>
function RemoveButton({ onClickRemove, ProductMain, Class }) {
  return (
    <div>
      <button onClick={typeof onClickRemove == "function" ? () => onClickRemove(ProductMain): null }>Sil</button>
    </div>
  );
}

export default RemoveButton
