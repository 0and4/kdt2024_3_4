import styled from "styled-components";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SongList from "../SongList";
import { KeepBtn, BackBtn } from "../ui/Buttons";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import {
  Wrapper as plWrapper,
  Container as plContainer,
  BackWrapper as plBackWrapper,
} from "../ui/AllDiv";
import RecMenuDiv from "../ui/MenuDiv";
const Wrapper = styled(plWrapper)`
  width: 100%;
  padding: 0;
`;
const Container = styled(plContainer)`
  width: 100%;
  padding: 0;
`;
const BackWrapper = styled(plBackWrapper)`
  right: 20px;
  top: 20px;
  @media (min-width: 769px) {
    right: 0;
  }
`;
const InfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
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
function PlaylistInfo() {
  const { id } = useParams(); // URL에서 id 값 가져오기
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  // 실제 데이터는 API나 상태 관리에서 가져오기
  const playlistData = [
    {
      id: 1,
      title: "오늘 하루는 상쾌하게 시작해볼까?",
      image: "",
      songs: [
        {
          rank: 1,
          title: "Song A",
          artist: "Artist A",
          album: "Album A",
          duration: "3:45",
        },
        {
          rank: 2,
          title: "Song B",
          artist: "Artist B",
          album: "Album B",
          duration: "4:00",
        },
      ],
    },
    {
      id: 2,
      title: "오늘의 베스트 플레이리스트",
      image: "",
      songs: [
        {
          rank: 1,
          title: "Song C",
          artist: "Artist C",
          album: "Album C",
          duration: "3:30",
        },
        {
          rank: 2,
          title: "Song D",
          artist: "Artist D",
          album: "Album D",
          duration: "3:50",
        },
      ],
    },
    {
      id: 3,
      title: "그룹 운동으로 스트레스 풀기",
      image: "",
      songs: [
        {
          rank: 1,
          title: "Song E",
          artist: "Artist E",
          album: "Album E",
          duration: "4:10",
        },
        {
          rank: 2,
          title: "Song F",
          artist: "Artist F",
          album: "Album F",
          duration: "3:25",
        },
      ],
    },
    { id: 4, title: "힐링을 위한 클래식 음악", image: "", songs: [] },
    {
      id: 5,
      title: "여름을 위한 파티 플레이리스트",
      image: "",
      songs: [
        {
          rank: 1,
          title: "Song G",
          artist: "Artist G",
          album: "Album G",
          duration: "3:15",
        },
      ],
    },
    { id: 6, title: "하루를 마무리하는 잔잔한 음악", image: "", songs: [] },
  ];

  const playlist = playlistData.find((item) => item.id === parseInt(id));

  return (
    <Wrapper>
      <Container>
        <BackWrapper>
          <BackBtn onClick={() => navigate("/recommend")}>
            <RiArrowGoBackFill /> 이전으로
          </BackBtn>
        </BackWrapper>
        {playlist ? (
          <>
            <ControlDiv>
              <InfoDiv>
                <PlaylistJacket>{playlist.image}</PlaylistJacket>
                <div style={{ width: "100%" }}>
                  <ListTitle>{playlist.title}</ListTitle>
                  <RecMenuDiv
                    extraButton={
                      <KeepBtn
                        $isBookmarked={isBookmarked}
                        onClick={toggleBookmark}
                      >
                        {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                      </KeepBtn>
                    }
                  />
                </div>
              </InfoDiv>
            </ControlDiv>

            <SongList showAll={50} headerTitle="번호" songs={playlist.songs} />
          </>
        ) : (
          <p>Playlist not found</p>
        )}
      </Container>
    </Wrapper>
  );
}

export default PlaylistInfo;
