import collectionItemImg from "../../assets/images/collection-item.png";

export const topTypes = {
  ARTISTS: "artists",
  COLLECTIONS: "collections",
};

export const myPageTypes = {
  COLLECTED: "collected",
  CREATED: "created",
  FAVORITES: "favorites",
  LISTED_ARTWORKS: "listedArtworks",
  MY_APPLICATION: "myApplication",
};

export const rankingSorts = [
  {
    label: "last 24 hours",
    value: "24h",
  },
  {
    label: "last 7 days",
    value: "7d",
  },
  {
    label: "last 30 days",
    value: "30d",
  },
];

export const rankingTabs = [
  {
    label: "Top Collections",
    value: topTypes.COLLECTIONS,
  },
  {
    label: "Top Artists",
    value: topTypes.ARTISTS,
  },
];

export const myPageTabs = [
  {
    label: "Collected",
    value: myPageTypes.COLLECTED,
  },
  {
    label: "Created",
    value: myPageTypes.CREATED,
  },
  {
    label: "Favorites",
    value: myPageTypes.FAVORITES,
  },
  {
    label: "Listed Artworks",
    value: myPageTypes.LISTED_ARTWORKS,
  },
  {
    label: "My Application",
    value: myPageTypes.MY_APPLICATION,
  },
];

export const tableRows = {
  [topTypes.COLLECTIONS]: (percent) => [
    "Collection",
    "Volume (CYCON)",
    `${percent} %`,
    "Floor Price (CYCON)",
    "Owners",
    "Items",
  ],
  [topTypes.ARTISTS]: () => ["Artist", "Volume (CYCON)", "Owners", "Items"],
};

export const tableData = [
  {
    img: collectionItemImg,
    name: "RR/BAYC",
    volume: 2792.57,
    type: "up",
    percent: 25085.14,
    floorPrice: 2000,
    itemsCount: "6.4K",
    ownersCount: "2.5K",
  },
  {
    img: collectionItemImg,
    name: "RR/BAYC",
    volume: 56.7,
    type: "down",
    percent: 25085.14,
    floorPrice: 2000,
    itemsCount: "6.4K",
    ownersCount: "2.5K",
  },
  {
    img: collectionItemImg,
    name: "RR/BAYC",
    volume: 2792.57,
    type: "up",
    percent: 25085.14,
    floorPrice: 2000,
    itemsCount: "6.4K",
    ownersCount: "2.5K",
  },
  {
    img: collectionItemImg,
    name: "RR/BAYC",
    volume: 56.7,
    type: "down",
    percent: 25085.14,
    floorPrice: 2000,
    itemsCount: "6.4K",
    ownersCount: "2.5K",
  },
  {
    img: collectionItemImg,
    name: "RR/BAYC",
    volume: 2792.57,
    type: "up",
    percent: 25085.14,
    floorPrice: 2000,
    itemsCount: "6.4K",
    ownersCount: "2.5K",
  },
  {
    img: collectionItemImg,
    name: "RR/BAYC",
    volume: 56.7,
    type: "down",
    percent: 25085.14,
    floorPrice: 2000,
    itemsCount: "6.4K",
    ownersCount: "2.5K",
  },
  {
    img: collectionItemImg,
    name: "RR/BAYC",
    volume: 2792.57,
    type: "up",
    percent: 25085.14,
    floorPrice: 2000,
    itemsCount: "6.4K",
    ownersCount: "2.5K",
  },
  {
    img: collectionItemImg,
    name: "RR/BAYC",
    volume: 56.7,
    type: "down",
    percent: 25085.14,
    floorPrice: 2000,
    itemsCount: "6.4K",
    ownersCount: "2.5K",
  },
  {
    img: collectionItemImg,
    name: "RR/BAYC",
    volume: 2792.57,
    type: "up",
    percent: 25085.14,
    floorPrice: 2000,
    itemsCount: "6.4K",
    ownersCount: "2.5K",
  },
  {
    img: collectionItemImg,
    name: "RR/BAYC",
    volume: 56.7,
    type: "down",
    percent: 25085.14,
    floorPrice: 2000,
    itemsCount: "6.4K",
    ownersCount: "2.5K",
  },
];
