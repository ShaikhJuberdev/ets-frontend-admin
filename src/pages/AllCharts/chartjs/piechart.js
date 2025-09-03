import React, { Component, useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';



export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "User Device Distribution",
    },
  },
};


const data = {
    labels: [
        "Android",
        "iOS"
    ],
    datasets: [
        {
            data: [300, 180],
            backgroundColor: [
                "#02a499",
                "#ebeff2"
            ],
            hoverBackgroundColor: [
                "#02a499",
                "#ebeff2"
            ],
            hoverBorderColor: "#fff"
        }]
};


const PieChart = () => {

    const [counts, setCounts] = useState({ android: 0, ios: 0 });
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    "http://192.168.2.179:8080/v1/accounts/listofuser",
                    {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            Authorization: `Basic ${auth}`,
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error(`Failed to fetch users: ${response.status}`);
                }

                const data = await response.json();
                setUsers(data);

                // 👉 Count Android and iOS
                let androidCount = 0;
                let iosCount = 0;

                data.forEach((user) => {
                    if (user.type?.toLowerCase() === "android") {
                        androidCount++;
                    } else if (user.type?.toLowerCase() === "ios") {
                        iosCount++;
                    }
                });

                setCounts({ android: androidCount, ios: iosCount });
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

  //  const data = {
  //   labels: ["Android", "iOS"],
  //   datasets: [
  //     {
  //       data: [counts.android, counts.ios],
  //       backgroundColor: ["#02a499", "#ebeff2"],
  //       hoverBackgroundColor: ["#02a499", "#ebeff2"],
  //       hoverBorderColor: "#fff",
  //     },
  //   ],
  // };

    return (
        <React.Fragment>
            <Pie width={600} height={215} data={data} options={options} />
        </React.Fragment>
    );
}


export default PieChart;


