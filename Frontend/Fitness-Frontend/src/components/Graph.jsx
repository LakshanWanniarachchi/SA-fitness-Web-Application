import React from 'react'
import Feedback from '@mui/icons-material/Feedback'
import { ListItem,ListItemText,ListItemIcon, ListItemButton } from '@mui/material'

const Graph = () => {
  return (
    <div>
      <ListItem disablePadding>
            <ListItemButton LinkComponent={'a'} href='#feedback'>
              <ListItemIcon>
              <Feedback/>
              </ListItemIcon>
              <ListItemText primary="FeedBack" />
            </ListItemButton>
          </ListItem>
    </div>
  )
}

export default Graph
