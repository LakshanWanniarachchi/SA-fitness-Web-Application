import React, { useEffect, useContext, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { Box } from "@mui/material";
import AuthContext from "../context/AuthContext";

const Speedometer = () => {
  const { authToken, refreshBMICalories, setRefreshBMICalories } =
    useContext(AuthContext);
  const [bmi, setbmi] = useState(0);

  useEffect(() => {
    const get_bmi = async () => {
      try {
        const response = await fetch("http://159.100.18.155/api/get_bmi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken?.access}`,
          },
          body: JSON.stringify({}),
        });

        const data = await response.json();

        if (response.status === 200 && data.length > 0) {
          // Assuming the first element of the array is what we need
          const bmiValue = parseFloat(data[0].bmi);
          setbmi(bmiValue);
          console.log(`BMI: ${bmiValue}`);
          setRefreshBMICalories(false);
        } else {
          alert("No BMI data found");
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (authToken?.access) {
      get_bmi();
      console.log(authToken.access);
    }
  }, [authToken?.access, refreshBMICalories]);

  return (
    <Box flex={4} p={2}>
      <div style={{ marginTop: "30px" }}>
        <ReactSpeedometer
          maxValue={50}
          width={700}
          value={bmi} // Update to pass the correct BMI value
          needleColor="red"
          startColor="blue"
          segments={8}
          endColor="red"
          customSegmentStops={[0, 16, 25, 30, 35, 40, 50]}
          segmentColors={[
            "#66ccff", // Severe Thinness
            "#99ccff", // Moderate Thinness
            "#ccccff", // Mild Thinness
            "#99ff99", // Normal
            "#ffff66", // Overweight
            "#ffcc66", // Obese Class I
            "#ff9966", // Obese Class II
            "#ff6666", // Obese Class III
          ]}
          customSegmentLabels={[
            { text: "Severe Thinness", position: "INSIDE", color: "#000" },
            { text: "Normal", position: "INSIDE", color: "#000" },
            { text: "Overweight", position: "INSIDE", color: "#000" },
            { text: "Obese Class I", position: "INSIDE", color: "#000" },
            { text: "Obese Class II", position: "INSIDE", color: "#000" },
            { text: "Obese Class III", position: "INSIDE", color: "#000" },
          ]}
          textColor="#d8dee9"
        />
      </div>
    </Box>
  );
};

export default Speedometer;
