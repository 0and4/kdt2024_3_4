import styled from "styled-components";
import Header from "./header";
import SongList from "./SongList";
import { AllBtn, BasketBtn, ShuffleBtn } from "./ui/Buttons";
const Wrapper = styled.div`
  width: 100%;
`;
const MenuDiv = styled.div`
  display: flex;
  align-self: flex-end;
  gap: 10px;
  margin: 0 3vw 10px 3vw;
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
  font-size: 1.8rem;
  margin-bottom: 0;
  span {
    font-weight: bold;
  }
`;
function Main() {
  return (
    <Wrapper>
      <Header />
      <TodayP>
        <span>2025.01.17</span> TOP 100
      </TodayP>
      <MenuDiv>
        <AllBtn>전체 듣기</AllBtn>
        <ShuffleBtn>셔플 듣기</ShuffleBtn>
        <BasketBtn>담기</BasketBtn>
      </MenuDiv>
      <SongList></SongList>
    </Wrapper>
  );
}
export default Main;
