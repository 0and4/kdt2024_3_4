import React, { useState } from "react";
import styled from "styled-components";
import { FaPlay } from "react-icons/fa";

const SongListDiv = styled.div`
  flex: 3;
  overflow-y: auto;
  padding: 10px;
`;

const TabMenu = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  border-bottom: 2px solid #ccc;
  li {
    font-size: 0.7rem;
    flex: 1;
    text-align: center;
    padding: 10px;
    cursor: pointer;
    background-color: #f9f9f9;
    border-right: 1px solid #ccc;
    &:last-child {
      border-right: none;
    }
    &.active {
      background-color: #fff;
      font-weight: bold;
      border-bottom: 2px solid #007bff;
    }
  }
`;

const TabContent = styled.div`
  margin-top: 10px;
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  li {
    padding: 10px;
    margin: 0;
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
  width: 50px;
  height: 50px;
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
  font-size: 0.9rem;
  text-align: left;
`;

const ArtistName = styled.span`
  font-size: 0.8rem;
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
  width: 50px;
  height: 50px;
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
  font-size: 0.9rem;
  text-align: left;
`;

const PlayButton = styled.button`
  font-size: 0.9rem;
  background-color: #f9f9f9;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;
function PlaySongList() {
  const [activeTab, setActiveTab] = useState("playlist"); // 현재 활성화된 탭 상태

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
            <SongItem>
              <AlbumCover />
              <SongInfo>
                <SongTitle>노래 1</SongTitle>
                <ArtistName>가수 1</ArtistName>
              </SongInfo>
            </SongItem>
            <SongItem>
              <AlbumCover />
              <SongInfo>
                <SongTitle>노래 2</SongTitle>
                <ArtistName>가수 2</ArtistName>
              </SongInfo>
            </SongItem>
            <SongItem>
              <AlbumCover />
              <SongInfo>
                <SongTitle>노래 3</SongTitle>
                <ArtistName>가수 3</ArtistName>
              </SongInfo>
            </SongItem>
          </ul>
        )}
        {activeTab === "mylist" && (
          <ul>
            <PlaylistItem>
              <PlaylistCover />
              <PlaylistInfo>
                <PlaylistTitle>플레이리스트 1</PlaylistTitle>
              </PlaylistInfo>
              <PlayButton>
                <FaPlay />
              </PlayButton>
            </PlaylistItem>
            <PlaylistItem>
              <PlaylistCover />
              <PlaylistInfo>
                <PlaylistTitle>플레이리스트 2</PlaylistTitle>
              </PlaylistInfo>
              <PlayButton>
                <FaPlay />
              </PlayButton>
            </PlaylistItem>
            <PlaylistItem>
              <PlaylistCover />
              <PlaylistInfo>
                <PlaylistTitle>플레이리스트 3</PlaylistTitle>
              </PlaylistInfo>
              <PlayButton>
                <FaPlay />
              </PlayButton>
            </PlaylistItem>
          </ul>
        )}
      </TabContent>
    </SongListDiv>
  );
}

export default PlaySongList;
