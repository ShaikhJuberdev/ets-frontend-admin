// RMLineChart.js
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Chart data for RM Tracker
const data = [
  { name: 'JAN', Fire: 45, Gunshot: 20, Smoke: 65, BombDetect: 30, CameraTampering: 55 },
  { name: 'FEB', Fire: 25, Gunshot: 70, Smoke: 40, BombDetect: 60, CameraTampering: 35 },
  { name: 'MAR', Fire: 80, Gunshot: 15, Smoke: 55, BombDetect: 25, CameraTampering: 45 },
  { name: 'APR', Fire: 30, Gunshot: 85, Smoke: 20, BombDetect: 70, CameraTampering: 60 },
  { name: 'MAY', Fire: 60, Gunshot: 50, Smoke: 35, BombDetect: 40, CameraTampering: 20 },
  { name: 'JUN', Fire: 40, Gunshot: 30, Smoke: 75, BombDetect: 25, CameraTampering: 80 },
  { name: 'JUL', Fire: 70, Gunshot: 25, Smoke: 45, BombDetect: 55, CameraTampering: 65 },
  { name: 'AUG', Fire: 55, Gunshot: 60, Smoke: 85, BombDetect: 35, CameraTampering: 50 },
  { name: 'SEP', Fire: 35, Gunshot: 40, Smoke: 50, BombDetect: 45, CameraTampering: 75 },
  // { name: 'OCT', Fire: 20, Gunshot: 90, Smoke: 60, BombDetect: 80, CameraTampering: 30 },
  // { name: 'NOV', Fire: 85, Gunshot: 35, Smoke: 25, BombDetect: 30, CameraTampering: 95 },
  // { name: 'DEC', Fire: 65, Gunshot: 55, Smoke: 90, BombDetect: 75, CameraTampering: 40 },
];



const RMLineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="name" stroke="#666" />
        <YAxis domain={[0, 100]} stroke="#666" />
        <Tooltip />
        <Legend wrapperStyle={{ paddingTop: '10px' }} />
        {/* <Line type="linear" dataKey="RM1" stroke="#003f88" strokeWidth={2} dot={{ r: 4 }} />
        <Line type="linear" dataKey="RM2" stroke="#00b386" strokeWidth={2} dot={{ r: 4 }} />
        <Line type="linear" dataKey="RM3" stroke="#6bcfef" strokeWidth={2} dot={{ r: 4 }} />
        <Line type="linear" dataKey="RM4" stroke="#e53935" strokeWidth={2} dot={{ r: 4 }} />
        <Line type="linear" dataKey="RM5" stroke="#ff4081" strokeWidth={2} dot={{ r: 4 }} /> */}

        <Line type="linear" dataKey="Fire" stroke="#ff0000" strokeWidth={1} dot={{ r: 4 }} />
        <Line type="linear" dataKey="Gunshot" stroke="#800080" strokeWidth={1} dot={{ r: 4 }} />
        <Line type="linear" dataKey="Smoke" stroke="#808080" strokeWidth={1} dot={{ r: 4 }} />
        <Line type="linear" dataKey="BombDetect" stroke="#ffa500" strokeWidth={1} dot={{ r: 4 }} />
        <Line type="linear" dataKey="CameraTampering" stroke="#00ced1" strokeWidth={1} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RMLineChart;






// import React from 'react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   LabelList
// } from 'recharts';
// import crownImage from '../../../assets/images/SVG/crown.svg'

// const data = [
//   { name: 'RM1', value: 20, fill: '#003f88' },
//   { name: 'RM2', value: 60, fill: '#00b386' },
//   { name: 'RM3', value: 30, fill: '#6bcfef' },
//   { name: 'RM4', value: 90, fill: '#e53935' },
//   { name: 'RM5', value: 50, fill: '#ff4081' }
// ];

// const renderCrown = ({ x, y, width }) => {
//   return (
//     <image
//       href={crownImage}
//       x={x + width / 2 - 10}
//       y={y - 30}
//       width={20}
//       height={20}
//     />
//   );
// };

// const RMBarChart = () => {
//   return (
//     <ResponsiveContainer width="100%" height={320}>
//       <BarChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
//         <XAxis dataKey="name" stroke="#666" />
//         <YAxis domain={[0, 100]} stroke="#666" />
//         {/* <Tooltip /> */}
//         <Bar dataKey="value" barSize={30}>
//           <LabelList dataKey="value" content={renderCrown} />
//         </Bar>
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };

// export default RMBarChart;


