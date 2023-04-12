import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import NotesIcon from '@mui/icons-material/Notes';
import AddIcon from '@mui/icons-material/Add';
import { createBrowserRouter, BrowserRouter, NavLink, Routes, Route } from 'react-router-dom'
import { dummyData } from './data/dummyData';
import Folder from './pages/Folder';
import Note from './pages/Note';
import Home from './pages/Home';
import { AllType, FolderType } from './types/All.types';

if (localStorage.getItem("localUserData") === null) {
  localStorage.setItem('localUserData', JSON.stringify(dummyData))
}

// All Navbar Related items below
const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [allUserData, setAllUserData] = React.useState(JSON.parse(localStorage.getItem("localUserData")!))

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function handleAddFolder() {
    /* 
      Get data
      Add new folder in data
      Save the data to local storage
      Update react state
    */
    let data : AllType = JSON.parse(localStorage.getItem("localUserData")!)
    const newFolder : FolderType = {
      id: Math.floor(Math.random() * 1000000),
      title: 'New Notes',
      notes: [

      ]
    }

    data.folders.push(newFolder)
    localStorage.setItem('localUserData', JSON.stringify(data))
    setAllUserData(data)
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <NavLink to="/">
          <ListItem key='welcome' disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary="Welcome" />
            </ListItemButton>
          </ListItem>          
        </NavLink>
      </List>
      <Divider />
      <List>
        {allUserData.folders.map((folder : FolderType) => {
          return(
            <NavLink to={`/${folder.id}`} key={`/${folder.id}`}>
              <ListItem key={folder.id} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <NotesIcon />
                  </ListItemIcon>
                  <ListItemText primary={folder.title} />
                </ListItemButton>
              </ListItem>              
            </NavLink>
          )
        })}
        <ListItem>
          <ListItemButton onClick={handleAddFolder}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Folder" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <BrowserRouter>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Notify
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {/* Router Placed Here! */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:folder" element={<Folder allData={allUserData} />} />
          <Route path="/:folder/:note" element={<Note allData={allUserData} />} />
        </Routes>
      </Box>
    </Box>
    </BrowserRouter>
  );
}