import { useEffect } from "react";
import { useQueryParam } from "./hooks/useQueryParam";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./store/productsSlice/productsSlice";
import { useLocation } from "react-router-dom";

function App() {
  const { updateQueryParams, filter, searchParams } = useQueryParam();
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);

  const params = searchParams.toString();
  useEffect(() => {
    console.log("params: ", params);
    if (params) {
      dispatch(fetchProducts(params));
    }
  }, [searchParams]);

  useEffect(() => {
    if (params) return;
    dispatch(fetchProducts());
  }, [dispatch]);

  if (!products) return;

  return (
    <>
      <div>
        <div>
          <h3>Collection</h3>
          <label>
            <input
              type="checkbox"
              checked={filter.collection.includes("INFINITY")}
              onChange={() => updateQueryParams("collection", "INFINITY")}
            />
            INFINITY
          </label>
          <label>
            <input
              type="checkbox"
              checked={filter.collection.includes("VANITY")}
              onChange={() => updateQueryParams("collection", "VANITY")}
            />
            VANITY
          </label>
          <label>
            <input
              type="checkbox"
              checked={filter.collection.includes("ENERGY")}
              onChange={() => updateQueryParams("collection", "ENERGY")}
            />
            ENERGY
          </label>
        </div>
        <div>
          <h3>Color</h3>
          <label>
            <input
              type="checkbox"
              checked={filter.color.includes("cr")}
              onChange={() => updateQueryParams("color", "cr")}
            />
            Хром
          </label>
          <label>
            <input
              type="checkbox"
              checked={filter.color.includes("bo")}
              onChange={() => updateQueryParams("color", "bo")}
            />
            Белый
          </label>
          <label>
            <input
              type="checkbox"
              checked={filter.color.includes("bl")}
              onChange={() => updateQueryParams("color", "bl")}
            />
            Черный
          </label>
        </div>
      </div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <img src={`http://localhost:3024/img/${product.img_src}`} alt="" />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
