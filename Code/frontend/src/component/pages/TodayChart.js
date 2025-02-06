import styled from "styled-components";
import SongList from "../ui/SongList";
import { Wrapper } from "../ui/AllDiv";
import RecMenuDiv from "../ui/MenuDiv";
import React, { useEffect, useState } from 'react';


const Container = styled.div``;
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
    const hours = String(date.getHours()).padStart(2, "0"); // 24시간제 시간
    return `${year}.${month}.${day} ${hours}`;
  };

  // 현재 시간 표시를 위한 상태
  const [currentDateTime, setCurrentDateTime] = useState(getCurrentDate());

  useEffect(() => {
    // 1초마다 시간을 갱신
    const interval = setInterval(() => {
      setCurrentDateTime(getCurrentDate());
    }, 1000);

    // 정시마다 5분 뒤에 페이지 새로 고침
    const refreshInterval = setInterval(() => {
      const currentMinute = new Date().getMinutes();
      const currentSecond = new Date().getSeconds();

      // 정시에 5분 뒤에 새로 고침
      if (currentMinute === 0 && currentSecond === 0) {
        setTimeout(() => {
          window.location.reload(); // 5분 뒤 페이지 새로 고침
        }, 5 * 60 * 1000); // 5분 후
      }
    }, 1000); // 1초마다 체크

    // 클린업: 컴포넌트가 언마운트되면 인터벌 정리
    return () => {
      clearInterval(interval);
      clearInterval(refreshInterval);
    };
  }, []);

  return (
    <Wrapper>
      <Container>
        <TodayP>
          <span id="current_date">{currentDateTime}시 기준</span> TOP 100
        </TodayP>
        <RecMenuDiv />
      </Container>
      <SongList showAll={100} headerTitle="순위" songs={songs} />
    </Wrapper>
  );
}
export default TodayChart;
