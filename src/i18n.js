import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          description: {
            part1: "Edit <1>src/App.js</1> and save to reload.",
            part2: "Learn React",
          },
          searchPlaceHolder: "Search items, collections, and accounts",
          CreateNFT: "Create Nft",
          Marketplace: "Marketplace",
          Contact: "Contact",
          Rankings: "Rankings",
          Swap: "Swap",
          Faucet: "Faucet",
          Telegram: "Telegram",
          KakaoTalk: "KakaoTalk",
          Profile: "Profile",
          MyCollections: "My Collections",
          MyApplication: "My Application",
          Favorites: "Favorites",
          Settings: "Settings",
          Logout: "Logout",
        },
      },
      kr: {
        translation: {
          description: {
            part1: "Ändere <1>src/App.js</1> und speichere um neu zu laden.",
            part2: "Lerne tedk",
          },
          searchPlaceHolder: "작품 및 계정 검색",
          CreateNFT: "NFT 생성",
          Marketplace: "마켓플레이스",
          Contact: "문의",
          Rankings: "랭킹",
          Swap: "스왑",
          Faucet: "수도꼭지",
          Telegram: "전보",
          KakaoTalk: "카카오톡",
          Profile: "프로필",
          MyCollections: "내 컬렉션",
          MyApplication: "내 응용 프로그램",
          Favorites: "즐겨찾기",
          Settings: "설정",
          Logout: "로그 아웃",
        },
      },
    },
  });

export default i18n;
