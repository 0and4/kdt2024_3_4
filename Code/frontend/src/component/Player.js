import styled from "styled-components";
import React, { useState } from "react";
import { FaShuffle, FaRepeat } from "react-icons/fa6";
import { CgPlayTrackPrevO, CgPlayTrackNextO } from "react-icons/cg";
import { FaRegPlayCircle, FaRegPauseCircle } from "react-icons/fa";
import PlaySongList from "./ui/PlaySongList";

const Wrapper = styled.div`
  width: 350px;
  height: 120vh;
  border-left: 3px solid #ccc;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;
const SongPlayDiv = styled.div`
  flex: 1;
  margin: 20px 15px;
  border-bottom: 2px solid #ccc;
`;
const AlbumJacket = styled.div`
  width: 180px;
  height: 180px;
  background-color: #ccc;
  margin: 0 auto;
`;
const SongTitleP = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 10px;
`;
const ArtistP = styled.p`
  margin: 0;
`;
const PlaySettingDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 10px;
`;
const PlaySettingBtn = styled.button`
  border: none;
  background-color: #fff;
  cursor: pointer;
`;
const PlayDiv = styled.div`
  margin: 10px;
  button {
    margin: 0 5px;
    font-size: 30px;
  }
`;

function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };
  return (
    <Wrapper>
      <SongPlayDiv>
        <AlbumJacket />
        <SongTitleP>Song Title</SongTitleP>
        <ArtistP>artist name</ArtistP>
        <PlaySettingDiv>
          <PlaySettingBtn>
            <FaShuffle />
          </PlaySettingBtn>

          <PlaySettingBtn>
            <FaRepeat />
          </PlaySettingBtn>
        </PlaySettingDiv>
        <progress id="progress" value="50" min="0" max="100"></progress>
        <PlayDiv>
          <PlaySettingBtn>
            <CgPlayTrackPrevO />
          </PlaySettingBtn>
          <PlaySettingBtn onClick={togglePlay}>
            {isPlaying ? <FaRegPauseCircle /> : <FaRegPlayCircle />}
          </PlaySettingBtn>
          <PlaySettingBtn>
            <CgPlayTrackNextO />
          </PlaySettingBtn>
        </PlayDiv>
      </SongPlayDiv>
      <PlaySongList />
    </Wrapper>
  );
}
export default Player;
