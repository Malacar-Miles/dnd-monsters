import { useState, useRef } from "react";
import { getInitialsFromUserName } from "../model/user-logic";
import { useSelector } from "react-redux";
import { selectUserData } from "../model/redux-slice-users";
import { Avatar, Menu, MenuItem, Divider, Typography } from "@mui/material";
import { useReduxUserActions } from "../model/redux-slice-users";

export const UserAvatar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const avatarEl = useRef(null);
  const { signOutUser } = useReduxUserActions();
  const userData = useSelector(selectUserData);

  const { currentUserId } = userData;
  if (!currentUserId) return null;

  const userName = userData.allUsers[currentUserId].name;
  const userInitials = getInitialsFromUserName(userName);

  const handleAvatarClick = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleSignOut = () => {
    setIsMenuOpen(false);
    signOutUser();
  };

  return (
    <>
      <Avatar
        ref={avatarEl}
        onClick={handleAvatarClick}
        sx={{ cursor: "pointer" }}
      >
        {userInitials}
      </Avatar>
      <Menu
        anchorEl={avatarEl.current}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <Typography
          fontStyle={"italic"}
          textAlign={"center"}
          sx={{ padding: "0 1rem" }}
        >
          {userName}
        </Typography>
        <Divider />
        <MenuItem
          onClick={handleSignOut}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Sign out
        </MenuItem>
      </Menu>
    </>
  );
};
