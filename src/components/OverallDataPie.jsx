import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const OverallDataPie = ({ data = [] }) => {
  const totalIntake = data.reduce((sum, e) => sum + Number(e.intake || 0), 0);
  const totalBurned = data.reduce((sum, e) => sum + Number(e.burned || 0), 0);
  const hasData = totalIntake > 0 || totalBurned > 0;

  const chartData = {
    labels: ['Intake', 'Burned'],
    datasets: [
      {
        data: [totalIntake, totalBurned],
        backgroundColor: [
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: {
        display: false,
      },
    },
  };

  return (
    <div className="overall-data-pie">
      <h2>Overall Data:</h2>
      {hasData ? (
        <Pie data={chartData} options={options} />
      ) : (
        <div style={{height:200, display:'flex', alignItems:'center', justifyContent:'center', color:'#bbb', fontSize:'1.1rem'}}>No data yet.</div>
      )}
    </div>
  );
};

export default OverallDataPie; 