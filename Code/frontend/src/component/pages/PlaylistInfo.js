import styled from "styled-components";
import React from "react";
import { useParams } from "react-router-dom";
const Wrapper = styled.div`
  position: relative;
`;
const Container = styled.div`
  width: calc(100% - 250px);
  @media (max-width: 768px) {
    width: 100%;
  }
`;
function PlaylistInfo() {
  const { id } = useParams(); // URL에서 id 값을 가져옵니다.

  // 실제 데이터는 API나 상태 관리에서 가져오면 좋습니다.
  const playlistData = [
    { id: 1, title: "오늘 하루는 상쾌하게 시작해볼까?" },
    { id: 2, title: "오늘의 베스트 플레이리스트" },
    { id: 3, title: "그룹 운동으로 스트레스 풀기" },
    { id: 4, title: "힐링을 위한 클래식 음악" },
    { id: 5, title: "여름을 위한 파티 플레이리스트" },
    { id: 6, title: "하루를 마무리하는 잔잔한 음악" },
  ];

  const playlist = playlistData.find((item) => item.id === parseInt(id));

  return (
    <Wrapper>
      <Container>
        {playlist ? (
          <div>
            <h2>{playlist.title}</h2>
            <p>현재 플레이리스트 ID: {id}</p>
          </div>
        ) : (
          <p>Playlist not found</p>
        )}
      </Container>
    </Wrapper>
  );
}

export default PlaylistInfo;
