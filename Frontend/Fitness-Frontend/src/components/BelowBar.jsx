import { Box } from '@mui/material'
import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';




const BelowButton = () => {
  return (
    
      <Box flex={1}  p={2} sx={{display:{xs:"none", sm:"block"},position:"sticky"}}>
<Divider/>
       <List>
          <ListItem disablePadding>
            <ListItemButton LinkComponent={Link} href='/login'>
              <ListItemIcon>
                <LoginIcon/>
              </ListItemIcon>
              <ListItemText primary="Log In" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton LinkComponent={Link} href='/register'>
              <ListItemIcon>
                <PersonAddIcon/>
              </ListItemIcon>
              <ListItemText primary="Register" />
            </ListItemButton>
          </ListItem>
          </List>

      </Box>
    
  )
}

export default BelowButton

