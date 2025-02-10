import React, { useState } from "react";
import styled from "styled-components";
import { FaPlay } from "react-icons/fa";

const SongListDiv = styled.div`
  flex: 3;
  overflow-y: auto;
  padding: 10px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const TabMenu = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  border-bottom: 2px solid #ccc;
  li {
    font-size: 0.8rem;
    flex: 1;
    text-align: center;
    padding: 10px;
    cursor: pointer;
    background-color: #f9f9f9;
    border-right: 1px solid #ccc;
    &:last-child {
      border-right: none;
    }
    &:hover {
      border-bottom: 2px solid #c69fda;
    }
    &.active {
      background-color: #fff;
      font-weight: bold;
      border-bottom: 2px solid #68009b;
    }
  }
`;

const TabContent = styled.div`
  max-height: 350px;
  overflow-y: auto;
  overflow-x: hidden;

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  li {
    padding: 5px 10px;
    margin: 0;
    border: none;
    border-bottom: 1px solid #ccc;
  }
`;
const SongItem = styled.li`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const AlbumCover = styled.div`
  width: 45px;
  height: 45px;
  background-color: #ddd;
  margin-right: 10px;
`;

const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const SongTitle = styled.span`
  font-weight: bold;
  font-size: 0.8rem;
  text-align: left;
`;

const ArtistName = styled.span`
  font-size: 0.6rem;
  text-align: left;
  color: #555;
`;

const PlaylistItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const PlaylistCover = styled.div`
  width: 45px;
  height: 45px;
  background-color: #ddd;
  margin-right: 10px;
`;

const PlaylistInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PlaylistTitle = styled.span`
  font-weight: bold;
  font-size: 0.8rem;
  text-align: left;
`;

const PlayButton = styled.button`
  font-size: 0.9rem;
  background-color: #f9f9f9;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;
function PlaySongList({ playlist, setCurrentSong, setCurrentIndex }) {
  const [activeTab, setActiveTab] = useState("playlist");
  const mylistData = [
    { title: "플레이리스트 1" },
    { title: "플레이리스트 2" },
    { title: "플레이리스트 3" },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <SongListDiv>
      <TabMenu>
        <li
          className={activeTab === "playlist" ? "active" : ""}
          onClick={() => handleTabClick("playlist")}
        >
          재생목록
        </li>
        <li
          className={activeTab === "mylist" ? "active" : ""}
          onClick={() => handleTabClick("mylist")}
        >
          내 플레이리스트
        </li>
      </TabMenu>
      <TabContent>
        {activeTab === "playlist" && (
          <ul>
            {playlist.map((song, index) => (
              <SongItem
                key={index}
                onClick={() => {
                  setCurrentSong(song);
                  setCurrentIndex(index);
                }}
              >
                <AlbumCover>
                <img
                  src={song.image}
                  alt={song.track}
                  width="100%"
                  height="100%"
                />
                </AlbumCover>
                <SongInfo>
                  <SongTitle>{song.track}</SongTitle>
                  <ArtistName>{song.artist}</ArtistName>
                </SongInfo>
              </SongItem>
            ))}
          </ul>
        )}
        {activeTab === "mylist" && (
          <ul>
            {mylistData.map((playlist, index) => (
              <PlaylistItem key={index}>
                <PlaylistCover />
                <PlaylistInfo>
                  <PlaylistTitle>{playlist.title}</PlaylistTitle>
                </PlaylistInfo>
                <PlayButton>
                  <FaPlay />
                </PlayButton>
              </PlaylistItem>
            ))}
          </ul>
        )}
      </TabContent>
    </SongListDiv>
  );
}

export default PlaySongList;
