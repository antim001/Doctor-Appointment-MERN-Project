/* eslint-disable react/prop-types */
import { useState,useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import uploadImageToCloudinary from './../../utils/uploadCloudinary'
import {BASE_URL,token} from './../../config.js'
import {toast} from 'react-toastify'
const Profile = ({doctorData}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password:'',
        phone: '',
        bio: '',
        gender: '',
        specialization: '',
        ticketPrice: 0,
        qualifications: [],
        experiences: [],
        timeSlots: [],
        about:'',
         photo:null
    
    });
useEffect(()=>{
 setFormData({
    name:doctorData?.name,
    email: doctorData?.email,
        
        phone: doctorData?.phone,
        bio: doctorData?.bio,
        gender: doctorData?.gender,
        specialization: doctorData?.specialization,
        ticketPrice: doctorData?.ticketPrice,
        qualifications: doctorData?.qualifications,
        experiences: doctorData?.experiences,
        timeSlots: doctorData?.timeSlots,
        about:doctorData?.about,
         photo:doctorData?.photo
 })
},[doctorData])
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
const handleFileInputChange =async event=>{
   const file = event.target.files[0]
   const data= await uploadImageToCloudinary(file)
    console.log(data)
    setFormData({...formData,photo:data?.url})
} 
const updateProfileHandler=async e=>{
   e.preventDefault();
   try{
      const res =await fetch(`${BASE_URL}/doctors/${doctorData._id}`,{
         method:'PUT',
         headers:{
            'content-type':'application/json',
            Authorization:`Bearer ${token}`
         },
         body:JSON.stringify(formData)
      })
      const result =await res.json()
     if(!res.ok) {
        throw Error(result.message)
     }
     toast.success(result.message);

   }catch(err){
     toast.error(err.message)
   }
}
//resusable function for
const addItem = (key, item) => {
    // Check if the key corresponds to an array in formData
    if (Array.isArray(formData[key])) {
        setFormData(prevFormData => ({
            ...prevFormData,
            [key]: [...prevFormData[key], item]
        }));
    } else {
        console.error(`The key '${key}' does not correspond to an array in formData.`);
    }
};
//reusable input change function
const  handleReusableInputChangeFunc=(key,index,event)=>{

     const {name,value}=event.target
setFormData(prevFormData=>{
    const updateItems=[...prevFormData[key]]
    updateItems[index][name]=value
    return {
        ...prevFormData,
        [key]:updateItems,
    };
})
}
//reusable function for deleting item
const deleteItem = (key, index) => {
    setFormData(prevFormData=>({...prevFormData,[key]:prevFormData[key].filter((_,i)=>i!==index)}))
}
  // Update the addQualification function
const addQualification = (e) => {
    e.preventDefault();
    addItem('qualifications', {  // Use 'qualifications' instead of 'qualification'
        startingDate: '', 
        endingDate: '', 
        degree: 'PHD', 
        university: 'Dhaka medical college'
    });
};

const handleQualificationChange=(event,index)=>{
    handleReusableInputChangeFunc('qualifications',index,event)
}
const deleteQualification =(e,index)=>{
    e.preventDefault()
    deleteItem('qualifications',index)
}
//experience functionality
const addExperience = (e) => {
    e.preventDefault();
    addItem('experiences', {  // Use 'qualifications' instead of 'qualification'
         startingDate: '', 
            endingDate: '', 
            position: 'Senior Surgeon',
             hospital: 'Dhaka Medical College' }
    );
};

const handleExperienceChange=(event,index)=>{
    handleReusableInputChangeFunc('experiences',index,event)
}
const deleteExperience =(e,index)=>{
    e.preventDefault()
    deleteItem('experiences',index)
}
//time slot functionality
const handleTimeSlotChange=(event,index)=>{
    handleReusableInputChangeFunc('timeSlots',index,event)
}

