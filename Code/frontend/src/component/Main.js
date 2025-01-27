import React, { useState } from "react";
import styled from "styled-components";
import Header from "./header";
import SongList from "./SongList";
import { AllBtn, BasketBtn, ShuffleBtn } from "./ui/Buttons";
import Player from "./Player";
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  overflow-x: auto;
  @media (max-width: 768px) {
    flex-direction: column; /* 화면이 좁을 때 세로로 변경 */
  }
`;
const Container = styled.div`
  width: calc(100% - 250px);
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const MenuDiv = styled.div`
  display: flex;
  align-self: flex-end;
  gap: 10px;
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
const TodayP = styled.p`
  font-size: 1.5rem;
  margin-bottom: 0;
  span {
    font-weight: bold;
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
        <Header activeMenu={activeMenu} onMenuClick={handleMenuClick} />
        <div>
          {/* activeMenu에 따라 렌더링될 내용 */}
          {activeMenu === "chart" && (
            <>
              <TodayP>
                <span>2025.01.17</span> TOP 100
              </TodayP>
              <MenuDiv>
                <AllBtn>전체 듣기</AllBtn>
                <ShuffleBtn>셔플 듣기</ShuffleBtn>
                <BasketBtn>담기</BasketBtn>
              </MenuDiv>
              <SongList />
            </>
          )}
          {/* 다른 메뉴에 따라 다른 내용을 표시하려면 여기에 추가 가능 */}
        </div>
      </Container>
      <Player />
    </Wrapper>
  );
}
export default Main;
