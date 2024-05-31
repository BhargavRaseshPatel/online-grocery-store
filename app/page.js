import { Button } from "@/components/ui/button";
import Image from "next/image";
import Sliders from "./_components/Sliders";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Footer from "./_components/Footer";

export default async function Home() {

  const sliderList = await GlobalApi.getSliders()

  const categoryList = await GlobalApi.getCategoryList()

  const productList = await GlobalApi.getAllProducts()
  
  return (
    <div className="p-5 md:p-12 px-20">
      {/* Sliders */}
      <Sliders sliderList={sliderList}/>

      {/* Category List */}
      <CategoryList categoryList={categoryList}/>

      {/* Product List */}
      <ProductList productList={productList}/>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
