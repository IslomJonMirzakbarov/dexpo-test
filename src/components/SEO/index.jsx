import React from 'react';
import { Meta, Title } from 'react-head';

export default function SEO({
  title,
  description,
  name = 'CONUN GLOBAL',
  type = 'website'
}) {
  return (
    <>
      {/* Standard metadata tags */}
      <Title>{title}</Title>
      <Meta name="description" content={description} />
      {/* End standard metadata tags */}

      {/* Facebook tags */}
      <Meta property="og:type" content={type} />
      <Meta property="og:title" content={title} />
      <Meta property="og:description" content={description} />
      <Meta
        property="og:image"
        content="https://gateway.pinata.cloud/ipfs/QmTpCKhMz7v8JW2jRTX8oLkd8TuwwbbxbYZKh5Gia1UepX"
        key="ogimage"
      />
      {/* End Facebook tags */}

      {/* Twitter tags */}
      <Meta name="twitter:creator" content={name} />
      <Meta name="twitter:card" content={type} />
      <Meta name="twitter:title" content={title} />
      <Meta name="twitter:description" content={description} />
      <Meta
        name="twitter:image"
        content="https://gateway.pinata.cloud/ipfs/QmTpCKhMz7v8JW2jRTX8oLkd8TuwwbbxbYZKh5Gia1UepX"
      />
      {/* End Twitter tags */}

      {/* Start custom scripts */}
      <Meta
        name="naver-site-verification"
        content="7ea0672e4e92e32e34de348a77635273976b88d3"
      />
      <Meta
        name="naver-search-plugin"
        content="title=WORLD ART DEXPO|description=Create, Sell and Collect Extraordinary NFTs
// Great chance for artists to create their own items. Lowest fee for selling and buying NFTs"
      />

      {/* End custom scripts */}
    </>
  );
}
