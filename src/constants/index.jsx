import TelegramIcon from '../assets/icons/telegram-icon.svg?component';
import KakaoTalkIcon from '../assets/icons/kakaotalk.svg?component';

export const pages = [
  {
    name: 'Create NFT',
    to: '/nft/create',
    isAuthenticated: true
  },
  {
    name: 'Marketplace',
    to: '/marketplace'
  },
  {
    name: 'Contact',
    to: '/contact',
    children: [
      {
        name: 'Telegram',
        to: '#',
        icon: <TelegramIcon />
      },
      {
        name: 'KakaoTalk',
        to: '#',
        icon: <KakaoTalkIcon />
      }
    ]
  },
  {
    name: 'Rankings',
    to: '/rankings'
  },
  {
    name: 'Faucet',
    to: '/faucet',
    isAuthenticated: true
  }
];

export const priceType = {
  FIXED: {
    key: 'fixed',
    value: 'Fixed'
  },
  AUCTION: {
    key: 'auction',
    value: 'Auction'
  }
};

export const priceTypeChar = {
  F: 'Fixed',
  A: 'Auction'
};

export const DATE_FORMAT = 'yyyy-MM-DD HH:mm:ss';
