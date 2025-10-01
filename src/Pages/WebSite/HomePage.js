import { Container } from "react-bootstrap";

import { Link } from "react-router-dom";
import "./home.css";
import Product from "../../Components/Product/Product";
import Landing from "../../Components/WebSite/Landing/Landing";
import LatestSalesProducts from "../../Components/Product/LatestSalesProducts";


 export default function HomePage() {
  return (
    <div >
      <Landing/>
      <LatestSalesProducts/>
    </div>
  );
}


