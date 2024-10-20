import React, { useEffect, useContext, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { Box, Typography } from "@mui/material"; // Import Typography for text display
import AuthContext from "../context/AuthContext";

const Speedometer = () => {
  const { authToken, refreshBMICalories, setRefreshBMICalories } =
    useContext(AuthContext);
  const [bmi, setBmi] = useState(0);

  useEffect(() => {
    const getBmi = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/get_bmi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken?.access}`,
          },
          body: JSON.stringify({}),
        });

        const data = await response.json();

        if (response.status === 200 && data.length > 0) {
          const bmiValue = parseFloat(data[0].bmi);
          setBmi(bmiValue);
          setRefreshBMICalories(false);
        } else {
          alert("No BMI data found");
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (authToken?.access) {
      getBmi();
    }
  }, [authToken?.access, refreshBMICalories, setRefreshBMICalories]);

  return (
    <Box flex={4} p={2} textAlign="center">
      {" "}
      {/* Align center */}
      <Typography variant="h6" gutterBottom>
        Your BMI Value: {bmi > 0 ? bmi.toFixed(2) : "Calculating..."}{" "}
        {/* Display BMI with 2 decimal places */}
      </Typography>
      <div style={{ marginTop: "30px" }}>
        <ReactSpeedometer
          maxValue={50}
          width={700}
          value={bmi} // Update to pass the correct BMI value
          needleColor="red"
          startColor="blue"
          segments={7} // Keep this as 7 to match your segment stops
          endColor="red"
          customSegmentStops={[0, 16, 25, 30, 35, 40, 50]} // Your 7 segment stops
          segmentColors={[
            "#66ccff", // Severe Thinness
            "#99ccff", // Moderate Thinness
            "#ccccff", // Mild Thinness
            "#99ff99", // Normal
            "#ffff66", // Overweight
            "#ffcc66", // Obese Class I
            "#ff9966", // Obese Class II & III
          ]}
          customSegmentLabels={[
            { text: "Severe Thinness", position: "INSIDE", color: "#000" },
            { text: "Moderate Thinness", position: "INSIDE", color: "#000" },
            { text: "Mild Thinness", position: "INSIDE", color: "#000" },
            { text: "Normal", position: "INSIDE", color: "#000" },
            { text: "Overweight", position: "INSIDE", color: "#000" },
            { text: "Obese", position: "INSIDE", color: "#000" }, // Adjusted labels to fit 6
          ]}
          textColor="#d8dee9"
        />
      </div>
    </Box>
  );
};

export default Speedometer;
