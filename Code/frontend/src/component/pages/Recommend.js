import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
const Wrapper = styled.div`
  width: 100%;
  position: relative;
  overflow-x: hidden;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  div {
    margin-left: 10px;
  }
  max-width: 100%;
`;

const PlaylistDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  overflow-x: hidden;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
`;

const PlaylistItem = styled.div`
  display: flex;
  flex-direction: row;
  text-align: left;
  padding: 15px 0;
  gap: 15px;
  align-items: center;
  box-sizing: border-box;
  p {
    font-weight: bold;
    font-size: 0.9rem;
    cursor: pointer;
    color: black;
    text-decoration: none;
    &:hover {
      color: #68009b;
      text-decoration: underline;
    }
  }
`;

const PlaylistJacket = styled.div`
  width: 60px;
  height: 60px;
  background-color: yellow;
  object-fit: cover;
  cursor: pointer;
`;

const Divider = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  background-color: #ccc;
`;

function Recommend() {
  const playlistData = [
    { id: 1, title: "오늘 하루는 상쾌하게 시작해볼까?" },
    { id: 2, title: "오늘의 베스트 플레이리스트" },
    { id: 3, title: "그룹 운동으로 스트레스 풀기" },
    { id: 4, title: "힐링을 위한 클래식 음악" },
    { id: 5, title: "여름을 위한 파티 플레이리스트" },
    { id: 6, title: "하루를 마무리하는 잔잔한 음악" },
  ];

  return (
    <Wrapper>
      <Container>
        <PlaylistDiv>
          <Divider />
          {playlistData.map((playlist) => (
            <StyledLink key={playlist.id} to={`/playlist/${playlist.id}`}>
              <PlaylistItem>
                <PlaylistJacket />
                <p>{playlist.title}</p>
              </PlaylistItem>
            </StyledLink>
          ))}
        </PlaylistDiv>
      </Container>
    </Wrapper>
  );
}

export default Recommend;
