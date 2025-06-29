import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { ProductType } from "../types/ProductType.types";


type Props = {
  products: ProductType[];
  selectedProductIds: number[];
  onChange: (newIds: number[]) => void;
};

const LikedProductsAutocomplete: React.FC<Props> = ({ products, selectedProductIds, onChange }) => {
  return (
    <Autocomplete
      multiple
      id="liked-products"
      options={products}
      getOptionLabel={(option) => option.name}
      value={products.filter((p) => selectedProductIds.includes(p.productId))}
      onChange={(event, newValue) => {
        const newIds = newValue.map((p) => p.productId);
        onChange(newIds);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
         
          placeholder="התחל להקליד..."
        />
      )}
    />
  );
};

export default LikedProductsAutocomplete;
