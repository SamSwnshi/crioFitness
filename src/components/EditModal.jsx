import React from 'react';

const EditModal = ({ isOpen, onClose, onSubmit, formData, setFormData }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 style={{ fontWeight: 700, fontSize: '1.3rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          Let's see what you want to change!
        </h2>
        <form onSubmit={onSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <label style={{ width: '100%' }}>
            Date
            <input
              type="date"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              required
              style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #bdbdbd', marginTop: '0.2rem' }}
            />
          </label>
          <label style={{ width: '100%' }}>
            Calorie Intake
            <input
              type="number"
              placeholder="Enter Today's Calorie Intake"
              value={formData.intake}
              onChange={e => setFormData({ ...formData, intake: e.target.value })}
              required
              style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #bdbdbd', marginTop: '0.2rem' }}
            />
          </label>
          <label style={{ width: '100%' }}>
            Calorie Burned
            <input
              type="number"
              placeholder="Enter Today's Calorie Burned"
              value={formData.burned}
              onChange={e => setFormData({ ...formData, burned: e.target.value })}
              required
              style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #bdbdbd', marginTop: '0.2rem' }}
            />
          </label>
          <label style={{ width: '100%' }}>
            Short Description
            <input
              type="text"
              placeholder="Enter a short description"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              required
              style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #bdbdbd', marginTop: '0.2rem' }}
            />
          </label>
          <button type="submit" style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.8rem', fontWeight: 700, fontSize: '1rem', marginTop: '0.7rem', width: '100%' }}>
            Submit
          </button>
          <button type="button" onClick={onClose} style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.8rem', fontWeight: 700, fontSize: '1rem', marginTop: '0.3rem', width: '100%' }}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal; 