import React from 'react';

export const historyMockData = [
  {
    event: 'TRADE',
    amount: 2792.57,
    price: 133.14,
    from: '0x4A7B3B...cA7Ad293',
    to: '0xe84e73...b244891e',
    txHash: '0x184e73…b2448912',
    date: '2022.04.13 17:48:29'
  },
  {
    event: 'OFFER',
    amount: 2792.57,
    price: 133.14,
    from: '0x4A7B3B...cA7Ad293',
    to: '0xe84e73...b244891e',
    txHash: '0x184e73…b2448912',
    date: '2022.04.13 17:48:29'
  },
  {
    event: 'CANCEL',
    amount: null,
    price: null,
    from: '0x4A7B3B...cA7Ad293',
    to: '0xe84e73...b244891e',
    txHash: '0x184e73…b2448912',
    date: '2022.04.13 17:48:29'
  },
  {
    event: 'LISTED',
    amount: 2792.57,
    price: 133.14,
    from: '0x4A7B3B...cA7Ad293',
    to: '0xe84e73...b244891e',
    txHash: '0x184e73…b2448912',
    date: '2022.04.13 17:48:29'
  },
  {
    event: 'MINTED',
    amount: null,
    price: null,
    from: '0x4A7B3B...cA7Ad293',
    to: '0xe84e73...b244891e',
    txHash: '0x184e73…b2448912',
    date: '2022.04.13 17:48:29'
  }
];

export const historyMockHeadRows = [
  'Event',
  'Quantity',
  'Price',
  'From',
  'To',
  'Tx Hash',
  'Date'
];
