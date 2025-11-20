import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
} from 'chart.js'

import { Doughnut, Pie, Bar, Line, Radar, PolarArea } from 'react-chartjs-2'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title
)

// Your score values

// const chartTitles = [
//   'Aptitude',
//   'Technical',
//   'Communication',
//   'Coding',
//   'Reasoning',
//   'General Awareness',
// ]


const DashboardChart = ({ title, data, options }) => {
  return (
    <div className="dashBoardDoughnutGraph">
      <div className="chart-card">
        <h2 className="chart-title">Doughnut</h2>
        <Doughnut data={data} options={options} />
      </div>
      <div className="chart-card">
        <h2 className="chart-title">Pie</h2>
        <Pie data={data} options={options} />
      </div>
      <div className="chart-card">
        <h2 className="chart-title">Bar</h2>
        <Bar data={data} options={options} />
      </div>
      <div className="chart-card">
        <h2 className="chart-title">Line</h2>
        <Line data={data} options={options} />
      </div>
      <div className="chart-card">
        <h2 className="chart-title">Radar</h2>
        <Radar data={data} options={options} />
      </div>
      <div className="chart-card">
        <h2 className="chart-title">Polar Area</h2>
        <PolarArea data={data} options={options} />
      </div>
    </div>
  )
}

export default DashboardChart
