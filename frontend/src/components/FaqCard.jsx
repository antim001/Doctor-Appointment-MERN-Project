import {useState} from 'react';
import {AiOutlineMinus,AiOutlinePlus} from 'react-icons/ai'
const FaqCard = ({faq}) => {
    const {question,content}=faq;
    const [isOpen,setisOpen]=useState(false);
    const toggleBy=()=>{
 setisOpen(!isOpen)
    }
  return (
    <div className='p-3 lg:p-5 rounded-[12px] border border-solid border-[#09DCE2] mb-5 cursor-pointer '>
      <div className='felx items-center justify-between gap-5' onClick={toggleBy}>
  <h4 className='text-[16px] leading-7 lg:text-[22px] lg:leading-8'>{question}</h4>
      <div className={` ${isOpen && 
        'bg-purple-300 text-white border-none' }w-7 h-7 lg:w-8 lg:h-8 border-solid  border-[#141F21] rounded flex items-center justify-center`}>
{isOpen?<AiOutlineMinus/>:<AiOutlinePlus/>}
      </div>
      </div>
      {
        isOpen && <div className='mt-4'>
            <p className='text-[14px] leading-6 lg:text-[10px] lg:font-[400]'>{content}</p>
        </div>
      }
    </div>
  )
}

export default FaqCard
