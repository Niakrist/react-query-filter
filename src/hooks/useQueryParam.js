import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  toggleCollections,
  toggleColors,
} from "../store/productsSlice/productsSlice";

export const useQueryParam = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.products);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params = {};
    if (filter.collection.length > 0) {
      params.collection = filter.collection.join(",");
    }
    if (filter.color.length > 0) {
      params.color = filter.color.join(",");
    }

    setSearchParams(params);
  }, [filter, setSearchParams]);

  const updateQueryParams = (key, value) => {
    switch (key) {
      case "collection":
        dispatch(toggleCollections(value));
        break;
      case "color":
        dispatch(toggleColors(value));
        break;
      default:
        break;
    }
  };

  return { updateQueryParams, filter, searchParams };
};
