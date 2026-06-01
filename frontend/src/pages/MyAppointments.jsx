import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const MyAppointments = () => {
  // Destructure appointments, currencySymbol, and cancelAppointment from global context
  const { appointments, currencySymbol, cancelAppointment } = useContext(AppContext);

  return (
    <div style={styles.pageWrapper}>
      <h1 style={styles.pageTitle}>My Appointments</h1>

      {appointments.length === 0 ? (
        <div style={styles.emptyState}>
          <p style={styles.emptyText}>You haven't booked any appointments yet.</p>
        </div>
      ) : (
        <div style={styles.appointmentsList}>
          {appointments.map((item) => (
            <div key={item._id} style={styles.appointmentCard}>
              
              {/* Left Column: Doctor Profile & Appointment Information */}
              <div style={styles.leftColumn}>
                <div style={styles.imageFrame}>
                  <img 
                    src={item.docImage} 
                    alt={item.docName} 
                    style={styles.doctorImg} 
                  />
                </div>
                <div style={styles.infoBlock}>
                  <h3 style={styles.docName}>{item.docName}</h3>
                  <p style={styles.specialityText}>{item.speciality}</p>
                  
                  <div style={styles.dateTimeDetails}>
                    <p style={styles.detailRow}>
                      <span style={styles.label}>Date:</span> {item.appointmentDate}
                    </p>
                    <p style={styles.detailRow}>
                      <span style={styles.label}>Time:</span> {item.appointmentTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Pricing Display & Dynamic Actions */}
              <div style={styles.rightColumn}>
                <div style={styles.feeLabel}>
                  Fee: <span style={styles.feeValue}>{currencySymbol}{item.amount}</span>
                </div>
                
                {item.isCancelled ? (
                  /* If appointment state flags true, show disabled indicator badge */
                  <button disabled style={styles.cancelledBadge}>
                    Cancelled
                  </button>
                ) : (
                  /* If appointment is active, allow cancellation click handling */
                  <button 
                    onClick={() => cancelAppointment(item._id)} 
                    style={styles.cancelButton}
                  >
                    Cancel Appointment
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// CSS-in-JS Component Style Layouts
const styles = {
  pageWrapper: {
    maxWidth: '840px',
    width: '100%',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: '#FFFFFF',
    minHeight: '100vh',
    boxSizing: 'border-box'
  },
  pageTitle: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#1E293B',
    borderBottom: '1px solid #F1F5F9',
    paddingBottom: '16px',
    margin: '0 0 24px 0'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    border: '2px dashed #E2E8F0',
    borderRadius: '20px',
    backgroundColor: '#F8FAFC'
  },
  emptyText: {
    fontSize: '15px',
    color: '#64748B',
    fontWeight: '500',
    margin: 0
  },
  appointmentsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  appointmentCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px',
    border: '1px solid #E2E8F0',
    borderRadius: '20px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 4px 12px rgba(88, 101, 242, 0.02)',
    flexWrap: 'wrap',
    gap: '20px'
  },
  leftColumn: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  imageFrame: {
    width: '90px',
    height: '90px',
    backgroundColor: '#EEF0FF',
    borderRadius: '16px',
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
  infoBlock: {
    display: 'flex',
    flexDirection: 'column'
  },
  docName: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1E293B',
    margin: '0 0 4px 0'
  },
  specialityText: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#5865F2',
    margin: '0 0 12px 0',
    textTransform: 'uppercase',
    letterSpacing: '0.3px'
  },
  dateTimeDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  detailRow: {
    fontSize: '13px',
    color: '#475569',
    margin: 0
  },
  label: {
    fontWeight: '600',
    color: '#94A3B8'
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    minWidth: '160px',
    justifyContent: 'center'
  },
  feeLabel: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#64748B',
    textAlign: 'center',
    marginBottom: '4px'
  },
  feeValue: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#1E293B'
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#FFFFFF',
    color: '#EF4444',
    border: '1px solid #FEE2E2',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none',
    boxSizing: 'border-box',
    width: '100%'
  },
  cancelledBadge: {
    padding: '10px 20px',
    backgroundColor: '#FEF2F2',
    color: '#EF4444',
    border: '1px solid #FEE2E2',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '600',
    textAlign: 'center',
    cursor: 'not-allowed',
    width: '100%',
    boxSizing: 'border-box'
  }
};

export default MyAppointments;