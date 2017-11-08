import React from 'react';  
import { Bar, Pie } from 'react-chartjs-2';

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Clear',
        backgroundColor: '#71B37C',
        hoverBackgroundColor: '#71B37C',
        data: [65, 59, 70, 68, 71, 68, 70]
      },
      {
        label: 'Consider',
        backgroundColor: '#FF6384',
        hoverBackgroundColor: '#FF6384',
        data: [5, 4, 7, 4, 3, 2, 1]
      }
    ],
    
  };
  
export const ChartsTable= () => {
        return (
            <Bar
                data={data}
                width={100}
                height={150}
                options={{
                    maintainAspectRatio: false
          }}
        />
        );
};

export const PieTable = () => {
        return (
            <Pie
                data={data}
                width={100}
                height={150}
                options={{
                    maintainAspectRatio: false
          }}
        />
        );
};
