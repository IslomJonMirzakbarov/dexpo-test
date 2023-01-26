import React from 'react';
import { Meta, Title } from 'react-head';

export default function SEO({
  title,
  description,
  name = 'CONUN GLOBAL',
  type = 'website',
  keywords
}) {
  return (
    <>
      {/* Standard metadata tags */}
      <Title>{title}</Title>
      <Meta name="description" content={description} />
      <Meta name="keywords" content={keywords} />
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
      <meta
        name="naver-site-verification"
        content="8e223ab64ceb9456a5ae51e69052ea1447b47fcb"
      />
      <Meta
        name="naver-search-plugin"
        content={`title=${title}|description=${description}`}
      />

      <script src="//code.jivosite.com/widget/TRxHRYL4j1" async></script>

      {/* End custom scripts */}
    </>
  );
}
