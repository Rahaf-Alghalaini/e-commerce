
import { faStar as solid} from "@fortawesome/free-solid-svg-icons";

import { faStar as regularStar} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";
import StringSlice from "../../helpers/StringSlice";

export default function Product(props){
    const stars=Math.min(props.rating,5);
    const shoeGoldStars=Array.from({length:stars}).map((_,index)=>(
        <FontAwesomeIcon key={index} icon={solid}/>

    ));
        const shoeEmptyStars=Array.from({length:5-stars}).map((_,index)=>(
        <FontAwesomeIcon key={index} icon={regularStar}/>

    ));
    return(
     
        
   
                <div className="col-lg-3 col-md-6 col-12">
                    <div className="m-1 border rounded p-3 h-100">
                        <div className="border-bottom pb-3">
                            <p style={{color:"gray"}}>{StringSlice(props.title,40)}</p>
                            <p>{props.description}</p>
                            <div className="px-5 py-4 position-relative">
                               {  props.sale &&(<p className="m-0 position-absolute top-0 start-0  bg-primary rounded-circle text-white text-uppercase d-inline-block 
                                text-center"
                                style={{width:"50px", height:"50px", lineHeight:"50px"}}
                                >
                                sale
                                </p>)}
                                <img src={props.img}
                                alt=""
                                className="img-fluid"
                                />

                            </div>


                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-2">
                            <div>
                        {shoeGoldStars}
                        {shoeEmptyStars}
                         
                           <div className="d-flex align-items-center gap-3">
                            <h5 className="m-0 text-primary">
                                {props.discount}$
                            </h5>
                            <h6 className="m-0"
                            style={{color:"gray", textDecoration:"line-through"}}
                            >
                                {props.price}$
                            </h6>

                           </div>

                            </div>
                            <div className="border p-2 rounded">
                                <img
                                src={require("../../assets/cart.png")}
                                alt=""
                                width="20px"
                                />

                            </div>

                        </div>
                    </div>

                </div>
        

    
    );


}