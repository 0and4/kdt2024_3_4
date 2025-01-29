import React from "react";
import { useParams } from "react-router-dom";
function ArtistInfo() {
  const { artistName } = useParams();
  return (
    <div>
      <h1>Artist Info - {artistName}</h1>
      {/* 아티스트 정보 표시 */}
    </div>
  );
}
export default ArtistInfo;
