import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import TodayChart from "./pages/TodayChart";
import Recommend from "./pages/Recommend";
import PlaylistInfo from "./pages/PlaylistInfo";
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
  return (
    <Wrapper>
      <Container>
        <Routes>
          <Route path="/" element={<TodayChart />} />
          <Route path="/chart" element={<TodayChart />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/playlist/:id" element={<PlaylistInfo />} />
        </Routes>
      </Container>
    </Wrapper>
  );
}
export default Main;
