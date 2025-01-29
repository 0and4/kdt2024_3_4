import styled from "styled-components";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SongList from "../SongList";
import { AllBtn, BasketBtn, KeepBtn, ShuffleBtn, BackBtn } from "../ui/Buttons";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
const Wrapper = styled.div`
  position: relative;
`;
const Container = styled.div`
  width: 100%;
`;
const InfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px;
`;
const PlaylistJacket = styled.div`
  width: 100px;
  height: 100px;
  background-color: #ccc;
`;
const ListTitle = styled.p`
  text-align: left;
  font-size: large;
  font-weight: bold;
  margin: 10px 20px;
`;
const ControlDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const MenuDiv = styled.div`
  display: flex;
  align-self: flex-end;
  gap: 10px;
  margin: 10px 20px;
  button {
    padding: 6px 10px;
    font-size: 0.9rem;
    border: 1px solid #dadada;
    background-color: #ffffff;
    cursor: pointer;
    transition: border-bottom 0.3s, color 0.2s;

    &:hover {
      background-color: #c69fda;
      color: #fafafa;
    }
    &:active {
      color: #495057;
    }
    &:nth-child(3) {
      background-color: initial;
      color: initial;
    }
  }
`;
const BackWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
`;
function PlaylistInfo() {
  const { id } = useParams(); // URL에서 id 값 가져오기
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  // 실제 데이터는 API나 상태 관리에서 가져오기
  const playlistData = [
    { id: 1, title: "오늘 하루는 상쾌하게 시작해볼까?", image: "" },
    { id: 2, title: "오늘의 베스트 플레이리스트", image: "" },
    { id: 3, title: "그룹 운동으로 스트레스 풀기", image: "" },
    { id: 4, title: "힐링을 위한 클래식 음악", image: "" },
    { id: 5, title: "여름을 위한 파티 플레이리스트", image: "" },
    { id: 6, title: "하루를 마무리하는 잔잔한 음악", image: "" },
  ];

  const playlist = playlistData.find((item) => item.id === parseInt(id));

  return (
    <Wrapper>
      <Container>
        {playlist ? (
          <>
            <InfoDiv>
              <PlaylistJacket>{playlist.image}</PlaylistJacket>
              <ControlDiv>
                <div>
                  <ListTitle>{playlist.title}</ListTitle>
                  <MenuDiv>
                    <AllBtn>전체 듣기</AllBtn>
                    <ShuffleBtn>셔플 듣기</ShuffleBtn>
                    <KeepBtn
                      isBookmarked={isBookmarked}
                      onClick={toggleBookmark}
                    >
                      {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                    </KeepBtn>
                  </MenuDiv>
                </div>
                <BackWrapper>
                  <BackBtn onClick={() => navigate("/recommend")}>
                    <RiArrowGoBackFill /> 이전으로
                  </BackBtn>
                  <BasketBtn>담기</BasketBtn>
                </BackWrapper>
              </ControlDiv>
            </InfoDiv>
            <SongList />
          </>
        ) : (
          <p>Playlist not found</p>
        )}
      </Container>
    </Wrapper>
  );
}

export default PlaylistInfo;
