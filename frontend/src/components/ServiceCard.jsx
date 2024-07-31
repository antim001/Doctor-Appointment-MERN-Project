import React from 'react'
import {Link} from 'react-router-dom'
import { BsArrowRight } from "react-icons/bs";
const ServiceCard = ({service,index}) => {
  const{name,desc,bgColor,textColor}=service
    return (
        <div className="card bg-base-200 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{desc}</p>
          <div className="card-actions justify-end">
            <Link to='/doctor'><button className="btn btn-primary"><BsArrowRight/></button></Link>
          </div>
        </div>
      </div>
    
  )
}

export default ServiceCard
