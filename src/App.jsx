import React, { useState, useEffect } from 'react';
import AddDataCard from './components/AddDataCard';
import WeeklyTrendsChart from './components/WeeklyTrendsChart';
import OverallDataPie from './components/OverallDataPie';
import RecentStats from './components/RecentStats';
import StatItem from './components/StatItem';
import EditModal from './components/EditModal';
import './App.css';

const STORAGE_KEY = 'healthAndFitness';

const getLastWeekData = (data) => {
  const now = new Date();
  const weekAgo = new Date(now);
  weekAgo.setDate(now.getDate() - 6); // last 7 days including today
  return data.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate >= weekAgo && entryDate <= now;
  });
};

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ date: '', intake: '', burned: '', description: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [data, setData] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const openAddModal = () => {
    setFormData({ date: '', intake: '', burned: '', description: '' });
    setEditIndex(null);
    setModalOpen(true);
  };

  const openEditModal = (idx) => {
    setFormData(data[idx]);
    setEditIndex(idx);
    setModalOpen(true);
  };

  const handleDelete = (idx) => {
    if (window.confirm('Delete this entry?')) {
      setData(data.filter((_, i) => i !== idx));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.intake || !formData.burned || !formData.description) return;
    const entry = {
      ...formData,
      intake: Number(formData.intake),
      burned: Number(formData.burned),
    };
    let newData;
    if (editIndex !== null) {
      newData = [...data];
      newData[editIndex] = entry;
    } else {
      newData = [entry, ...data];
    }
    setData(newData);
    setModalOpen(false);
  };

  // Sort data by date descending
  const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
  const lastWeekData = getLastWeekData(sortedData);

  return (
    <div className="main-container">
      <div className="main-card">
        <div className="main-header"><h1>Health And Fitness Tracker</h1></div>
        <div className="main-grid">
          <div className="main-row">
            <div className="main-col main-col-40">
              <AddDataCard onAdd={openAddModal} />
            </div>
            <div className="main-col main-col-60">
              {lastWeekData.length > 0 && <WeeklyTrendsChart data={lastWeekData} />}
            </div>
          </div>
          <div className="main-row">
            <div className="main-col main-col-70">
              <RecentStats>
                {sortedData.length === 0 ? null : sortedData.map((item, idx) => (
                  <StatItem
                    key={item.date + idx}
                    description={item.description}
                    intake={item.intake}
                    burned={item.burned}
                    date={item.date}
                    onEdit={() => openEditModal(idx)}
                    onDelete={() => handleDelete(idx)}
                  />
                ))}
              </RecentStats>
            </div>
            <div className="main-col main-col-30">
              <OverallDataPie data={data} />
            </div>
          </div>
        </div>
      </div>
      <EditModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default App;
