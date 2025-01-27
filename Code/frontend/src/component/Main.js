import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import TodayChart from "./pages/TodayChart";
import Recommend from "./pages/Recommend";
import PlaylistInfo from "./pages/PlaylistInfo";
import MyPage from "./pages/MyPage";
const Wrapper = styled.div`
  position: relative;
`;
const Container = styled.div`
  width: calc(100% - 250px);
  @media (max-width: 768px) {
    width: 100%;
  }
`;

function Main() {
  const [activeMenu, setActiveMenu] = useState("chart");

  const handleMenuClick = (menu) => {
    if (activeMenu === menu) {
      setActiveMenu(""); // active 상태 해제
    } else {
      setActiveMenu(menu); // 다른 메뉴 클릭 시 active 상태 설정
    }
  };
  return (
    <Wrapper>
      <Container>
        <Routes>
          <Route path="/" element={<TodayChart />} />
          <Route path="/chart" element={<TodayChart />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/playlist/:id" element={<PlaylistInfo />} />
          <Route path="/myPage" element={<MyPage />} />
        </Routes>
      </Container>
    </Wrapper>
  );
}
export default Main;
