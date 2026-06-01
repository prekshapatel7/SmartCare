import React, { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Appointment = () => {
    const { docID } = useParams()
    const navigate = useNavigate()
    
    // Extract both doctors and the booking engine from your context
    const { doctors, bookAppointment } = useContext(AppContext)

    const [docInfo, setDocInfo] = useState(null)
    const [bookingDays, setBookingDays] = useState([])
    const [selectedDayIndex, setSelectedDayIndex] = useState(0)
    const [selectedTime, setSelectedTime] = useState('')

    const timeSlots = [
        '09:00 AM', '10:00 AM', '11:00 AM', 
        '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
    ]

    const generateBookingDays = () => {
        const daysList = []
        const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

        for (let i = 1; i <= 6; i++) {
            const currentDate = new Date()
            currentDate.setDate(currentDate.getDate() + i)

            daysList.push({
                dayName: daysOfWeek[currentDate.getDay()],
                dayNumber: currentDate.getDate(),
                fullDate: currentDate
            })
        }
        setBookingDays(daysList)
    }

    const fetchDocInfo = () => {
        if (!doctors) return
        const foundDoc = doctors.find(doc => doc._id === docID)
        setDocInfo(foundDoc)
    }

    useEffect(() => {
        generateBookingDays()
    }, [])

    useEffect(() => {
        if (doctors?.length) {
            fetchDocInfo()
        }
    }, [doctors, docID])

    useEffect(() => {
        setSelectedTime('')
    }, [selectedDayIndex])

    if (!docInfo) {
        return <div style={styles.loading}>Loading doctor details...</div>
    }

    // UPDATED BOOKING HANDLER WITH STATE AND REDIRECT CONTEXT
    const handleBooking = () => {
        if (!selectedTime) {
            alert('Please select a preferred time slot first.')
            return
        }

        const selectedDateObj = bookingDays[selectedDayIndex]
        
        // Formats full system date cleanly into human-readable text (e.g., "MON, June 1")
        const formattedDate = `${selectedDateObj.dayName}, ${selectedDateObj.fullDate.toLocaleDateString('en-US', { month: 'short' })} ${selectedDateObj.dayNumber}`

        // Execute global state function
        bookAppointment(docInfo, formattedDate, selectedTime)

        // Reroute to my-appointments page instantly
        navigate('/my-appointments')
    }

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.cardContainer}>
                
                {/* LEFT SIDE: Clean Image Frame */}
                <div style={styles.imageColumn}>
                    <div style={styles.imageFrame}>
                        <img 
                            src={docInfo.image} 
                            alt={docInfo.name} 
                            style={styles.doctorImg} 
                        />
                    </div>
                </div>

                {/* RIGHT SIDE: Profile Information Details */}
                <div style={styles.infoColumn}>
                    
                    {/* Header Row: Name & Verification */}
                    <div style={styles.headerRow}>
                        <h1 style={styles.docName}>{docInfo.name}</h1>
                        <img 
                            src={assets.verified_icon} 
                            alt="Verified Professional" 
                            style={styles.verifiedIcon} 
                        />
                    </div>

                    {/* Sub-header Row: Qualifications & Badges */}
                    <div style={styles.metaRow}>
                        <span style={styles.qualificationText}>
                            {docInfo.degree} — {docInfo.speciality}
                        </span>
                        <span style={styles.badgeTag}>
                            {docInfo.experience} Experience
                        </span>
                    </div>

                    {/* Description Text Segment */}
                    <div style={styles.aboutBlock}>
                        <h3 style={styles.aboutHeading}>
                            About 
                            <img src={assets.info_icon} alt="info" style={styles.infoIcon} />
                        </h3>
                        <p style={styles.aboutParagraph}>
                            {docInfo.about}
                        </p>
                    </div>

                    {/* Footer Row: Modern Cost Summary Block */}
                    <div style={styles.priceContainer}>
                        <span style={styles.priceLabel}>Estimated Appointment Fee</span>
                        <span style={styles.priceValue}>${docInfo.fees || '60'}</span>
                    </div>

                </div>
            </div>

            {/* DYNAMIC BOOKING FEATURE CONTAINER */}
            <div style={styles.bookingWrapper}>
                <h3 style={styles.bookingTitle}>Choose a Schedule</h3>
                <p style={styles.bookingSubtitle}>Select an available day for your upcoming consultation</p>
                
                {/* DATE SLOTS ROW */}
                <div style={styles.slotsRow}>
                    {bookingDays.map((item, index) => {
                        const isSelected = selectedDayIndex === index
                        return (
                            <button
                                key={index}
                                onClick={() => setSelectedDayIndex(index)}
                                style={{
                                    ...styles.slotCard,
                                    ...(isSelected ? styles.slotCardActive : styles.slotCardInactive)
                                }}
                            >
                                <span style={{
                                    ...styles.slotDay,
                                    ...(isSelected ? styles.slotDayActive : {})
                                }}>
                                    {item.dayName}
                                </span>
                                <span style={{
                                    ...styles.slotNumber,
                                    ...(isSelected ? styles.slotNumberActive : {})
                                }}>
                                    {item.dayNumber}
                                </span>
                            </button>
                        )
                    })}
                </div>

                {/* TIME SLOTS SECTION */}
                <h4 style={styles.sectionHeading}>Available Time Hours</h4>
                <div style={styles.timeSlotsRow}>
                    {timeSlots.map((time, index) => {
                        const isTimeSelected = selectedTime === time
                        return (
                            <button
                                key={index}
                                onClick={() => setSelectedTime(time)}
                                style={{
                                    ...styles.timeCard,
                                    ...(isTimeSelected ? styles.timeCardActive : styles.timeCardInactive)
                                }}
                            >
                                {time}
                            </button>
                        )
                    })}
                </div>

                <button onClick={handleBooking} style={styles.actionButton}>
                    Confirm Appointment Setup
                </button>
            </div>
        </div>
    )
}

