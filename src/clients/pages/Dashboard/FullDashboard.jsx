// src/App.js
import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  AreaChart, Area,
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  RadialBarChart, RadialBar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './FullDashboard.css';

// const subjectsData = [
//   { name: 'Java', score: 85 },
//   { name: 'Python', score: 78 },
//   { name: 'C Programming', score: 68 },
//   { name: 'Verbal', score: 90 },
//   { name: 'Web Development', score: 75 },
//   { name: 'DBMS', score: 82 },
//   { name: 'Aptitude', score: 70 },
// ];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#D3D3FF', '#A28EF9', '#FF69B4', '#43cea2'];

const FullDashboard = ({userMarksData}) => {

  const [subjectsData, setSubjectsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    console.log("Data "+userMarksData)
    if (userMarksData) {
      // Extract the necessary values from the data
      const subjects = [
        { name: 'Java', score: userMarksData.javaMcqTotalMarks ?? 0 },
        { name: 'Python', score: userMarksData.pythonMcqTotalMarks ?? 0 },
        { name: 'C Programming', score: userMarksData.cprogrammingMcqTotalMarks ?? 0 },
        { name: 'Cpp Programming', score: userMarksData.cppprogrammingMcqTotalMarks ?? 0 },
        { name: 'Verbal', score: userMarksData.verbalMcqTotalMarks ?? 0 },
        { name: 'Web Development', score: userMarksData.webdevelopmentMcqTotalMarks ?? 0 },
        { name: 'DBMS', score: userMarksData.dbmsMcqTotalMarks ?? 0 },
        { name: 'Aptitude', score: userMarksData.aptitudeMcqTotalMarks ?? 0 },
      ];

      // Set the data to the state
      setSubjectsData(subjects);
      console.log("Subjects "+subjects)
      setLoading(false)
    }
  }, [userMarksData]);
  return (
    <div className="dashboard">
      <h1 className='fulldashboardHeading'>📊 Overall Performance Dashboard</h1>

      {
        loading
        ?
          <div>loading...</div>
        :
        <div className='dashboard'>
          <div className="row">

            {/* <ResponsiveContainer width="100%" height={250}>
              <BarChart data={subjectsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  interval={0} 
                  angle={-30} 
                  textAnchor="end" 
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer> */}

            {/* Bar Chart */}
            <div className="chart-box">
              <h3>Bar Chart</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={subjectsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" 
                  interval={0} 
                  angle={-45} 
                  textAnchor="end" 
                  height={80}
                  tick={{ fontSize: 10 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Line Chart */}
            <div className="chart-box">
              <h3>Line Chart</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={subjectsData}>
                  <XAxis dataKey="name"
                  interval={0} 
                  angle={-45} 
                  textAnchor="end" 
                  height={80}
                  tick={{ fontSize: 10 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="chart-box">
              <h3>Pie Chart</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Tooltip />
                  <Pie data={subjectsData} dataKey="score" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {subjectsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="row">
            {/* Area Chart */}
            <div className="chart-box">
              <h3>Area Chart</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={subjectsData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="score" stroke="#8884d8" fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Radar Chart */}
            <div className="chart-box">
              <h3>Radar Chart</h3>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={subjectsData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <Radar name="Score" dataKey="score" stroke="#FF69B4" fill="#FF69B4" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Radial Bar Chart */}
            <div className="chart-box">
              <h3>Radial Bar Chart</h3>
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="10%" outerRadius="80%"
                  data={subjectsData}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar dataKey="score" fill="#43cea2" />
                  <Tooltip />
                  <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" align="center" />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>


          </div>
        </div>
      }
    </div>
  );
}

export default FullDashboard;
