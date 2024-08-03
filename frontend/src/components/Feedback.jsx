import {useState} from 'react'
import avatar from './../assets/image/avatar-icon.png';
import {formateDate} from './../utils/FormateDate.js';
import { Link } from 'react-router-dom';
import {AiFillStar} from 'react-icons/ai';
import FeedbackForm from '../components/FeedbackForm.jsx'
const Feedback = () => {
  const [showFeedbackForm,setShowFeedbackForm]=useState(false)
  return (
    <div>
      <div className='mb-[50px]'>
        <h4 className='text-[20px] leading-[30px] font-bold mb-[30px]'>All reviews (272)</h4>
     <div className='flex justify-between gap-10 mb-[30px]'>
<div className='flex gap-3'>
 <figure>
    <img src={avatar}alt="" />
 </figure>
 <div>
    <h5 className='text-[16px] leading-6 text-blue-800 font-bold'>Ali ahmed</h5>
 <p className='text-[14px] leading-6 text-blue-600'>{formateDate('02-14-2023')}</p>
 <p className='text__para mt-3 font-medium text-[15px]'>Good sercices,highly recommended </p>
 </div>
</div>
<div className='flex gap-1'>
   {[...Array(5).keys()].map((_,index)=>(
    <AiFillStar key={index} color='#0067FF'/>
   ))} 
</div>
     </div>
      </div>
     { !showFeedbackForm && (
       <div className='text-center'><button className='btn btn-secondary'onClick={()=>setShowFeedbackForm(true)}>Give Feedback</button>
    </div>)}
    {showFeedbackForm && <FeedbackForm />}
    
  </div>
  )
}

export default Feedback
