// import React from 'react'
// import { Doughnut } from 'react-chartjs-2'
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from 'chart.js'

// ChartJS.register(ArcElement, Tooltip, Legend)

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


const AttemptedDashboardPie = ({ title, data, options }) => {
  const [scored, notScored] = data.datasets[0].data;
  return (
    <div className="dashBoardDoughnutGraph">
      {/* {chartTitles.map((title, index) => ( */}
        <div>
          <Doughnut data={data} options={options} plugins={[title]} />
        </div>
          <div className='dashboardGraphData'>
            <strong>Tests Attempted:</strong> {scored}<br/>
            <strong>Not Attempted:</strong> {notScored}
          </div>
      {/* ))} */}
    </div>
  )
}

// export const AttemptedDashboardChart = ({ title, data, options }) => {
//   return (
//     <div className="dashBoardDoughnutGraph">
//       {/* {chartTitles.map((title, index) => ( */}
//         <div>
//           <Doughnut data={data} options={options} plugins={[title]} />
//           {/* <Pie data={data} options={options} plugins={[title]} /> */}
//         </div>
//       {/* ))} */}
//     </div>
//   )
// }

export default AttemptedDashboardPie