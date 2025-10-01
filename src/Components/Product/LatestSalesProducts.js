import { useEffect, useState } from "react"
import { Axios } from "../../Api/axios"
import { LatestSale} from "../../Api/Api"
import Product from "./Product";
import { Container } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import SkeletonShow from "../WebSite/Skeleton/SkeletonShow";


export default function LatestSalesProducts(){
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        Axios.get(`${LatestSale}`).then((res)=> setProducts(res.data)).finally(()=> setLoading(false));


    },[]);
    console.log(products);
    const productsShow=products.map((product)=>(<Product
     title={product.title} 
     description={product.description} 
    //  img={product.images[0].image}
     sale
     price={product.price}
     discount={product.discount}
     rating={product.rating}
    />));
    return (
    <Container>
        <h1 className="mt-5">Latest Sale Products</h1>
    <div className="d-flex align-items-stretch justify-content-center flex-wrap row-gap-2 mb-5">
        
        {loading ? (
            <>
           <SkeletonShow height="300px" length="4" classes="col-lg-3"/>
           </>
        ):( 
         productsShow
         )}
            </div>
    </Container>
    );
}