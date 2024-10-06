import React, { useState } from "react";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const CalorieBurnCalculator = () => {
  const { CalorieBurnCalculator_api } = useContext(AuthContext);

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [duration, setDuration] = useState("");
  const [activity, setActivity] = useState("");

  const activities = {
    walking: 3.5,
    jogging: 7,
    cycling: 5.5,
    swimming: 6,
    // MET values (Metabolic Equivalent of Task)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Calorie Burn data:", weight, height, duration, activity);
    CalorieBurnCalculator_api(weight, height, duration, activity);
  };

  return (
    <Box flex={3} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Typography variant="h6" gutterBottom>
        Calorie Burn Calculator
      </Typography>
      <TextField
        label="Weight (kg)"
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        fullWidth
        margin="normal"
        size="small"
      />
      <TextField
        label="Height (m)"
        type="number"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        fullWidth
        margin="normal"
        size="small"
      />
      <TextField
        label="Duration (minutes)"
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        fullWidth
        margin="normal"
        size="small"
      />
      <FormControl fullWidth margin="normal" size="small">
        <InputLabel>Activity</InputLabel>
        <Select
          value={activity}
          label="Activity"
          onChange={(e) => setActivity(e.target.value)}
        >
          <MenuItem value="walking">Walking</MenuItem>
          <MenuItem value="jogging">Jogging</MenuItem>
          <MenuItem value="cycling">Cycling</MenuItem>
          <MenuItem value="swimming">Swimming</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
        fullWidth
      >
        Calculate Calories Burned
      </Button>
    </Box>
  );
};

export default CalorieBurnCalculator;
