import React from "react";
import useArtistAPI from "../../hooks/useArtistAPI";
import useCollectionAPI from "../../hooks/useCollectionApi";

const MyPage = () => {
  const { collections } = useCollectionAPI({
    isDetail: true,
    page: 1,
    orderBy: "desc",
    size: 10,
  });
  const { artist } = useArtistAPI({ isDetail: true });
  if (artist) {
    console.log(artist);
    // ... for later usage
  }
  return (
    <div
      style={{
        width: "100vh",
        height: "80vh",
        display: "flex",
        justifyContent: "center", // just for demo, later will be replaced with actual code
        alignItems: "center",
        fontSize: "40px",
      }}
    >
      MyPage
    </div>
  );
};

export default MyPage;
