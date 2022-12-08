import { ListItem, List, Box, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { pages } from "../../../constants";
import styles from "../../AuthLayout/style.module.scss";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { useSelector } from "react-redux";
import ProfileMenu from "../ProfileMenu";
import { useOnClickOutside } from "../../../hooks/useOnOutsideClick";
import classNames from "classnames";

const LinkList = () => {
  const { pathname } = useLocation();
  const contactRef = useRef(null);
  const { token } = useSelector((store) => store.auth);

  const [contactOpen, setContactOpen] = useState(false);

  const handleToggleContact = () => setContactOpen((prev) => !prev);

  useOnClickOutside(contactRef, contactOpen ? handleToggleContact : () => {});

  return (
    <List className={styles.navList}>
      {pages.map((page) => (
        <ListItem
          className={classNames(styles.navItem, {
            [styles.active]: pathname.includes(page.to),
          })}
          key={page.name}
        >
          {!!page.children ? (
            <Box className={styles.box} ref={contactRef}>
              <Typography
                variant="body2"
                display="flex"
                alignItems="center"
                onClick={handleToggleContact}
              >
                {page.name}&nbsp;{" "}
                {!!page.children && <KeyboardArrowDownRoundedIcon />}
              </Typography>
              {!!page.children && contactOpen && (
                <ProfileMenu options={page.children} />
              )}
            </Box>
          ) : page.name === "Swap" && page.isAuthenticated && token ? (
            <a href="https://swap.conun.io/" target="_blank" rel="noreferrer">
              <Typography variant="body2" display="flex" alignItems="center">
                {page.name}&nbsp;{" "}
              </Typography>
            </a>
          ) : (
            <NavLink to={page.isAuthenticated && !token ? "/login" : page.to}>
              <Typography variant="body2" display="flex" alignItems="center">
                {page.name}&nbsp;{" "}
              </Typography>
            </NavLink>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default LinkList;
