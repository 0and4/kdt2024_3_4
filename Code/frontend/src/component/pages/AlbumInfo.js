import React from "react";
import { useParams } from "react-router-dom";
function AlbumInfo() {
  const { albumName } = useParams();

  return (
    <div>
      <h1>Album Info - {albumName}</h1>
      {/* 앨범 정보 표시 */}
    </div>
  );
}
export default AlbumInfo;
