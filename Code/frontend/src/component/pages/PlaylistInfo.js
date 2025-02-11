import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import SongList from "../ui/SongList";
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
const PlaylistJacket = styled.img`
  width: 100px;
  height: 100px;
  background-color: #ccc;
  object-fit: cover;
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

function PlaylistInfo({ onPlay }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  useEffect(() => {
    async function fetchPlaylist() {
      const token = sessionStorage.getItem("access_token");
      try {
        const response = await fetch(`http://localhost:8080/playList/recommend/detail?id=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch playlist");
        const data = await response.json();
        const firstSongImage = data.dataList[0].image;
        const playlistData = {
          title: state?.playlistTitle || `추천 플레이리스트 ${id}`, // 제목을 `id`를 기준으로 예시로 설정
          image: firstSongImage, // 기본 이미지 또는 첫 번째 앨범 이미지로 설정
          songs: data.dataList, // 노래 목록은 응답에서 받은 `dataList`로 설정
        };
        setPlaylist(playlistData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPlaylist();
  }, [id, state]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!playlist) return <p>Playlist not found</p>;
  if (!playlist || !playlist.songs || playlist.songs.length === 0) return <p>No songs available in this playlist</p>;
  
  

  return (
    <Wrapper>
      <Container>
        <BackWrapper>
          <BackBtn onClick={() => navigate("/recommend")}>
            <RiArrowGoBackFill /> 이전으로
          </BackBtn>
        </BackWrapper>
        {playlist && (
          <>
            <ControlDiv>
              <InfoDiv>
              <PlaylistJacket src={playlist.image || "/default-thumbnail.jpg"} alt="Playlist Cover" />
                <div style={{ width: "100%" }}>
                  <ListTitle>{playlist.title.replace(/\\/g, "")}</ListTitle>
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

            <SongList showAll={50} headerTitle="번호" songs={playlist.songs} onPlay={onPlay} />
          </>
        )}
      </Container>
    </Wrapper>
  );
}

export default PlaylistInfo;
