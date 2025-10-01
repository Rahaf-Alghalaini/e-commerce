import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form,Table } from "react-bootstrap";
import {  Link } from "react-router-dom";
import { Axios } from "../../Api/axios";
import { PaginatedItems } from "../../Pages/Dashboard/Pagination/Pagination";
import { useEffect, useState } from "react";
import { Cat } from "../../Api/Api";
import TransformDate from "../../helpers/TransformDate";

export default function TableShow(props){
    const currentUser=props.currentUser||{
      name:"",
    };
    const[search,setSearch]=useState('');
    const[date,setDate]=useState('');
    const [filtredData,setFiltredData]=useState([]);
    const [searchLoading,setSearchLoading]=useState(false);
    

    const filtredDataByData=props.data.filter(
      (item)=>TransformDate(item.created_at)=== date
    );
    const filterSearchByDate=filtredData.filter((item)=>TransformDate(item.created_at)=== date)

    const showWichData=date.length !==0 ?
    search.length>0 ? filterSearchByDate: filtredDataByData
    :search.length>0 ? filtredData:props.data;
    

    async function getSearchData() {
            
          try{
             const res= await Axios.post(`${props.searchLink}/search?title=${search}`);
             setFiltredData(res.data);
      
            }catch(err){
             console.log(err);       }
             finally{
              setSearchLoading(false);
             }
            
         }
                  useEffect(()=>{
            const debounce=setTimeout(()=>{
              search.length>0 ?  getSearchData():setSearchLoading(false);

            },500);
            return ()=>clearTimeout(debounce);

         },[search])



    //  const start=(props.page-1) * props.limit;
    //  const end=Number( start) +Number( props.limit);
    //  const final=props.data.slice(start,end);
    const headerShow=props.header.map((item)=>
        <th>{item.name}</th>
    );
    const dataShow=showWichData.map((item,key)=>(
    <tr key={key}>
        <td>{item.id}</td>
        {props.header.map((item2,key2)=>
        <td key={key2}>
          { item2.key === 'image'?(
             <img width='60px' src={item[item2.key]} alt=""/>
          ): item2.key === 'images' ? 
          <div className="d-flex align-items-center justify-content-start gap-2 flex-wrap">
            {item[item2.key].map((img )=>( <img width='60px' src={img.image} alt=""/>

            ))}
            </div>
          :item2.key==='created_at'||item2.key==='updated_at'?(
            TransformDate(item[item2.key])

          ) : item[item2.key] === '1995'
            ?( 'admin'
             ) : item[item2.key]  === '2001'
            ?( 'user'
              
             ) :item[item2.key] === '1996'
            ?('writer'
             ) :item[item2.key]=== '1999'
            ?( 'Product Manger'
             ) :(item[item2.key]
          )}
           { currentUser && item[item2.key] === currentUser.name && '(You)'} 
            </td>
            )}
            <td>
                         <div className="d-flex align-items-center gap-2">
                                <Link to={`${item.id}`}>
                              
                        <FontAwesomeIcon fontSize={'19px'} icon={faPenToSquare} />
                        </Link>
                        
                
                        {currentUser.name!==item.name &&(
                        <FontAwesomeIcon 
                         onClick={()=>props.delete(item.id)}
                         fontSize={'19px'}
                          color="red" 
                          cursor={'pointer'}
                           icon={faTrash} />
                        )}
                          
                        </div>
            </td>
            </tr>
            ));
    return(
      <>
      <div className="col-3">
      <Form.Control
      
      className="my-2"
      type="search"
      aria-label="input example"
      placeholder="search"
      onChange={(e)=>{
        setSearch(e.target.value)
        setSearchLoading(true);
      }
      }

     />
     </div>
        <div className="col-5">
      <Form.Control
      
      className="my-2"
      type="date"
      aria-label="input example"
      placeholder="date"
      onChange={(e)=>{
        setDate(e.target.value)
        
      }
      }

     />
     </div>
     
    <Table striped bordered hover>
    <thead>
      <tr>
        <th>id</th>
        {headerShow}

        <th>Action</th>
        
      </tr>
    </thead>
    <tbody>
      {props.loading  ? (
        <tr className="text-center">
          <td colSpan={12}>Loading...</td>
        </tr>
      ): searchLoading ?
           <tr className="text-center">
          <td colSpan={12}>Searching...</td>
        </tr>:(
          dataShow
      )}
  
    </tbody>
  </Table>
  <div className="d-flex align-items-center justify-content-end flex-wrap">
    <div className="col-1">
  <Form.Select onChange={(e)=> props.setLimit(e.target.value)} aria-label="Default select example">
    <option value="3">3</option>
    <option value="5">5</option>
    <option value="10">10</option>
    <option value="15">15</option>

  </Form.Select>
</div>



  <PaginatedItems setPage={props.setPage} itemsPerPage={props.limit} data={props.data}
  total={props.total}
  />
  
</div>
  </>
  
    );
}