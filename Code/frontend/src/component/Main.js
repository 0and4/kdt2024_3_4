import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import TodayChart from "./pages/TodayChart";
import Recommend from "./pages/Recommend";
const Wrapper = styled.div`
  position: relative;
`;
const Container = styled.div`
  width: calc(100% - 250px);
  @media (max-width: 768px) {
    width: 100%;
  }
`;

function Main({ activeMenu }) {
  return (
    <Wrapper>
      <Container>
        {activeMenu === "chart" && <TodayChart />}
        {activeMenu === "recommend" && <Recommend />}
        <Outlet />
      </Container>
    </Wrapper>
  );
}
export default Main;
