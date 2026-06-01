import { createContext, useState } from 'react';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = '$';
  
  // 1. Create a dynamic state array to hold booked appointments
  const [appointments, setAppointments] = useState([]);

  // 2. Helper function to append a newly selected appointment to the state array
  const bookAppointment = (doctor, selectedDate, selectedTime) => {
    const newBooking = {
      _id: `apt_${Date.now()}`, // Generates a unique, real-time ID string
      docId: doctor._id,
      docName: doctor.name,
      speciality: doctor.speciality,
      docImage: doctor.image, // Supports your static assets layout reference
      appointmentDate: selectedDate, // Passed from chosen calendar slot
      appointmentTime: selectedTime, // Passed from chosen hour slot
      isCompleted: false,
      amount: doctor.fees || 50
    };

    // Prepend the new appointment to the top of the array
    setAppointments((prev) => [newBooking, ...prev]);
    return true;
  };

  // 3. Expose the state and handler to all context-consuming child views
  const value = {
    currencySymbol,
    appointments,
    setAppointments,
    bookAppointment
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;