import {useState,useEffect}from 'react';
import { Link } from 'react-router-dom';
import Testimonial from '../../components/Testimonial.jsx'
import {doctors} from '../../assets/data/doctors.js'
import DoctorCard from '../../components/DoctorCard.jsx'
import { BASE_URL } from '../../config.js';
import UseFetchData from '../../hooks/UseFetchData.jsx';
import Loader from '../../components/Loader/Loading.jsx';
import Error from '../../components/Error/Error.jsx';
const Doctor = () => {
  const [query,setQuery]=useState('')
  const [debounceQuery,setDebounceQuery]=useState('')
 const handleSearch=()=>{
  setQuery('query.trim()')
  console.log('handle search')
 };
 useEffect(()=>{
  const timeout =setTimeout(()=>{
    setDebounceQuery(query)
  },700)
  return()=>clearTimeout(timeout)
 },[query])
 const { data: doctors, loading, error } = UseFetchData(`${BASE_URL}/doctors?query=${debounceQuery}`);
 
  return (
    <div>
      <h1 className='text-center text-2xl'>Find a doctor</h1>
<div className='max-w-[570px] mt-[30px] mx-auto  bg-[#0066ff2c] rounded-md  flex items-center justify-between'>
<input type="search" 
className='py-4 pl-4 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-black' 
placeholder="search a doctor by name or specialization" 
value={query}
onChange={(e)=>setQuery(e.target.value)}
/>

<button className='btn mt-0 rounded-[0px] rounded-r-md bg-blue-500' onClick={handleSearch}>Search</button>
</div>
{loading && <Loader />}
      {error && <Error />}
{ !loading && !error && <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4'>
{
    doctors.map((doctor)=>(
        <DoctorCard doctor={doctor} key={doctor.id}/>
    ))
}
   </div>}
   <Testimonial/>
    </div>
  )
}

export default Doctor
