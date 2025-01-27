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
function TodayChart() {
  return (
    <Wrapper>
      <Container>
        <TodayP>
          <span>2025.01.17</span> TOP 100
        </TodayP>
        <MenuDiv>
          <AllBtn>전체 듣기</AllBtn>
          <ShuffleBtn>셔플 듣기</ShuffleBtn>
          <BasketBtn>담기</BasketBtn>
        </MenuDiv>
        <SongList />
      </Container>
    </Wrapper>
  );
}
export default TodayChart;
