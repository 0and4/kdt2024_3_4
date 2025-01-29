import styled from "styled-components";
import { AllBtn, BasketBtn, ShuffleBtn } from "../ui/Buttons";
import SongList from "../SongList";
const Wrapper = styled.div`
  width: 100%;
  position: relative;
  overflow-x: hidden;
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  div {
    margin-left: 10px;
  }
  max-width: 100%;
`;
const MenuDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 25px 2vw 10px 2vw;
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
    &:last-child {
      margin-left: auto;
    }
  }
`;
const ListenDiv = styled.div`
  display: flex;
  gap: 5px;
`;
const TodayP = styled.p`
  font-size: 1.5rem;
  margin-bottom: 0;
  span {
    font-weight: bold;
  }
`;
// 임의의 노래 목록
const songs = [
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
  {
    rank: 3,
    title: "Song C",
    artist: "Artist C",
    album: "Album C",
    duration: "3:30",
  },
  {
    rank: 4,
    title: "Song D",
    artist: "Artist D",
    album: "Album D",
    duration: "3:50",
  },
  {
    rank: 5,
    title: "Song E",
    artist: "Artist E",
    album: "Album E",
    duration: "4:10",
  },
  {
    rank: 6,
    title: "Song F",
    artist: "Artist F",
    album: "Album F",
    duration: "3:25",
  },
  {
    rank: 7,
    title: "Song G",
    artist: "Artist G",
    album: "Album G",
    duration: "3:15",
  },
  {
    rank: 8,
    title: "Song H",
    artist: "Artist H",
    album: "Album H",
    duration: "4:05",
  },
  {
    rank: 9,
    title: "Song I",
    artist: "Artist I",
    album: "Album I",
    duration: "3:40",
  },
  {
    rank: 10,
    title: "Song J",
    artist: "Artist J",
    album: "Album J",
    duration: "3:55",
  },
];
function TodayChart() {
  //날짜 동적 표시
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  return (
    <Wrapper>
      <Container>
        <TodayP>
          <span id="current_date">{getCurrentDate()}</span> TOP 100
        </TodayP>
        <MenuDiv>
          <ListenDiv>
            <AllBtn>전체 듣기</AllBtn>
            <ShuffleBtn>셔플 듣기</ShuffleBtn>
          </ListenDiv>

          <BasketBtn>담기</BasketBtn>
        </MenuDiv>
      </Container>
      <SongList showAll={100} headerTitle="순위" songs={songs} />
    </Wrapper>
  );
}
export default TodayChart;
