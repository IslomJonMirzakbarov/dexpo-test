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
          ConnectWallet: "Connect Wallet",
          HottestArtworks: "Hottest Artworks",
          BuyNow: "Buy now",
          SoldOut: "Sold out",
          Fixed: "Fixed",
          Auction: "Auction",
          NotableArtworks: "Notable Artworks",
          TopCollections: "Top Collections",
          GoToRankings: "Go To Rankings",
          "What is DEXPO NFT Marketplace ?": "What is DEXPO NFT Marketplace ?",
          "World Art DEXPO NFT Marketplace is a platform built to gather like-minded creators, artists, and crypto enthusiasts to create, trade, and share top NFTs. Platform Features: Users can mint, list, purchase, and bid on NFTs by using CYCON coins around the world.":
            "World Art DEXPO NFT Marketplace is a platform built to gather like-minded creators, artists, and crypto enthusiasts to create, trade, and share top NFTs. Platform Features: Users can mint, list, purchase, and bid on NFTs by using CYCON coins around the world.",

          "How do I buy an NFT ?": "How do I buy an NFT ?",
          "For NFTs with a fixed price, click the [Purchase Artwork] button on the Marketplace Details page and complete the transaction. For NFTs on auction, If another user exceeds the bid price you offered, the amount of CYCON that has already been bid will be returned.":
            "For NFTs with a fixed price, click the [Purchase Artwork] button on the Marketplace Details page and complete the transaction. For NFTs on auction, If another user exceeds the bid price you offered, the amount of CYCON that has already been bid will be returned.",

          "How do I sell an NFT ?": "How do I sell an NFT ?",
          "To list an NFT for sale, first of all artists need approval from our admin. This process usually takes 1-2 hours. After successful approval, your NFT will list immediately on the Marketplace as either an auction or fixed price sale.":
            "To list an NFT for sale, first of all artists need approval from our admin. This process usually takes 1-2 hours. After successful approval, your NFT will list immediately on the Marketplace as either an auction or fixed price sale.",

          "How do I create an NFT ?": "How do I create an NFT ?",
          "Once you are approved as an artist, click [Create NFT] and choose your file to upload We currently support JPG and PNG. Please note that your NFT cannot be changed or revised once created.":
            "Once you are approved as an artist, click [Create NFT] and choose your file to upload We currently support JPG and PNG. Please note that your NFT cannot be changed or revised once created.",
          footerDescription:
            "World Art DEXPO NFT Marketplace is a platform built to gather like-minded creators, artists, and crypto enthusiasts to create, trade, and share top NFTs.",
          Art: "Art",
          "My Account": "My Account",
          "My Collections": "My Collections",
          "My Application": "My Application",
          Favourites: "Favourites",
          Resources: "Resources",
          "User Guide (en)": "User Guide (en)",
          "User Guide (ko)": "User Guide (ko)",
          Company: "Company",
          About: "About",
          Community: "Community",
          Youtube: "Youtube",
          Facebook: "Facebook",
          Kakaotalk: "Kakaotalk",
          Discord: "Discord",


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
          ConnectWallet: "지갑 연결",
          HottestArtworks: "가장 핫한 작품",
          BuyNow: "구매하기",
          SoldOut: "품절",
          Fixed: "고정가",
          Auction: "경매",
          NotableArtworks: "주목할 만한 작품",
          TopCollections: "인기 작품",
          GoToRankings: "더보기",
          "What is DEXPO NFT Marketplace ?":
            "DEXPO NFT 마켓플레이스란 무엇인가요?",
          "World Art DEXPO NFT Marketplace is a platform built to gather like-minded creators, artists, and crypto enthusiasts to create, trade, and share top NFTs. Platform Features: Users can mint, list, purchase, and bid on NFTs by using CYCON coins around the world.":
            "World Art DEXPO NFT 마켓플레이스는 같은 생각을 가진 크리에이터, 아티스트, 암호화폐 애 호가와 함께 최고의 NFT를 거래하고, 공유할 수 있는 플랫폼입니다. 플랫폼 기능: 사용자는 전 세계에서 어디에서나 CYCON 코인을 사용하여 NFT 발행, 등록, 구매 및 경매를 할 수 있습니다.",

          "How do I buy an NFT ?": "NFT는 어떻게 구입하나요?",
          "For NFTs with a fixed price, click the [Purchase Artwork] button on the Marketplace Details page and complete the transaction. For NFTs on auction, If another user exceeds the bid price you offered, the amount of CYCON that has already been bid will be returned.":
            "고정 가격 NFT의 경우 [작품 구매]를 클릭하세요. 마켓플레이스 세부정보 페이지에서 [작품 구매]버튼을 클릭하고 거래를 완료합니다. 경매 NFT의 경우 다른 사용자가 귀하가 제시한 금액보다 높을 경우, 귀하가 제시한 CYCON은 반 환됩니다.",

          "How do I sell an NFT ?": "NFT를 어떻게 판매하나요?",
          "To list an NFT for sale, first of all artists need approval from our admin. This process usually takes 1-2 hours. After successful approval, your NFT will list immediately on the Marketplace as either an auction or fixed price sale.":
            "NFT를 판매 목록에 올리려면 먼저 관리자로부터 아티스트 승인이 필요합니다. 승인은 보통 1-2시간정도 소요됩니다. 승인이 완료되면 NFT를 경매 또는 고정가격으로 마켓플레이스에서 등록 및 판매가 가능합니다.",

          "How do I create an NFT ?": "NFT는 어떻게 생성합니까 ?",
          "Once you are approved as an artist, click [Create NFT] and choose your file to upload We currently support JPG and PNG. Please note that your NFT cannot be changed or revised once created.":
            "아티스트로 승인되면 [NFT 생성]을 클릭하고 업로드할 파일을 선택합니다. 현재 JPG 및 PNG를 지원합니다. NFT는 일단 생성되면 변경하거나 수정할 수 없습니다.",
          footerDescription:
            "World Art DEXPO NFT 마켓플레이스는 같은 생각을 가진 크리에이터, 아티스트, 암호화폐 애호가와 함께 최고의 NFT를 만들고, 거래하고, 공유할 수 있는 플랫폼입니다.",

          Art: "작품",
          "My Account": "마이페이지",
          "My Collections": "내 갤러리",
          "My Application": "내 거래 현황",
          Favourites: "관심 작품",
          Resources: "이용안내",
          "User Guide (en)": "유저가이드 (en)",
          "User Guide (ko)": "유저가이드 (ko)",
          Company: "회사",
          About: "회사소개",
          Community: "커뮤니티",
          Youtube: "Youtube",
          Facebook: "Facebook",
          Kakaotalk: "Kakaotalk",
          Discord: "Discord",

          
        },
      },
    },
  });

export default i18n;

// const {t} = useTranslation();
