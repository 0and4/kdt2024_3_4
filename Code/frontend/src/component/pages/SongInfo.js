import React, { useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate, Link } from "react-router-dom";
import AddPopup from "../ui/AddPopup";
import { BackBtn } from "../ui/Buttons";
import { FaChevronRight } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import {
  LiaHeart,
  LiaHeartSolid,
  LiaPlusSolid,
  LiaPlaySolid,
} from "react-icons/lia";
const Wrapper = styled.div`
  position: relative;
`;
const Container = styled.div`
  padding: 20px;
  width: calc(100% - 250px);
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const SongInfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: left;
  gap: 15px;
  padding: 30px 0;
  border-bottom: 1px solid #ccc;
  img {
    width: 150px;
    height: 150px;
    border-radius: 8px;
    object-fit: cover;
    background-color: #ccc;
  }
  p {
    margin: 5px;
  }
`;
const ControlDiv = styled.div`
  display: flex;
  width: calc(100% - 200px);
  @media (max-width: 768px) {
    width: calc(100% - 200px);
  }
  flex-direction: row;
  justify-content: space-between;
`;
const Actions = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
  gap: 5px;
`;
const Button = styled.button`
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #717171;
  background-color: #f9f9f9;
  border-radius: 50%;
  cursor: pointer;
  color: #717171;

  &:hover,
  &:active {
    color: #e41111;
    border-color: #e41111;
  }
  &:first-child:hover,
  &:first-child:active {
    color: #e41111;
    border-color: #e41111;
  }
`;
const LiricDiv = styled.div`
  text-align: left;
  margin: 20px 10px;
  p {
    margin: 5px 0;
  }
  .paragraph {
    margin: 20px 0;
  }
`;
const TitleP = styled.p`
  font-weight: bold;
`;
const BackWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
function SongInfo() {
  //임의의 가사
  const lyrics = `
    Lorem ipsum dolor sit amet
    consectetur adipiscing elit
    Integer nec odio
    Praesent libero
    Sed cursus ante dapibus diam
    Sed nisi
    Nulla quis sem at nibh elementum imperdiet

    Lorem ipsum dolor sit amet
    consectetur adipiscing elit
    Integer nec odio
    Praesent libero
    Sed cursus ante dapibus diam
    Sed nisi
    Nulla quis sem at nibh elementum imperdiet

    Lorem ipsum dolor sit amet
    consectetur adipiscing elit
    Integer nec odio
    Praesent libero
    Sed cursus ante dapibus diam
    Sed nisi
    Nulla quis sem at nibh elementum imperdiet
  `;
  const paragraphs = lyrics
    .trim()
    .split("\n\n")
    .map((paragraph, index) => {
      const lines = paragraph
        .split("\n")
        .map((line, idx) => <p key={idx}>{line.trim()}</p>);
      return (
        <div key={index} className="paragraph">
          {lines}
        </div>
      );
    });

  const { songId } = useParams();
  const navigate = useNavigate();

  const [likedSongs, setLikedSongs] = useState([]);
  const [showLikePopup, setShowLikePopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState(null);

  // 임의의 음악 정보
  const albumName = "Album 1";
  const artistName = "Artist A";
  const albumLink = `/album/${albumName}`;
  const artistLink = `/artist/${artistName}`;

  const toggleLike = () => {
    setLikedSongs((prev) => {
      const isLiked = prev.includes(songId);

      if (!isLiked) {
        setShowLikePopup(true);
        setTimeout(() => setShowLikePopup(false), 2000);
      }

      return isLiked ? prev.filter((id) => id !== songId) : [...prev, songId];
    });
  };

  const handleAddClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    setPopupPosition({
      top: rect.top + window.scrollY - 300,
      left: rect.left + window.scrollX - 200,
    });
  };

  const closePopup = () => setPopupPosition(null);

  const handlePlay = () => {
    console.log("재생 버튼 클릭됨", songId);
    // 여기에 실제 노래 재생 로직 추가
  };
  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };
  return (
    <Wrapper>
      {/* 팝업 위치가 설정되었을 때 AddPopup 컴포넌트 렌더링 */}
      {popupPosition && (
        <AddPopup
          position={popupPosition}
          onClose={closePopup}
          //playlists={/* 전달할 플레이리스트 배열 */}
        />
      )}
      <Container>
        <SongInfoDiv>
          <img src={""} alt={"albumImage"} />
          <ControlDiv>
            <div>
              <TitleP>
                <Link
                  to={albumLink}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {albumName} <FaChevronRight />
                </Link>
              </TitleP>
              <p>Song 1</p>
              <p>
                <Link
                  to={artistLink}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {artistName} <FaChevronRight />
                </Link>
              </p>
              <Actions>
                {/* 좋아요 버튼 */}
                <Button onClick={toggleLike}>
                  {likedSongs.includes(songId) ? (
                    <LiaHeartSolid />
                  ) : (
                    <LiaHeart />
                  )}
                </Button>
                {/* 추가 버튼 */}
                <Button onClick={handleAddClick}>
                  <LiaPlusSolid />
                </Button>
                {/* 재생 버튼 */}
                <Button onClick={handlePlay}>
                  <LiaPlaySolid />
                </Button>
              </Actions>
            </div>
            <BackWrapper>
              <BackBtn onClick={handleBackClick}>
                <RiArrowGoBackFill /> 이전으로
              </BackBtn>
            </BackWrapper>
          </ControlDiv>
        </SongInfoDiv>

        <LiricDiv>
          <TitleP>가사</TitleP>
          {paragraphs}
        </LiricDiv>
      </Container>
      {/* 좋아요 팝업 */}
      {showLikePopup && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "black",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            fontSize: "1rem",
            opacity: 1,
            transition: "opacity 0.5s ease-in-out",
            visibility: "visible",
          }}
        >
          내가 좋아하는 노래로 저장했어요!
        </div>
      )}
    </Wrapper>
  );
}
export default SongInfo;
