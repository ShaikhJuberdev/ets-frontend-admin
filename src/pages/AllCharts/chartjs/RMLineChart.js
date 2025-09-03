// // RMLineChart.js
// import React from 'react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer
// } from 'recharts';

// // Chart data for RM Tracker
// const data = [
//   { name: 'JAN', RM1: 10, RM2: 5, RM3: 20, RM4: 15, RM5: 10 },
//   { name: 'FEB', RM1: 60, RM2: 40, RM3: 50, RM4: 30, RM5: 25 },
//   { name: 'MAR', RM1: 30, RM2: 90, RM3: 60, RM4: 50, RM5: 40 },
//   { name: 'APR', RM1: 70, RM2: 20, RM3: 40, RM4: 60, RM5: 50 },
//   { name: 'MAY', RM1: 50, RM2: 30, RM3: 90, RM4: 40, RM5: 35 },
//   { name: 'JUN', RM1: 40, RM2: 5, RM3: 30, RM4: 45, RM5: 45 },
//   { name: 'JUL', RM1: 60, RM2: 0, RM3: 65, RM4: 40, RM5: 40 },
//   { name: 'AUG', RM1: 80, RM2: 90, RM3: 80, RM4: 55, RM5: 60 },
//   { name: 'SEP', RM1: 40, RM2: 80, RM3: 60, RM4: 70, RM5: 70 },
//   { name: 'OCT', RM1: 10, RM2: 20, RM3: 30, RM4: 80, RM5: 70 },
//   { name: 'NOV', RM1: 35, RM2: 30, RM3: 50, RM4: 60, RM5: 60 },
//   { name: 'DEC', RM1: 0, RM2: 10, RM3: 40, RM4: 90, RM5: 80 },
// ];

// // RMLineChart Component    Linear for straight line and monotype for curved
// const RMLineChart = () => {
//   return (
//     <ResponsiveContainer width="100%" height={320}>
//       <LineChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
//         <XAxis dataKey="name" stroke="#666" />
//         <YAxis domain={[0, 100]} stroke="#666" />
//         <Tooltip />
//         <Legend wrapperStyle={{ paddingTop: '10px' }} />
//         <Line type="linear" dataKey="RM1" stroke="#003f88" strokeWidth={2} dot={{ r: 4 }} />
//         <Line type="linear" dataKey="RM2" stroke="#00b386" strokeWidth={2} dot={{ r: 4 }} />
//         <Line type="linear" dataKey="RM3" stroke="#6bcfef" strokeWidth={2} dot={{ r: 4 }} />
//         <Line type="linear" dataKey="RM4" stroke="#e53935" strokeWidth={2} dot={{ r: 4 }} />
//         <Line type="linear" dataKey="RM5" stroke="#ff4081" strokeWidth={2} dot={{ r: 4 }} />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// };

// export default RMLineChart;






import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from 'recharts';
import crownImage from '../../../assets/images/SVG/crown.svg'

const data = [
  { name: 'RM1', value: 20, fill: '#003f88' },
  { name: 'RM2', value: 60, fill: '#00b386' },
  { name: 'RM3', value: 30, fill: '#6bcfef' },
  { name: 'RM4', value: 90, fill: '#e53935' },
  { name: 'RM5', value: 50, fill: '#ff4081' }
];

const renderCrown = ({ x, y, width }) => {
  return (
    <image
      href={crownImage}
      x={x + width / 2 - 10}
      y={y - 30}
      width={20}
      height={20}
    />
  );
};

const RMBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="name" stroke="#666" />
        <YAxis domain={[0, 100]} stroke="#666" />
        {/* <Tooltip /> */}
        <Bar dataKey="value" barSize={30}>
          <LabelList dataKey="value" content={renderCrown} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RMBarChart;


