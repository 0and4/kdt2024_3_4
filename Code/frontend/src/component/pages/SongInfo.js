import React from "react";
import { useParams } from "react-router-dom";
function SongInfo() {
  const { songId } = useParams();

  return (
    <div>
      <h1>Song Info - {songId}</h1>
      {/* 노래 정보 표시 */}
    </div>
  );
}
export default SongInfo;
