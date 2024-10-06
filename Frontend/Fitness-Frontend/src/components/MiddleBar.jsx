import { Box } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import AuthContext from "../context/AuthContext";

// Formatters for the chart
const dateFormatter = (date) =>
  `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
const calorieFormatter = (calories) => `${calories.toFixed(2)} kcal`;

const MiddleBar = () => {
  const [dates, setDates] = useState([]);
  const [calories, setCalories] = useState([]);
  const { authToken, refreshBMICalories } = useContext(AuthContext);

  // For debugging purposes
  console.log(dates.map((date) => date.toDateString()));
  console.log(calories.map((calorie) => calorie.toFixed(2)));

  useEffect(() => {
    const getCaloriesData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/get_calories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken?.access}`,
          },
          body: JSON.stringify({}),
        });

        const data = await response.json();

        if (response.status === 200 && data.length > 0) {
          // Map data to dates and calories arrays
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
          setCalories(data.map((entry) => parseFloat(entry.calories_burned)));
        } else {
          alert("No calorie data found");
        }
      } catch (error) {
        console.error("Error fetching calorie data:", error);
      }
    };

    if (authToken?.access) {
      getCaloriesData();
    }
  }, [authToken?.access, refreshBMICalories]);

  const lineChartsParams = {
    series: [
      {
        label: "Calories Burned",
        data: calories,
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
            const calories = params.data;
            return `${dateFormatter(date)}: ${calorieFormatter(calories)}`;
          },
        }}
      />
    </Box>
  );
};

export default MiddleBar;
