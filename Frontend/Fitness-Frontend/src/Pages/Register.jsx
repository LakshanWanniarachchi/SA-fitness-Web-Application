import React, { useState, useContext } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import AuthContext from "../context/AuthContext";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Register = () => {
  const { Registration } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    birthday: dayjs().format("YYYY-MM-DD"),
    sex: "",
    password: "",
  });

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [showPassword, setShowPassword] = useState(false);

  // Handle date changes and format to "MM/DD/YYYY"
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setFormData({
      ...formData,
      birthday: dayjs(newDate).format("YYYY-MM-DD"), // Formatting the date to "MM/DD/YYYY"
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Registration data:", formData);
    Registration(formData); // Send the formatted data to the context function
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          mt: 8,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Birthday"
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
          </LocalizationProvider>

          <TextField
            margin="normal"
            required
            fullWidth
            select
            id="gender"
            label="Gender"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
          >
            <MenuItem value="M">Male</MenuItem>
            <MenuItem value="F">Female</MenuItem>
            <MenuItem value="O">Other</MenuItem>
          </TextField>

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
