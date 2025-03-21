import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Board from './Board'; // Import your Tic-Tac-Toe game component

export default function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(true); // State to control the drawer
  const [selectedMenu, setSelectedMenu] = React.useState(null); // State to track selected menu item

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsOpen(open);
  };

  const handleMenuClick = (text) => {
    setSelectedMenu(text); // Set the selected menu item
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)} // Close drawer on item click
      onKeyDown={toggleDrawer(false)} // Close drawer on keydown
    >
      <List>
        {/* Only Tic-Tac-Toe menu item */}
        <ListItem key="Tic-Tac-Toe" disablePadding>
          <ListItemButton onClick={() => handleMenuClick('Tic-Tac-Toe')}>
            <ListItemIcon>
              {/* You can use any icon here or leave it empty */}
            </ListItemIcon>
            <ListItemText primary="Tic-Tac-Toe" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {/* Button to open the sidebar when it is closed */}
      {!isOpen && (
        <IconButton
          onClick={toggleDrawer(true)} // Open the drawer
          sx={{ position: 'fixed', left: 10, top: 10, zIndex: 1200 }} // Position the button
        >
          <MenuIcon /> {/* Menu icon */}
        </IconButton>
      )}

      {/* Sidebar Drawer */}
      <Drawer
        anchor="left" // Only left drawer
        open={isOpen} // Controlled by isOpen state
        onClose={toggleDrawer(false)} // Close drawer when clicking outside
      >
        {list()}
      </Drawer>

      {/* Render the Tic-Tac-Toe game if selected */}
      {selectedMenu === 'Tic-Tac-Toe' && (
        <Box
          sx={{
            marginLeft: '250px', // Adjust margin to avoid overlap with the sidebar
            padding: '20px',
          }}
        >
          <Board /> {/* Render the Tic-Tac-Toe game */}
        </Box>
      )}
    </div>
  );
}