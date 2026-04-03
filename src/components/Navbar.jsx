"use client";
import React, { useState } from "react";
import Link from "next/link";
//MUI
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import styles from "../styles/navbar.module.css";

const drawerWidth = "max-content";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Navbar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* ICONO 3 BARRAS — padding simétrico y sin edge para centrar icono en hover/focus */}
      <Toolbar
        disableGutters
        variant="dense"
        sx={{
          minHeight: 48,
          alignItems: "center",
          justifyContent: "center",
          px: 0,
        }}
      >
        <IconButton
          color="inherit"
          aria-label="Abrir menú de navegación"
          onClick={handleDrawerOpen}
          sx={{
            p: 1.25,
            minWidth: 48,
            minHeight: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
            "& .MuiSvgIcon-root": {
              display: "block",
            },
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* EL "DRAWER" QUE SE ABRE*/}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        {/* ESPACIO DE ARRIBA DEL "DRAWER" */}
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />

        {/* LISTA DE ITEMS DENTRO DEL "DRAWER" */}
        {/* <List>
          {['Mapa', 'Proyectos', 'Obras'].map((text, index) => (
            <ListItem key={text} >
              <ListItemButton> */}
        {/* <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon> */}
        {/* <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}

        <List>
          <ListItem>
            <ListItemButton onClick={handleDrawerClose}>
              <Link href="/" className={styles.anchor}>
                Inicio
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={handleDrawerClose}>
              <Link href="/mapar" className={styles.anchor}>
                Mapa
              </Link>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={handleDrawerClose}>
              <Link href="/murales" className={styles.anchor}>
                Murales
              </Link>
            </ListItemButton>
          </ListItem>

          {/* <ListItem>
            <ListItemButton>
              <Link href="./obras" className={styles.anchor}>
                obras
              </Link>
            </ListItemButton>
          </ListItem> */}
        </List>
        {/* CIERRE LISTA DE ITEMS DENTRO DEL "DRAWER" */}

        <Divider />

        {/* LISTA DE ITEMS DENTRO DEL "DRAWER" */}
        <List>
          <ListItem>
            <ListItemButton onClick={handleDrawerClose}>
              <Link href="/info" className={styles.anchor}>
                Cancer de mama
              </Link>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={handleDrawerClose}>
              <Link href="/donaciones" className={styles.anchor}>
                Donaciones
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={handleDrawerClose}>
              <Link href="/us" className={styles.anchor}>
                Nosotres
              </Link>
            </ListItemButton>
          </ListItem>
        </List>
        {/* CIERRE LISTA DE ITEMS DENTRO DEL "DRAWER" */}
      </Drawer>

      {/* CIERRE DEL "DRAWER" QUE SE ABRE */}

      {/* NO SE QUE ES  */}

      {/* <Main open={open}>
        <DrawerHeader />
      </Main> */}
    </Box>
  );
}
