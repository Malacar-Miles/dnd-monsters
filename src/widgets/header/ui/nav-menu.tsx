import { Menu, MenuItem, Button } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

export type NavMenuItem = {
  title: string;
  path: string;
};

export const NavMenu = ({
  navMenuItems,
  mobileBreakpoint,
}: {
  navMenuItems: NavMenuItem[];
  mobileBreakpoint: number;
}) => {
  const mobileScreen = useMediaQuery(`(max-width:${mobileBreakpoint}px)`);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  const handleMenuClick = () => {
    setMenuOpen(true);
  };

  return mobileScreen ? (
    <>
      <MenuIcon fontSize="large" ref={menuRef} onClick={handleMenuClick} />
      <Menu
        open={menuOpen}
        anchorEl={menuRef.current}
        onClose={handleMenuClose}
      >
        {navMenuItems.map((item) => (
          <MenuItem
            key={item.path}
            onClick={() => handleMenuItemClick(item.path)}
          >
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  ) : (
    <>
      {navMenuItems.map((item) => (
        <Button
          key={item.path}
          color="inherit"
          size="large"
          onClick={() => navigate(item.path)}
        >
          {item.title}
        </Button>
      ))}
    </>
  );
};
