import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ActionButtons from "./ui/ActionButtons";

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

  const handleCheckboxChange = (rank) => {
    setSelectedSongs((prev) => {
      const newSelected = prev.includes(rank)
        ? prev.filter((id) => id !== rank)
        : [...prev, rank];

      setAllSelected(newSelected.length === songs.length);
      return newSelected;
    });
  };
  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedSongs([]);
    } else {
      setSelectedSongs(songs.map((song) => song.rank));
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
            <TableRow key={song.rank || `${song.title}-${song.artist}`}>
              <TableData>
                <input
                  type="checkbox"
                  checked={selectedSongs.includes(song.rank)}
                  onChange={() => handleCheckboxChange(song.rank)}
                />
              </TableData>
              <TableData>{song.rank}</TableData>
              <TableData>
                <SongInfoContainer>
                  <SongCover />
                  <SongInfo>
                    <SongLink to={`/song/${song.rank}`}>{song.title}</SongLink>
                    <SongLink to={`/artist/${song.artist}`}>
                      {song.artist}
                    </SongLink>
                  </SongInfo>
                </SongInfoContainer>
              </TableData>
              <TableData>
                <SongLink to={`/album/${song.album}`}>{song.album}</SongLink>
              </TableData>
              <TableData>{song.duration}</TableData>
              <TableData>
                <ActionButtons
                  songId={song.rank}
                  type="like"
                  liked={!!likedSongs[song.rank]}
                  onToggleLike={handleToggleLike}
                />
              </TableData>
              <TableData>
                <ActionButtons songId={song.rank} type="add" />
              </TableData>
              <TableData>
                <ActionButtons songId={song.rank} type="play" />
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </Container>
    </Wrapper>
  );
}

export default SongList;
