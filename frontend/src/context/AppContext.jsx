import { createContext, useEffect, useState } from "react";
import { doctors } from "../assets/assets";
import axios from 'axios';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = '$';

    // LOGIN STATE (Duplicate line safely removed)
    const [token, setToken] = useState(
        localStorage.getItem('token') || false
    );
    const [doctorsData, setDoctorsData] = useState([]);
    const backendURL = import.meta.env.VITE_BACKEND_URL;

    // GET DOCTORS DATA FROM BACKEND
    const getDoctorsData = async () => {
        try {
            const response = await axios.get(`${backendURL}/api/doctors/list`);
            if (response.data.success) {
                setDoctorsData(response.data.doctors);
            } else {
                console.error('Failed to fetch doctors:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching doctors:', error.message || error);
        }
    };

    // Cleaned up duplicate useEffect loop here
    useEffect(() => {
        getDoctorsData();
    }, []); 

    // DEFAULT USER DATA
    const defaultUserData = {
        name: 'Edward Vincent',
        email: 'richardjameswap@gmail.com',
        password: '123456',
        phone: '+1 123 456 7890',
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Church Road, London'
        },
        gender: 'Male',
        dob: '2000-01-20'
    };

    // LOAD USER DATA
    const [userData, setUserData] = useState(() => {
        const storedData = localStorage.getItem('userData');
        return storedData ? JSON.parse(storedData) : defaultUserData;
    });

    // SAVE USER DATA
    useEffect(() => {
        localStorage.setItem(
            'userData',
            JSON.stringify(userData)
        );
    }, [userData]);

    // LOGIN FUNCTION
    const login = (email, password) => {
        if (
            email === userData.email &&
            password === userData.password
        ) {
            setToken(true);
            localStorage.setItem('token', 'true');
            return true;
        }
        return false;
    };

    // LOGOUT FUNCTION
    const logout = () => {
        setToken(false);
        localStorage.removeItem('token');
    };

    // APPOINTMENTS (Initialized with your mockup data cards)
    const [appointments, setAppointments] = useState([
        {
            _id: 'apt1',
            docId: 'doc1',
            docName: 'Dr. Richard James',
            speciality: 'General physician',
            docImage: doctors[0]?.image,
            appointmentDate: 'MON, Jun 1',
            appointmentTime: '10:30 AM',
            isCompleted: false,
            amount: 50
        },
        {
            _id: 'apt2',
            docId: 'doc2',
            docName: 'Dr. Emily Larson',
            speciality: 'Gynecologist',
            docImage: doctors[1]?.image,
            appointmentDate: 'THU, Jun 4',
            appointmentTime: '2:00 PM',
            isCompleted: false,
            amount: 60
        }
    ]);

    // NEW FUNCTION: Dynamically injects a brand new slot choice straight into state layout
    const bookAppointment = (doctor, selectedDate, selectedTime) => {
        const newBooking = {
            _id: `apt_${Date.now()}`, // Real-time unique index generator
            docId: doctor._id,
            docName: doctor.name,
            speciality: doctor.speciality,
            docImage: doctor.image,
            appointmentDate: selectedDate,
            appointmentTime: selectedTime,
            isCompleted: false,
            amount: doctor.fees || 50
        };

        // Add the new appointment to the top of the list
        setAppointments((prev) => [newBooking, ...prev]);
        return true;
    };

    // CONTEXT VALUE (Exposed everything clearly to consumers)
    const value = {
        currencySymbol,
        doctors,         
        doctorsData,     
        getDoctorsData,  
        userData,
        setUserData,
        appointments,
        setAppointments,
        bookAppointment, // Exposed to your Appointment.jsx panel page view
        token,
        setToken,
        login,
        logout
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;