import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WeeklyTrendsChart = ({ data }) => {
  // Prepare data for the last 7 days
  const days = [];
  const intake = [];
  const burned = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    days.push(dateStr);
    const entry = data && data.find(e => e.date === dateStr);
    intake.push(entry ? entry.intake : 0);
    burned.push(entry ? entry.burned : 0);
  }

  const hasWeekData = data && data.length > 0 && (intake.some(v => v > 0) || burned.some(v => v > 0));
  const hasAnyData = data && data.length > 0;

  // If no week data but there is some data, show all data
  let chartData, chartLabels, chartIntake, chartBurned;
  if (!hasWeekData && hasAnyData) {
    chartLabels = data.map(e => e.date);
    chartIntake = data.map(e => e.intake);
    chartBurned = data.map(e => e.burned);
    chartData = {
      labels: chartLabels,
      datasets: [
        {
          label: 'caloriesIntake',
          data: chartIntake,
          backgroundColor: 'rgba(153, 102, 255, 0.7)',
        },
        {
          label: 'caloriesBurned',
          data: chartBurned,
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
        },
      ],
    };
  } else {
    chartData = {
      labels: days,
      datasets: [
        {
          label: 'caloriesIntake',
          data: intake,
          backgroundColor: 'rgba(153, 102, 255, 0.7)',
        },
        {
          label: 'caloriesBurned',
          data: burned,
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
        },
      ],
    };
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: {
        display: false,
      },
    },
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: { title: { display: true, text: 'Calories' }, beginAtZero: true },
    },
  };

  return (
    <div className="weekly-trends-chart">
      <h2>Weekly Health Trends:</h2>
      {hasWeekData ? (
        <Bar data={chartData} options={options} />
      ) : hasAnyData ? (
        <>
          <div style={{color:'#bbb', fontSize:'1.1rem', marginBottom:'1rem'}}>No data for this week. Showing all available data.</div>
          <Bar data={chartData} options={options} />
        </>
      ) : (
        <div style={{height:200, display:'flex', alignItems:'center', justifyContent:'center', color:'#bbb', fontSize:'1.1rem'}}>No data for this week yet.</div>
      )}
    </div>
  );
};

export default WeeklyTrendsChart; 