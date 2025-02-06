import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ActionButtons from "./ActionButtons";

const Wrapper = styled.div``;
const Container = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const TableHeader = styled.thead`
  background-color: #eee;
  font-weight: bold;
  font-size: 0.8rem;
  border-bottom: 2px solid #ddd;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const TableRow = styled.tr`
  border-bottom: 1px solid #f9f9f9;
`;
const TableData = styled.td`
  padding: 8px;
  text-align: center;
  font-size: 0.9rem;
  white-space: nowrap;
  @media (max-width: 556px) {
    font-size: 0.7rem;
  }
`;
const SongLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:hover {
    text-decoration: underline;
  }
`;
const SongInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const SongCover = styled.div`
  width: 50px;
  height: 50px;
  background-color: #ccc;
  border-radius: 5px;
`;
const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: left;
`;

function SongList({ showAll, headerTitle, songs = [] }) {
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [likedSongs, setLikedSongs] = useState({});

  const handleCheckboxChange = (id) => {
    setSelectedSongs((prev) => {
      const newSelected = prev.includes(id)
        ? prev.filter((songId) => songId !== id)
        : [...prev, id];
  
      setAllSelected(newSelected.length === songs.length);
      return newSelected;
    });
  };
  
  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedSongs([]);
    } else {
      setSelectedSongs(songs.map((song) => song.id));
    }
    setAllSelected(!allSelected);
  };
  
  const displayedSongs = showAll ? songs : songs.slice(0, 5);
  

  const handleToggleLike = (songId) => {
    console.log(`찜하기 버튼 클릭된 노래: ${songId}`);
    setLikedSongs((prev) => {
      const isLiked = prev[songId] ?? false; // 기존 값이 undefined이면 false 처리
      return {
        ...prev,
        [songId]: !isLiked, // 반대 값으로 업데이트
      };
    });
  };

  return (
    <Wrapper>
      <Container>
        <TableHeader>
          <TableRow>
            <TableData>
              <input
                type="checkbox"
                checked={allSelected}
                onChange={handleSelectAll}
              />
            </TableData>
            <TableData>{headerTitle}</TableData>
            <TableData>곡 정보</TableData>
            <TableData>앨범</TableData>
            <TableData>재생시간</TableData>
            <TableData>찜하기</TableData>
            <TableData>추가</TableData>
            <TableData>재생</TableData>
          </TableRow>
        </TableHeader>

        <tbody>
          {displayedSongs.map((song) => (
            <TableRow key={song.id}>
              <TableData>
                <input
                  type="checkbox"
                  checked={selectedSongs.includes(song.id)}
                  onChange={() => handleCheckboxChange(song.id)}
                />
              </TableData>
              <TableData>{song.number}</TableData>
              <TableData>
                <SongInfoContainer>
                  <SongCover>
                  <img
              src={song.image}
              alt={song.track}
              width="50"
              height="50"
              style={{ borderRadius: "5px" }}
            />
                  </SongCover>
                  <SongInfo>
                    <SongLink to={`/song/${song.id}`}>{song.track}</SongLink>
                    <SongLink to={`/artist/${song.artist}`}>
                      {song.artist}
                    </SongLink>
                  </SongInfo>
                </SongInfoContainer>
              </TableData>
              <TableData>
                <SongLink to={`/album/${song.album}`}>{song.album}</SongLink>
              </TableData>
              <TableData>{song.playTimeFormatted}</TableData>
              <TableData>
                <ActionButtons
                  songId={song.id}
                  type="like"
                  liked={!!likedSongs[song.id]}
                  onToggleLike={handleToggleLike}
                />
              </TableData>
              <TableData>
                <ActionButtons songId={song.id} type="add" />
              </TableData>
              <TableData>
                <ActionButtons songId={song.id} type="play" />
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </Container>
    </Wrapper>
  );
}

export default SongList;
