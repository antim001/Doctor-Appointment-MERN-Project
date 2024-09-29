/* eslint-disable react/prop-types */
import convertTime from '../utils/convertTime.js'
import { BASE_URL, token } from '../config.js'
import { toast } from 'react-toastify'
import { useState } from 'react';
import moment from "moment";
import HashLoader from 'react-spinners/HashLoader';

const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const checkDate = e => {
    let selectedDay = moment(e.target.value).format("dddd").toLocaleLowerCase();
    let isAtSchedule = false;
    timeSlots.map(slot => {
      if (slot.day == selectedDay) isAtSchedule = true;
    });

    if (!isAtSchedule) {
      toast.error("Wrong schedule selected");
      setAppointmentDate("");
    } else {
      setAppointmentDate(e.target.value);
    }
  }

  const generateSchedule = () => {
    let selectedDay = moment(appointmentDate).format("dddd").toLocaleLowerCase();
    let scheduleList = [];

    timeSlots.map(slot => {
      if (slot.day == selectedDay) {
        let startingTime = moment(`${appointmentDate} ${slot.startingTime}`, "YYYY-MM-DD HH:mm");
        let endingTime = moment(`${appointmentDate} ${slot.endingTime}`, "YYYY-MM-DD HH:mm");

        while (1) {
          let startTime = startingTime.add(1, "minutes").format("hh:mm A");
          let endTime = startingTime.subtract(1, "minutes").add(30, "minutes").format("hh:mm A");

          scheduleList.push(`${startTime} ~ ${endTime}`);

          if (startingTime.isSameOrAfter(endingTime)) break;
        }
      }
    });

    return scheduleList;
  }

  const bookingHandler = async e => {
    try {
      e.preventDefault();
      setSubmitting(true);

      const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appointmentDate,
          appointmentTime
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message + 'Please try again')
      }
      if (data.session.url) {
        window.location.href = data.session.url
      }
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'>
      <div className='flex items-center justify-between'>
        <p className='text__para mt-0 font-semibold'>Ticket Price</p>
        <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 font-bold'>
          {ticketPrice} BDT</span>
      </div>

      <div className='mt-[30px]'>
        <p className='text__para mt-0 font-semibold '>Available Time slots:</p>
        <ul className='mt-3'>
          {timeSlots?.map((item, index) => (
            <li key={index} className='flex items-center justify-between mb-2'>
              <p className='text-[15px] leading-6  font-semibold'>{item.day.charAt(0).toUpperCase() + item.day.slice(1)}</p>

              <p className='text-[15px] leading-6  font-semibold'>{convertTime(item.startingTime)}-{convertTime(item.endingTime)}</p></li>
          ))}
        </ul>
      </div>

      <form method="POST" action="" onSubmit={bookingHandler}>
        <div className="form-control">
          <label htmlFor="appointmentDate" className="label">Appointment date</label>

          <input type="date" name="appointment_date" id="appointmentDate" className="input input-bordered" required onChange={checkDate} />
        </div>

        {
          appointmentDate &&
          <div className="form-control">
            <label htmlFor="appointmentTime" className="label">Appointment time</label>

            <select name="appointment_time" id="appointmentTime" className="input input-bordered" required onChange={e => setAppointmentTime(e.target.value)} defaultValue={-1}>
              <option disabled value={-1}>Select one</option>
              {
                generateSchedule().map((time, index) => <option key={index+1} value={time}>{time}</option>)
              }
            </select>
          </div>
        }

        <button className='btn btn-primary px-2 w-full rounded-md mt-2'>{submitting ? <HashLoader size={25} color='#fff' /> : "Book Appointment"}</button>
      </form>
    </div>
  );
}

export default SidePanel;