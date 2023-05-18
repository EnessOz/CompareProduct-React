import { useEffect, useState } from "react";
import "./App.css";
import RemoveButton from "./RemoveButton";
import GetButton from "./GetButton";
import CompareButton from "./CompareButton";

function App() {
  const [data, setData] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [cheapestProduct, setCheapestProduct] = useState(null);
  const [priceDifference, setPriceDifference] = useState(null);

  // Verileri API'den almak için kullanılan fonksiyon
  async function fetchData() {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    setData(data);
  }

  useEffect(() => {
    // Sayfa yüklendiğinde fetchData fonksiyonunu çağırır
    fetchData();
  }, []);

  // Ürünün seçilmesini sağlayan fonksiyon
  function handleClick(product) {
    // Seçilen ürün zaten varsa, eklemeyi iptal et
    if (selectedProducts.find((selectedProduct) => selectedProduct.id === product.id)) {
      return;
    }

    // Diziye eklenen ürün sayısı 2'ye ulaştıysa, ilk ürünü kaldır ve yeni ürünü ekle
    if (selectedProducts.length === 2) {
      const updatedProducts = [...selectedProducts.slice(1), product];
      setSelectedProducts(updatedProducts);
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  }

  // Seçilen ürünü kaldıran fonksiyon
  function handleRemove(product) {
    const updatedProducts = selectedProducts.filter(
      (selectedProduct) => selectedProduct.id !== product.id
    );
    setSelectedProducts(updatedProducts);
  }

  // Compare butonuna basıldığında en ucuz ürünü bulan fonksiyon
  function handleCompare() {
    if (selectedProducts.length > 0) {
      const prices = selectedProducts.map((product) => product.price);
      const minPrice = Math.min(...prices);
      const cheapest = selectedProducts.find((product) => product.price === minPrice);
      setCheapestProduct(cheapest);

      if (selectedProducts.length === 1) {
        setPriceDifference(null);
      } else {
        const maxPrice = Math.max(...prices);
        const priceDiff = ((maxPrice - minPrice) / maxPrice) * 100;
        setPriceDifference(priceDiff.toFixed(2));
      }
    } else {
      setCheapestProduct(null);
      setPriceDifference(null);
    }
  }

  return (
    <div className="App">
      <div className="btn">
        {data.map((product) => (
          <GetButton ProductTitle={product.title} ProductId={product} key={product.id} onClickGet={handleClick} />
        ))}
      </div>
      <div className="selected-products">
        <div className="compareDiv">
          <CompareButton onClickCompare={handleCompare} />
        </div>
        {selectedProducts.map((product) => (
          <div className="selected-product" key={product.id}>
            <div>
              <h2>{product.title}</h2>
              <p>Price: {product.price}</p>
            </div>
            <div>
              <img className="image" src={product.image} alt={product.title} />
              <RemoveButton ProductMain={product} onClickRemove={handleRemove} />
            </div>
          </div>
        ))}
        {cheapestProduct && (
          <div>
            <div className="cheapest-product">
              <h3>Cheapest Product:</h3>

              <h2>{cheapestProduct.title}</h2>
              <p>Price: {cheapestProduct.price}</p>
              {priceDifference && (
                <div className="price-difference">
                  <p>Price Compare: %{priceDifference}</p>
                </div>

              )}
            </div>
          </div>
        )}


      </div>
    </div>
  );
}

export default App;
