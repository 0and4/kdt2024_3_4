import React from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { BackBtn } from "../ui/Buttons";
import { FaChevronRight } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import {
  Wrapper,
  Container,
  BackWrapper,
  InfoDiv as songinfo,
} from "../ui/AllDiv";
import ActionButtons from "../ui/ActionButtons";

const SongInfoDiv = styled(songinfo)`
  padding-bottom: 30px;
  border-bottom: 1px solid #ccc;
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

  const navigate = useNavigate();

  // 임의의 음악 정보
  const albumName = "Album 1";
  const artistName = "Artist A";
  const albumLink = `/album/${albumName}`;
  const artistLink = `/artist/${artistName}`;

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };
  return (
    <Wrapper>
      <Container>
        <SongInfoDiv>
          <BackWrapper>
            <BackBtn onClick={handleBackClick}>
              <RiArrowGoBackFill /> 이전으로
            </BackBtn>
          </BackWrapper>
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
              <ActionButtons />
            </div>
          </ControlDiv>
        </SongInfoDiv>

        <LiricDiv>
          <TitleP>가사</TitleP>
          {paragraphs}
        </LiricDiv>
      </Container>
    </Wrapper>
  );
}
export default SongInfo;
