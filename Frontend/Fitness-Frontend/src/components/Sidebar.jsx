import { Box } from '@mui/material'
import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import Task from '@mui/icons-material/Task'
import Settings from '@mui/icons-material/Settings'
import Info from '@mui/icons-material/Info'
import Feedback from '@mui/icons-material/Feedback'
import { DarkMode } from '@mui/icons-material';
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };


const SideButton = () => {
  return (
    
      <Box flex={1}  p={2} sx={{display:{xs:"none", sm:"block"},position:"sticky"}}>

       <List>
          <ListItem disablePadding>
            <ListItemButton LinkComponent={'a'} href='#Home'>
              <ListItemIcon>
                <HomeIcon/>
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton LinkComponent={'a'} href='#mealplan'>
              <ListItemIcon>
                <Task/>
              </ListItemIcon>
              <ListItemText primary="Meal Plan" />
            </ListItemButton>
          </ListItem>

          <Divider/>

          <ListItem disablePadding>
            <ListItemButton LinkComponent={'a'} href='#setting'>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Setting" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton LinkComponent={'a'} href='#About'>
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton LinkComponent={'a'} href='#feedback'>
              <ListItemIcon>
              <Feedback/>
              </ListItemIcon>
              <ListItemText primary="FeedBack" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton LinkComponent={'a'} href='#feedback'>
              <ListItemIcon>
              <DarkMode/>
              </ListItemIcon>
              <Switch {...label} defaultChecked />
            </ListItemButton>
          </ListItem>
          
          </List>

      </Box>
    
  )
}

export default SideButton
