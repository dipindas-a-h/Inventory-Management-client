import React, { useEffect, useState } from 'react'
import instance from '../../utils/axios/AxiosInstance';

function Notification() {


    const [lowstocks,setLowStocks] = useState([])
    const getLowStocks = () => {
        instance
          .get(`/stock/nstock/notification`)
          .then((response) => {
            console.log("Response:", response.data);
    
            if (response?.status === 200) {
                
              setLowStocks(response?.data?.data)
            }
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      };

      useEffect(()=>{
        getLowStocks()
      },[])
    

  return (
    <div>

        <div className="row"> <span className='heading_font'>Notification</span></div>


        <div className="row mt=3">

        {lowstocks?.map((item) => (
  <div
    className="col-lg-4 shadow-lg p-3 mx-2 mb-2"
    style={{
      border: '2px solid',
      borderRadius: '10px',
      borderColor: item.qty < 5 ? 'red' : 'blue' // Setting border color dynamically based on item.qty
    }}
  >
    <div className="row">
      <div className="col-12 subheading_font">{item?.stockName}</div>
      <div className="col-6 otherheading_font">
        <span>Quantity: {item?.qty}</span>
      </div>
      <div className="col-6 otherheading_font">
        <span>Unit Price: {item?.price}</span>
      </div>
    </div>
  </div>
))}

     
        </div>
    </div>
  )
}

export default Notification