const addTimeSlot=e=>{
    e.preventDefault()
    addItem('timeSlots',{day:"Sunday",startingTime:"10:00",endingTime:"04:30"})
}
const deleteTimeSlot =(e,index)=>{
    e.preventDefault()
    deleteItem('timeSlots',index)
}
    
   

    return (
        <div>
            <h2 className='font-bold text-[24px] leading-9 mb-10'>Profile Information</h2>
            <form>
                <div className='mb-5'>
                    <p className='form__label'>Name*</p>
                    <input type="text" name='name' className='w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        value={formData.name} placeholder='Full name'
                        onChange={handleInputChange} />
                </div>
                <div className='mb-5'>
                    <p className='form__label text-gray-700'>Email*</p>
                    <input
                        type="email"
                        name='email'
                        value={formData.email}
                        placeholder='Email'
                        onChange={handleInputChange}
                        className='w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        readOnly
                        aria-readonly
                        disabled={true}
                    />
                </div>
                <div className='mb-5'>
                    <p className='form__label text-gray-700'>Phone</p>
                    <input
                        type="number"
                        name='phone'
                        value={formData.phone}
                        placeholder='Phone Number'
                        onChange={handleInputChange}
                        className='w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
                <div className='mb-5'>
                    <p className='form__label text-gray-700'>Bio</p>
                    <input
                        type="text"
                        name='bio'
                        value={formData.bio}
                        placeholder='Bio'
                        maxLength={100}
                        onChange={handleInputChange}
                        className='w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
                <div className='mb-5'>
                    <div className='grid grid-cols-3 gap-5 mb-[30px]'>
                        <div>
                            <p>Gender*</p>
                            <select name="gender" className='w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                value={formData.gender} onChange={handleInputChange}>
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <p>Specialization*</p>
                            <select name="specialization" className='w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                value={formData.specialization} onChange={handleInputChange}>
                                <option value="">Select</option>
                                <option value="surgeon">Surgeon</option>
                                <option value="neurologist">Neurologist</option>
                                <option value="dermatologist">Dermatologist</option>
                                <option value="dentist">Dentist</option>
                                <option value="cardiologist">Cardiologist</option>
                            </select>
                        </div>
                        <div>
                            <p>Ticket Price*</p>
                            <input type="number"
                                placeholder='100'
                                onChange={handleInputChange}
                                className='w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                name='ticketPrice' value={formData.ticketPrice} />
                        </div>
                    </div>
                </div>

                <div className='mb-5'>
                    <p className=''>Qualifications*</p>
                    {formData.qualifications?.map((item, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-2 gap-5'>
                                <div className='mt-2'>
                                    <p>Starting Date*</p>
                                    <input type="date"
                                        name='startingDate'
                                        className='w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        value={item.startingDate}
                                        onChange={(e) => handleQualificationChange( e,index)}
                                    />
                                </div>
                                <div className='mt-2'>
                                    <p>Ending Date*</p>
                                    <input type="date"
                                        className='w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        name='endingDate'
                                        value={item.endingDate}
                                        onChange={(e) => handleQualificationChange( e,index)}
                                    />
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-5 mt-5'>
                                <div className='mt-2'>
                                    <p>Degree*</p>
                                    <input type="text"
                                        name='degree'
                                        className='w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        value={item.degree}
                                        onChange={(e) => handleQualificationChange(e,index)}
                                    />
                                </div>
                                <div className='mt-2'>
                                    <p>University*</p>
                                    <input type="text"
                                        className='w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        name='university'
                                        value={item.university}
                                        onChange={(e) => handleQualificationChange(e,index)}
                                    />
                                </div>
                                <button
                                   onClick={e=>deleteQualification(e,index)}
                                    type="button"
                                    className='bg-red-600 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer w-12 h-12 flex items-center justify-center'
                                    
                                >
                                    <AiOutlineDelete className="text-[18px]" />
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'
                        onClick={addQualification}
                    >
                        Add qualification
                    </button>
                </div>
                <div className='mb-5'>
                    <p className=''>Experience*</p>
                    {formData.experiences?.map((item, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-2 gap-5'>
                                <div className='mt-2'>
                                    <p>Starting Date*</p>
                                    <input type="date"
                                        name='startingDate'
                                        className='w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        value={item.startingDate}
                                        onChange={(e) => handleExperienceChange( e,index)}
                                    />
                                </div>
                                <div className='mt-2'>
                                    <p>Ending Date*</p>
                                    <input type="date"
                                        className='w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        name='endingDate'
                                        value={item.endingDate}
                                        onChange={(e) => handleExperienceChange(e,index)}
                                    />
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-5 mt-5'>
                                <div className='mt-2'>
                                    <p>Position*</p>
                                    <input type="text"
                                        name='position'
                                        className='w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        value={item.position}
                                        onChange={(e) => handleExperienceChange(e,index)}
                                    />
                                </div>
                                <div className='mt-2'>
                                    <p>Hospital*</p>
                                    <input type="text"
                                        className='w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        name='hospital'
                                        value={item.hospital}
                                        onChange={(e) => handleExperienceChange(e,index)}
                                    />
                                </div>
                                <button
                                    type="button"
                                    className='bg-red-600 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer w-12 h-12 flex items-center justify-center'
                                    onClick={e=>deleteExperience(e,index)}
                                >
                                    <AiOutlineDelete className="text-[18px]" />
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'
                        onClick={addExperience}
                    >
                        Add Experiences
                    </button>
                </div>
                <div className='mb-5'>
                    <p className=''>Time Slots*</p>
                    {formData.timeSlots?.map((item, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5'>
                                <div className='mt-2'>
                                    <p>Day*</p>
                                    <select name="day" 
                                    value={item.day} 
                                    onChange={(e) => handleTimeSlotChange(e,index)}
                                    className='w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 py-3.5'>
                                          <option value="">Select</option>
                                          <option value="saturday">Saturday</option>
                                        <option value="sunday">Sunday</option>
                                        <option value="monday">Monday</option>
                                        <option value="tuesday">Tuesday</option>
                                        <option value="wednesday">Wednesday</option>
                                        <option value="thursday">Thursday</option>
                                        <option value="friday">Friday</option>
                                    </select>
                                </div>
                                <div className='mt-2'>
                                    <p>Starting Time*</p>
                                    <input type="time"
                                        className='w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        name='startingTime'
                                        value={item.startingTime}
                                        onChange={(e) => handleTimeSlotChange(e,index)}
                                        
                                    />
                                </div>
                                <div className='mt-2'>
                                    <p>Ending Time*</p>
                                    <input type="time"
                                        className='w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        name='endingTime'
                                        value={item.endingTime}
                                        onChange={(e) => handleTimeSlotChange(e,index)}
                                       
                                    />
                                </div>
                                <div>
                                <button
                                 onClick={e=>deleteTimeSlot(e,index)}
                                    type="button"
                                    className='bg-red-600 rounded-full text-white text-[18px] mt-6  cursor-pointer w-12 h-12 flex items-center justify-center'
                                   
                                >
                                    <AiOutlineDelete className="text-[18px]" />
                                </button>
                                </div>
                            </div>
                           
                        </div>
                    ))}
                    <button onClick={addTimeSlot}
                    className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>
                        Add Time slots
                        </button>
                    
                </div>
                <div className="mb-5">
                    <p className=''>About*</p>
                <textarea name="about"rows={5} value={formData.about} placeholder='write about you' onChange={handleInputChange} className='w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'></textarea>
                </div>
                <div className="mb-5 flex items-center gap-3">
                {formData.photo && (
                <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-blue-300 flex items-center justify-center">
                  <img 
                  src={formData.photo} alt="" className="w-full rounded-full" />
                </figure>
              )}
              <div className="relative w-[130px] h-[50px]">
                <input
                  type="file"
                  name="photo"
                  id="customfile"
                  onChange={handleFileInputChange}
                  accept=".jpg,.png"
                  className="absolute top-0 left-0 w-full opacity-0 cursor-pointer"
                />
                <label
                  htmlFor="customfile"
                  className="btn btn-primary absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#00066ff46] text-blue font-semibold rounded-lg truncate cursor-pointer"
                >
                  Upload Photo
                </label>
              </div>
                </div>

                <div className='mt-7'>
                      <button type='submit' onClick={updateProfileHandler}className='bg-blue-500 text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg'>Update Profile</button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
