import React from "react";
import { Routes, Route } from "react-router-dom";
import TodayChart from "./pages/TodayChart";
import Recommend from "./pages/Recommend";
import PlaylistInfo from "./pages/PlaylistInfo";
import MyPage from "./pages/MyPage";
import { Wrapper, Container } from "./ui/AllDiv";

function Main() {
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
