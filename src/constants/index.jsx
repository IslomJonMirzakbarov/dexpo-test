import TelegramIcon from "../assets/icons/telegram-icon.svg?component";
import KakaoTalkIcon from "../assets/icons/kakaotalk.svg?component";
import EnglishIcon from "../assets/icons/en-lang-icon.svg";
import KoreanIcon from "../assets/icons/kr-lang-icon.svg";
import PersonIcon from "@mui/icons-material/Person";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { isMainnet } from "../utils";
import { ReactSVG } from "react-svg";

export const DATE_FORMAT = "yyyy-MM-DD HH:mm:ss";
export const KLAYTN_URL = import.meta.env.VITE_KLAYTN_URL;
export const SWAP_LINK = "https://swap.conun.io/";

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
    name: isMainnet() ? "Swap" : "Faucet",
    to: isMainnet() ? SWAP_LINK : "/faucet",
    isAuthenticated: !isMainnet(),
    target: isMainnet() && "_blank",
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

export const lngs = {
  en: {
    nativeName: "En",
    nativeImage: (
      <ReactSVG
        src={EnglishIcon}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 20,
          marginTop: 10,
        }}
      />
    ),
  },
  kr: {
    nativeName: "Kr",
    nativeImage: (
      <ReactSVG
        src={KoreanIcon}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 20,
          marginTop: 10,
        }}
      />
    ),
  },
};
