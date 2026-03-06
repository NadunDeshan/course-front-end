import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import toast from "react-hot-toast";
import axios from "axios";

export function UpdateProductPage() {
  const location = useLocation();
  const [productID, setProductId] = useState(location.state.productID); 
  const [name, setName] = useState(location.state.name);
  const [altName, setAltNames] = useState(
  Array.isArray(location.state?.altName) ? location.state.altName.join(",") : "");
  const [description, setDescription] = useState(location.state.description);
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState(location.state.price);
  const [labelledPrice, setLablledPrice] = useState(location.state.labelledPrice);
  const [catogory, setCatogory] = useState(location.state.catagory);
  const [stock, setStock] = useState(location.state.stock);
  const navigate = useNavigate();

  async function updateProduct(params) {
    const token = localStorage.getItem("token");
    if (token == null) {
      navigate("/login");
      return;
    }
    const promises = [];
    for (let i = 0; i < images.length; i++) {
      promises[i] = mediaUpload(images[i]);
    }
    try {
      let urls = await Promise.all(promises);
        if(urls.length == 0){
            urls=location.state.images
        }

      const alternativeNames = altName.split(",");

      const product = {
        productID: productID,
        name: name,
        altName: alternativeNames,
        description: description,
        images: urls,
        price: price,
        labelledPrice: labelledPrice,
        catagory: catogory,
        stock: stock,
      };

      await axios.put(
        import.meta.env.VITE_API_URL + "/api/products/"+productID,product,{
          headers: {
            Authorization: "Bearer " + token
          },
        },
      );
      toast.success("Product Upded Successfully");
      navigate("/admin/products");
    } catch {
      toast.error("An error occured");
    }
  }

  return (
    <div className="w-full h-full min-h-screen bg-primary flex justify-center items-center p-6">
      {/* Glass card */}
      <div className="w-full max-w-3xl rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 bg-primary/50 border-b border-white/15">
          <h1 className="text-2xl font-bold text-secondary">Update Product</h1>
          <p className="text-base text-secondary/70 mt-1">
            Fill in product details to update it to your store.
          </p>
          <div className="mt-4 h-1 w-24 rounded-full bg-accent" />
        </div>

        {/* Form */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Product ID */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-secondary/80">
                Product ID
              </label>
              <input
              disabled
                value={productID}
                onChange={(e) => {
                  setProductId(e.target.value);
                }}
                placeholder="ND001"
                className="w-full h-12 rounded-xl bg-white/80 px-4 text-secondary outline-none ring-1 ring-white/25 focus:ring-2 focus:ring-accent transition"
              />
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-secondary/80">
                Product Name
              </label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Crystal Glow Face Cream"
                className="w-full h-12 rounded-xl bg-white/80 px-4 text-secondary outline-none ring-1 ring-white/25 focus:ring-2 focus:ring-accent transition"
              />
            </div>

            {/* Alt Names */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-secondary/80">
                Alternative Names
              </label>
              <input
                value={altName}
                onChange={(e) => {
                  setAltNames(e.target.value);
                }}
                placeholder="Glow Cream, Crystal Moisturizer"
                className="w-full h-12 rounded-xl bg-white/80 px-4 text-secondary outline-none ring-1 ring-white/25 focus:ring-2 focus:ring-accent transition"
              />
              <p className="text-xs text-secondary/60">
                Tip: Separate names with commas.
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-secondary/80">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                placeholder="Write a short product description..."
                className="w-full min-h-[120px] rounded-xl bg-white/80 p-4 text-secondary outline-none ring-1 ring-white/25 focus:ring-2 focus:ring-accent transition resize-none"
              />
            </div>

            {/* Images */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-secondary/80">
                Product Images
              </label>

              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                <input
                  type="file"
                  onChange={(e) => {
                    setImages(e.target.files);
                  }}
                  multiple
                  className="w-full text-sm text-secondary file:mr-4 file:rounded-xl file:border-0 file:bg-accent file:px-4 file:py-2 file:text-white file:font-semibold hover:file:brightness-110 transition"
                />
                <p className="mt-2 text-xs text-secondary/60">
                  Upload multiple images (JPG/PNG). First image will be used as
                  cover.
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-secondary/80">
                Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                placeholder="4500"
                className="w-full h-12 rounded-xl bg-white/80 px-4 text-secondary outline-none ring-1 ring-white/25 focus:ring-2 focus:ring-accent transition"
              />
            </div>

            {/* Labelled Price */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-secondary/80">
                Labelled Price
              </label>
              <input
                type="number"
                value={labelledPrice}
                onChange={(e) => {
                  setLablledPrice(e.target.value);
                }}
                placeholder="5200"
                className="w-full h-12 rounded-xl bg-white/80 px-4 text-secondary outline-none ring-1 ring-white/25 focus:ring-2 focus:ring-accent transition"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-secondary/80">
                Category
              </label>
              <select
                value={catogory}
                onChange={(e) => {
                  setCatogory(e.target.value);
                }}
                className="w-full h-12 rounded-xl bg-white/80 px-4 text-secondary outline-none ring-1 ring-white/25 focus:ring-2 focus:ring-accent transition"
              >
                <option value="Accessories">Accessories</option>
                <option value="Parts">Parts</option>
                <option value="RidingGear">RidingGear</option>
              </select>
            </div>

            {/* Stock */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-secondary/80">
                Stock
              </label>
              <input
                type="number"
                value={stock}
                onChange={(e) => {
                  setStock(e.target.value);
                }}
                placeholder="100"
                className="w-full h-12 rounded-xl bg-white/80 px-4 text-secondary outline-none ring-1 ring-white/25 focus:ring-2 focus:ring-accent transition"
              />
            </div>
          </div>

          {/* Footer actions (UI only, no logic added) */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              onClick={() => {
                navigate("/admin/products");
              }}
              type="button"
              className="h-12 px-6 rounded-xl bg-red-500 text-white font-semibold ring-1 ring-white/20 hover:border-[4px] hover:border-accent "
            >
              Cancel
            </button>
            <button
              onClick={updateProduct}
              type="button"
              className="h-12 px-6 rounded-xl bg-accent text-white font-semibold shadow-lg shadow-accent/30 hover:brightness-110 active:scale-[0.99] transition hover:border-[4px]"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
