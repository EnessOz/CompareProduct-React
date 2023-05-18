// SelectedProducts.js

import React from "react";
//<button onClick={() => handleClick(product)} key={product.id}>
//<GetButton ProductId={product} ProductTitle={product.title} key={product.id} onClickGet={handleClick}/>
function GetButton({ ProductId, ProductTitle, onClickGet }) {
  return (
    <div>
     <button className="class" onClick={typeof onClickGet == "function" ? () => onClickGet(ProductId): null}>{ProductTitle}</button>
    
    </div>
  );
}

export default GetButton;
