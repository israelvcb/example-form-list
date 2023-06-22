"use client";
import { DepotsType } from "@/@Types/DepotsType";
import { useActiveProductsQuery, useDepotsQuery } from "@/hooks/Queries";
import { NextPage } from "next";
import { ChangeEvent, FormEvent, useState } from "react";
import Select from "react-select";
interface Product {
  id: number;
  productName: string;
  quantity: number;
}

interface FormData {
  destinationDepotId: string;
  reasonMovement: string;
  productsArray: Product[];
}

interface Props {}

interface Error {
  errorMessage?: string | undefined;
  statusCode: number | undefined;
}

const EntryProduct: NextPage<Props> = ({}) => {
  const [destinationDepotId, setDestinationDepotId] = useState<string>("");
  const [reasonMovement, setReasonMovement] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);

  const productsActiveQuery = useActiveProductsQuery();
  console.log(productsActiveQuery);

  const depotsQuery = useDepotsQuery();
  const handleProductChange = (
    index: number,
    field: keyof Product,
    value: string | number
  ) => {
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: value,
    };
    setProducts(updatedProducts);
  };

  const handleAddProduct = () => {
    setProducts([...products, { id: 0, productName: "", quantity: 0 }]);
  };

  const handleRemoveProduct = (index: number) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData: FormData = {
      destinationDepotId,
      reasonMovement,
      productsArray: products,
    };
    console.log(formData);

    setDestinationDepotId("");
    setReasonMovement("");
    setProducts([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor="destinationDepotId"
        className="block text-sm font-medium text-gray-700"
      >
        Depósito de destino
      </label>
      <div className="mb-4">
        <Select
          id="destinationDepotId"
          classNamePrefix="Selecione o depósito"
          closeMenuOnSelect={true}
          options={depotsQuery.data}
          isClearable={true}
          getOptionLabel={(option: DepotsType) => option.tableDepotName}
          getOptionValue={(option: DepotsType) => option.tableDepotName}
          onChange={(option: DepotsType) =>
            setDestinationDepotId(option?.tableDepotName)
          }
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="reasonMovement"
          className="block text-sm font-medium text-gray-700"
        >
          Razão da movimentação
        </label>
        <input
          type="text"
          id="reasonMovement"
          className="input border-neutral-500 bg-white w-full  text-stone-950"
          value={reasonMovement}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setReasonMovement(e.target.value)
          }
        />
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-medium text-gray-900">Products</h2>
        {products.map((product: Product, index: number) => (
          <div key={index} className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Product {index + 1}
            </label>

            <select
              className="bg-white mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={product.productName}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleProductChange(index, "productName", e.target.value)
              }
            >
              <option value="">Select a product</option>
              <option value="Product 1">Product 1</option>
              <option value="Product 2">Product 2</option>
              <option value="Product 3">Product 3</option>
              {/* Add more options as needed */}
            </select>
            <input
              type="number"
              className="bg-white mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={product.quantity}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleProductChange(index, "quantity", parseInt(e.target.value))
              }
            />
            <button
              type="button"
              className="mt-2 px-2 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              onClick={() => handleRemoveProduct(index)}
            >
              Delete
            </button>
          </div>
        ))}
        <button
          type="button"
          className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>
      <button
        type="submit"
        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Submit
      </button>
    </form>
  );
};
export default EntryProduct;
