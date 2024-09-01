import React from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../config.js';
import UseFetchData from "../hooks/UseFetchData.jsx";
import Loader from '../components/Loader/Loading.jsx';
import Error from '../components/Error/Error.jsx';

export default function PrintInvoice() {
    const { id } = useParams();
    const { data: booking, loading, error } = UseFetchData(`${BASE_URL}/bookings/${id}`);
    const printWindow = () => {
        const bodyContent = document.body.innerHTML;

        document.querySelector(".no-print").remove();
        document.body.innerHTML = document.querySelector("#printArea").innerHTML;
        window.print();
        document.body.innerHTML = bodyContent;
    }

    return (
        <div>
            {loading && <Loader />}
            {error && <Error />}

            {!loading && !error && (
                <div id="printArea">
                    <div>
                        <h1 style={{ textAlign: "center", fontSize: 24, fontWeight: 800, marginTop: "2rem" }}>Online Doctor Appointment System</h1>

                        <h3 style={{ textAlign: "center", textDecoration: "underline", fontSize: 19, fontWeight: 800 }}>Appointment Invoice</h3>

                        <table style={{ width: 430, margin: "2rem auto" }}>
                            {
                                booking.map((data, index) => (
                                    <tbody>
                                        <tr>
                                            <th style={{ textAlign: "left", border: "none" }}>Appointment ID</th>
                                            <td style={{ border: "none" }}>:</td>
                                            <td style={{ textAlign: "left", border: "none" }}>{data._id}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ textAlign: "left", border: "none" }}>Patient name</th>
                                            <td style={{ border: "none" }}>:</td>
                                            <td style={{ textAlign: "left", border: "none" }}>{data.user.name}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ textAlign: "left", border: "none" }}>Doctor name</th>
                                            <td style={{ border: "none" }}>:</td>
                                            <td style={{ textAlign: "left", border: "none" }}>Dr. {data.doctor.name}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ textAlign: "left", border: "none" }}>Appointment time</th>
                                            <td style={{ border: "none" }}>:</td>
                                            <td style={{ textAlign: "left", border: "none" }}>{data.updatedAt}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ textAlign: "left", border: "none" }}>Appointment fee</th>
                                            <td style={{ border: "none" }}>:</td>
                                            <td style={{ textAlign: "left", border: "none" }}>{data.ticketPrice} Tk</td>
                                        </tr>
                                        <tr>
                                            <th style={{ textAlign: "left", border: "none" }}>Payment status</th>
                                            <td style={{ border: "none" }}>:</td>
                                            <td style={{ textAlign: "left", border: "none" }}>{data.isPaid ? "Paid" : "Not paid yet"}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ textAlign: "left", border: "none" }}>Appointment status</th>
                                            <td style={{ border: "none" }}>:</td>
                                            <td style={{ textTransform: "capitalize", textAlign: "left", border: "none" }}>{data.status}</td>
                                        </tr>
                                    </tbody>
                                ))
                            }
                        </table>

                        <div className='no-print flex justify-center'>
                            <button className="btn btn-success" onClick={printWindow}>Print</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}