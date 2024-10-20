import { Box } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { LineChart } from "@mui/x-charts";
import AuthContext from "../context/AuthContext";

// Formatters for the chart
const dateFormatter = (date) =>
  `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
const weightFormatter = (weight) => `${weight.toFixed(2)} Kg`;

const WeightLineChart = () => {
  const [dates, setDates] = useState([]);
  const [weights, setWeights] = useState([]);
  const { authToken, refreshBMICalories } = useContext(AuthContext);

  // For debugging purposes
  console.log(dates.map((date) => date.toDateString()));
  console.log(weights.map((weight) => weight.toFixed(2)));

  useEffect(() => {
    const getWeightsData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/get_weight", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken?.access}`,
          },
          body: JSON.stringify({}),
        });

        const data = await response.json();

        if (response.status === 200 && data.length > 0) {
          // Map data to dates and weights arrays
          setDates(
            data.map((entry) => {
              const date = new Date(entry.date);
              return new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
              );
            })
          );
          setWeights(data.map((entry) => parseFloat(entry.weight)));
        } else {
          alert("No weight data found");
        }
      } catch (error) {
        console.error("Error fetching weight data:", error);
      }
    };

    if (authToken?.access) {
      getWeightsData();
    }
  }, [authToken?.access, refreshBMICalories]);

  const lineChartsParams = {
    series: [
      {
        label: "Weight Over Time",
        data: weights,
        showMark: true, // Show points for each data entry
      },
    ],
    width: 600,
    height: 450,
  };

  return (
    <Box flex={4} p={2}>
      <LineChart
        {...lineChartsParams}
        xAxis={[
          {
            data: dates,
            scaleType: "time",
            valueFormatter: dateFormatter, // Format the date as day/month/year
          },
        ]}
        tooltip={{
          trigger: "item", // Show tooltip per item (data point)
          formatter: (params) => {
            const index = params.dataIndex;
            const date = dates[index];
            const weight = params.data;
            return `${dateFormatter(date)}: ${weightFormatter(weight)}`;
          },
        }}
      />
    </Box>
  );
};

export default WeightLineChart;
