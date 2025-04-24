// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// import './CartOpt.css'

// export default function CartOpt(){

//     let[medi,setMedi]=useState([]);
//     let nav= useNavigate();

//     useEffect(()=>{

//         async function getMedi(){
//             await axios.get('http://localhost:8080/getRandomMedi')
//             .then((res)=>{
//                 if(res.data.medi){
//                     console.log(res.data.medi);
//                     setMedi(res.data.medi);
//                 }
//             })
//             .catch((e)=>{
//                   console.log(e);
//             })
//         }

//         getMedi();

//     },[])


//    async function handleSearch(id){
      
//              await axios.get(`http://localhost:8080/getDataClk/${id}`)
//              .then((response)=>{
//                 console.log(response.data.med);
//                 if (response.data.med){
//                    nav('/Product',{state:response.data.med})
//                 }
//              })
//              .catch ((e)=>{
//                 console.log(e);
//              }) 
    
//             }

//     return(
//         <div className="opt">
//             {
//                 medi.map((ele)=>{
//                     return(
//                         <div onClick={()=>{handleSearch(ele._id)}}  className="product" key={ele._id}>
//                             <div className="imProd">
//                                 <img src={ele.img1} alt="" />
//                             </div>
//                             <p><b>{ele.name}</b></p>
//                             <p>&#8360;<b> {ele.price}</b></p>
//                         </div>
//                     )
//                 })
//             }
//         </div>
//     )
// }


// down copil code 
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported
import './CartOpt.css';

export default function CartOpt() {
  let [medi, setMedi] = useState([]);
  let nav = useNavigate();

  useEffect(() => {
    async function getMedi() {
      try {
        const res = await axios.get('http://localhost:8080/getRandomMedi');
        if (res.data.medi) {
          console.log(res.data.medi);
          setMedi(res.data.medi);
        }
      } catch (e) {
        console.log(e);
      }
    }

    getMedi();
  }, []);

  async function handleSearch(id) {
    try {
      const response = await axios.get(`http://localhost:8080/getDataClk/${id}`);
      console.log(response.data.med);
      if (response.data.med) {
        nav('/Product', { state: response.data.med });
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="opt">
      {medi.map((ele) => {
        // Add a null check for `ele`
        if (!ele) return null;

        return (
          <div
            onClick={() => {
              handleSearch(ele._id);
            }}
            className="product"
            key={ele._id}
          >
            <div className="imProd">
              {/* Add a fallback for `ele.img1` */}
              <img src={ele.img1 || 'default-image.jpg'} alt={ele.name || 'Product'} />
            </div>
            <p>
              <b>{ele.name || 'Unknown Product'}</b>
            </p>
            <p>
              &#8360;<b>{ele.price || 'N/A'}</b>
            </p>
          </div>
        );
      })}
    </div>
  );
}