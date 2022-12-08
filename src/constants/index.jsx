import TelegramIcon from "../assets/icons/telegram-icon.svg?component";
import KakaoTalkIcon from "../assets/icons/kakaotalk.svg?component";
import PersonIcon from "@mui/icons-material/Person";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

export const pages = [
  {
    name: "Create NFT",
    to: "/nft/create",
    isAuthenticated: true,
  },
  {
    name: "Marketplace",
    to: "/marketplace",
  },
  {
    name: "Contact",
    to: "/contact",
    children: [
      {
        name: "Telegram",
        to: "#",
        icon: <TelegramIcon />,
      },
      {
        name: "KakaoTalk",
        to: "#",
        icon: <KakaoTalkIcon />,
      },
    ],
  },
  {
    name: "Rankings",
    to: "/rankings",
  },
  {
    name: "Swap",
    to: "/swap",
    isAuthenticated: true,
  },
];

export const responsivePages = (handleLogout) => [
  ...pages,
  {
    name: "Profile",
    children: [
      {
        name: "Profile",
        to: "/user/my-page",
        icon: <PersonIcon />,
      },
      {
        name: "My Collections",
        to: "/user/collections",
        icon: <GridViewRoundedIcon />,
      },
      {
        name: "My Application",
        to: "/user/my-page/artist-status",
        icon: <InsertDriveFileRoundedIcon />,
      },
      {
        name: "Favorites",
        to: "/user/my-page/favorites",
        icon: <FavoriteRoundedIcon />,
      },
      {
        name: "Settings",
        to: "/user/settings",
        icon: <SettingsRoundedIcon />,
      },
      {
        name: "Logout",
        to: null,
        icon: <LogoutRoundedIcon />,
        onClick: handleLogout,
      },
    ],
  },
];

export const priceType = {
  FIXED: {
    key: "fixed",
    value: "Fixed",
  },
  AUCTION: {
    key: "auction",
    value: "Auction",
  },
};

export const priceTypeChar = {
  F: "Fixed",
  A: "Auction",
};

export const DATE_FORMAT = "yyyy-MM-DD HH:mm:ss";
