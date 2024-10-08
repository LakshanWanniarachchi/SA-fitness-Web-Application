import React from "react";
import {
  Box,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { Notifications, AccountCircle, Search } from "@mui/icons-material";

const FitnessApp = () => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {["Home", "Meal Plan", "Settings", "About", "Feedback"].map(
            (text) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              FITNESS CENTRE
            </Typography>
            <div>
              <IconButton>
                <Search />
              </IconButton>
              <InputBase placeholder="Search…" />
              <IconButton color="inherit">
                <Notifications />
              </IconButton>
              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>

        <Toolbar />

        {/* Calories Burned Graph */}
        <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6">Calories Burned Over Time</Typography>
          {/* Placeholder for the graph */}
          <Box sx={{ height: 200, bgcolor: "grey.200" }}>Graph Here</Box>
        </Paper>

        {/* Calorie Burn Calculator */}
        <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6">Calorie Burn Calculator</Typography>
          <form>
            <TextField label="Weight (kg)" fullWidth margin="normal" />
            <TextField label="Height (m)" fullWidth margin="normal" />
            <TextField label="Duration (min)" fullWidth margin="normal" />
            <FormControl fullWidth margin="normal">
              <InputLabel>Activity</InputLabel>
              <Select defaultValue="">
                <MenuItem value="running">Running</MenuItem>
                <MenuItem value="cycling">Cycling</MenuItem>
                <MenuItem value="swimming">Swimming</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" fullWidth>
              Calculate Calories Burned
            </Button>
          </form>
        </Paper>

        {/* BMI Meter */}
        <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6">BMI Meter</Typography>
          {/* Circular gauge for BMI */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress variant="determinate" value={70} size={100} />
          </Box>
        </Paper>

        {/* Health Tip of the Day */}
        <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6">Health Tip of the Day</Typography>
          <Typography variant="body1">
            Drink plenty of water every day to stay hydrated and maintain good
            health!
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default FitnessApp;
