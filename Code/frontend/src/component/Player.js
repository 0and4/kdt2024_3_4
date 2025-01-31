import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { FaShuffle, FaRepeat } from "react-icons/fa6";
import { CgPlayTrackPrevO, CgPlayTrackNextO } from "react-icons/cg";
import { FaRegPlayCircle, FaRegPauseCircle } from "react-icons/fa";
import PlaySongList from "./ui/PlaySongList";

const Wrapper = styled.div`
  position: fixed;
  right: 0;
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 100vh;
  border-left: 3px solid #ccc;
  background-color: #fff;

  /* 화면 크기가 작을 때 Wrapper는 화면 크기에 맞게 크기 조정 */
  @media (max-width: 768px) {
    width: 100%;
    height: 100vh; /* 화면 크기에 맞춰 높이를 조정 */
    display: none;
  }
`;

const Container = styled.div`
  justify-content: flex-end;
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

const CompactPlayerWrapper = styled.div`
  display: ${({ $isExpanded }) => ($isExpanded ? "none" : "flex")};
  justify-content: center;
  background-color: #fff;
  border-top: 2px solid #ccc;
  position: fixed;
  bottom: 70px;
  width: 100%;
  z-index: 9999;

  @media (min-width: 769px) {
    display: none !important;
  }
`;
const CompactPlayer = styled.div`
  flex-direction: row;
  padding: 10px;
  background-color: #fff;
  cursor: pointer;
  text-align: center;
  border-top: 2px solid #ccc;

  p {
    margin: 0;
    text-align: left;
  }
  button {
    font-size: 3rem;
    margin-left: auto;
    margin-right: 15px;
  }
  @media (max-width: 768px) {
    position: fixed;
    width: 100%;
    display: flex !important;
    flex-direction: row;
  }
`;
const CompactAlbumJacket = styled.div`
  width: 50px;
  height: 50px;
  background-color: #ccc;
  margin: 0 10px;
`;
function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
    };

    // 초기 크기 설정
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const togglePlayerView = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      {isExpanded && (
        <Wrapper>
          {/* 전체 플레이어 */}
          <Container>
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
          </Container>
        </Wrapper>
      )}

      {!isExpanded && (
        <CompactPlayerWrapper $isExpanded={isExpanded}>
          <CompactPlayer
            onClick={(e) => {
              // CompactPlayer 자체 클릭 시 아무 동작도 하지 않음
              e.stopPropagation();
            }}
          >
            <CompactAlbumJacket />
            <div>
              <SongTitleP>Song Title</SongTitleP>
              <ArtistP>artist name</ArtistP>
            </div>
            <PlaySettingBtn
              onClick={(e) => {
                e.stopPropagation(); // 부모 클릭 이벤트 방지
                togglePlay(); // 재생/일시정지 상태 변경
              }}
            >
              {isPlaying ? <FaRegPauseCircle /> : <FaRegPlayCircle />}
            </PlaySettingBtn>
          </CompactPlayer>

          {/* Wrapper 클릭 시만 확장/축소 */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            onClick={togglePlayerView}
          />
        </CompactPlayerWrapper>
      )}
    </>
  );
}

export default Player;
