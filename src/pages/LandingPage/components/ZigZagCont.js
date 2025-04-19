import React from 'react'

import quality from '../../../assets/QualityProducts.png'
import medicals from '../../../assets/Trust.png'
import wide from '../../../assets/WideNetwork.png'
import {trust,wide1,quality1} from '../../../constants/strings'
import './ZigZagCont.css'

export default function () {
  return (
    <>
        <div className="zigzag-container">
        <div className="zigzag-item left">
          <div className="zigzag-image">
            <img src={medicals} alt="zigzag-1" />
          </div>
          <div className="zigzag-text">
            
              <h1>Hundreds of Medicals Trust Us</h1>
              <p dangerouslySetInnerHTML={{__html:trust}}/>
          </div>
        </div>

      <div className="zigzag-item right">
      <div className="zigzag-image">
          <img src={quality} alt="zigzag-2" />
        </div>
        <div className="zigzag-text">
          <p>
          <h1>Assured Quality Products</h1>
            {quality1}</p>
        </div>
        
      </div>

      <div className="zigzag-item left">
        <div className="zigzag-image">
          <img src={wide} alt="zigzag-3" />
        </div>
        <div className="zigzag-text">
          <p>
          <h1>Wide Network of Medicals</h1>
            {wide1}</p>
        </div>
      </div>
      
    </div>
    </>
  )
}
