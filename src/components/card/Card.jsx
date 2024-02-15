import React from 'react'

function Card({width, height,color,content,}) {
  return (
    <div>

        <div className="row d-flex justify-content-center">

            <div className="col-md-12 row d-flex shadow-lg broder_color " style={{ width:width ,  height:height,borderRadius:'20px',boxShadow:'10px',borderColor:'white'}} >
                <div className="d-flex align-items-center justify-content-center">
                    {content}
                </div>
                {/* {content} */}




            </div>
        </div>
    </div>
  )
}

export default Card