const styles = {
    pageWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px 20px',
        backgroundColor: '#F8FAFC',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        gap: '24px'
    },
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: '32px',
        maxWidth: '840px',
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        padding: '32px',
        boxShadow: '0 10px 25px rgba(88, 101, 242, 0.04)',
        border: '1px solid #E2E8F0',
        flexWrap: 'wrap'
    },
    imageColumn: {
        flex: '0 0 140px',
        display: 'flex',
        alignItems: 'flex-start'
    },
    imageFrame: {
        width: '140px',
        height: '140px',
        backgroundColor: '#5865F2', 
        borderRadius: '20px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    doctorImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    infoColumn: {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '280px'
    },
    headerRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '6px'
    },
    docName: {
        fontSize: '26px',
        fontWeight: '700',
        color: '#1E293B',
        margin: 0
    },
    verifiedIcon: {
        width: '20px',
        height: '20px',
        objectFit: 'contain'
    },
    metaRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap',
        marginBottom: '20px'
    },
    qualificationText: {
        fontSize: '15px',
        fontWeight: '500',
        color: '#64748B'
    },
    badgeTag: {
        backgroundColor: '#EEF0FF',
        color: '#5865F2',
        fontSize: '12px',
        fontWeight: '600',
        padding: '4px 12px',
        borderRadius: '100px'
    },
    aboutBlock: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        marginBottom: '24px',
        borderTop: '1px solid #F1F5F9',
        paddingTop: '16px'
    },
    aboutHeading: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '14px',
        fontWeight: '600',
        color: '#334155',
        margin: 0,
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    infoIcon: {
        width: '14px',
        height: '14px'
    },
    aboutParagraph: {
        fontSize: '14px',
        color: '#64748B',
        lineHeight: '1.6',
        margin: 0
    },
    priceContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        padding: '14px 20px',
        borderRadius: '14px',
        marginTop: 'auto',
        border: '1px solid #E2E8F0'
    },
    priceLabel: {
        fontSize: '14px',
        color: '#64748B',
        fontWeight: '500'
    },
    priceValue: {
        fontSize: '18px',
        fontWeight: '700',
        color: '#5865F2'
    },
    bookingWrapper: {
        maxWidth: '840px',
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        padding: '32px',
        boxShadow: '0 10px 25px rgba(88, 101, 242, 0.04)',
        border: '1px solid #E2E8F0',
        boxSizing: 'border-box'
    },
    bookingTitle: {
        fontSize: '18px',
        fontWeight: '700',
        color: '#1E293B',
        margin: '0 0 4px 0'
    },
    bookingSubtitle: {
        fontSize: '14px',
        color: '#64748B',
        margin: '0 0 24px 0'
    },
    slotsRow: {
        display: 'flex',
        gap: '14px',
        overflowX: 'auto',
        paddingBottom: '10px',
        marginBottom: '20px',
        scrollbarWidth: 'none'
    },
    slotCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '70px',
        height: '90px',
        borderRadius: '16px',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        outline: 'none', 
        border: '1px solid #E2E8F0',
        WebkitTapHighlightColor: 'transparent'
    },
    slotCardInactive: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E8F0',
        boxShadow: 'none',
        transform: 'none'
    },
    slotCardActive: {
        backgroundColor: '#5865F2',
        borderColor: '#5865F2',
        boxShadow: '0 8px 20px rgba(88, 101, 242, 0.25)',
        transform: 'translateY(-2px)'
    },
    slotDay: {
        fontSize: '12px',
        fontWeight: '600',
        color: '#94A3B8',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: '4px'
    },
    slotDayActive: {
        color: '#E0E7FF'
    },
    slotNumber: {
        fontSize: '20px',
        fontWeight: '700',
        color: '#334155'
    },
    slotNumberActive: {
        color: '#FFFFFF'
    },
    sectionHeading: {
        fontSize: '14px',
        fontWeight: '700',
        color: '#475569',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        margin: '16px 0 12px 0'
    },
    timeSlotsRow: {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        marginBottom: '32px'
    },
    timeCard: {
        padding: '10px 20px',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        outline: 'none',
        border: '1px solid #E2E8F0',
        WebkitTapHighlightColor: 'transparent'
    },
    timeCardInactive: {
        backgroundColor: '#FFFFFF',
        color: '#475569',
        borderColor: '#E2E8F0'
    },
    timeCardActive: {
        backgroundColor: '#5865F2',
        color: '#FFFFFF',
        borderColor: '#5865F2',
        boxShadow: '0 6px 15px rgba(88, 101, 242, 0.2)'
    },
    actionButton: {
        width: '100%',
        maxWidth: '320px',
        padding: '16px 24px',
        backgroundColor: '#5865F2',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '16px',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease, transform 0.2s ease',
        boxShadow: '0 4px 12px rgba(88, 101, 242, 0.15)',
        outline: 'none'
    },
    loading: {
        textAlign: 'center',
        padding: '50px',
        fontSize: '16px',
        color: '#64748B'
    }
}

export default Appointment