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
const initialSongs = [
  {
    rank: 1,
    title: "Song A",
    artist: "Artist A",
    album: "Album A",
    duration: "3:45",
  }
];
function TodayChart() {
  //날짜 동적 표시
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0"); // 24시간제 시간
    const minutes = String(date.getMinutes()).padStart(2, "0"); // 분 추가
    const seconds = String(date.getSeconds()).padStart(2, "0"); // 초 추가
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // 현재 시간 표시를 위한 상태
  const [currentDateTime, setCurrentDateTime] = useState(getCurrentDate());
  const [songs, setSongs] = useState(initialSongs);

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

    const fetchSongs = async () => {
      const currentDate = getCurrentDate(); // 현재 시간 가져오기
      try {
        const response = await fetch(`http://localhost:8080/search/chart?dateTime=${encodeURIComponent(currentDate)}`, {
          method: 'GET', // GET 요청에서는 body 사용 불가
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        
        setSongs(data.songs); // 서버에서 받은 songs 배열로 업데이트
        console.log(JSON.stringify(data, null, 2));
        console.log(data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };
    
    fetchSongs(); // 컴포넌트가 처음 렌더링될 때 서버로 요청

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
