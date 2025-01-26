import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import logo from "../images/logo.png";
const Wrapper = styled.div`
  padding: 16px;
  width: 100%;
  border-bottom: 3px solid #dee2e6;
`;
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const LoginDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
  button {
    padding: 5px 16px;
    font-size: 0.9rem;
    background-color: #ffffff;
    border: 1px solid #ced4da;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: #495057;
      color: #ffffff;
    }
`;
const SearchDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  img:hover {
    cursor: pointer;
  }
  input {
    padding: 8px 50px 8px 36px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s;

    &::placeholder {
      font-size: 0.9rem;
    }
    &:focus {
      border-color: #495057;
    }
  }
  button {
    position: absolute;
    left: 200px; /* input의 왼쪽에 버튼 배치 */
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    svg {
      width: 16px;
      height: 16px;
      color: #495057;
    }
  }
`;
const MenuDiv = styled.div`
  display: flex;
  width: 60%;
  align-self: flex-end;
  gap: 10px;
  button {
    padding: 8px 25px;
    font-size: 1rem;
    font-weight: bold;
    border: 3px solid #ffffff;
    background-color: #ffffff;
    cursor: pointer;
    transition: border-bottom 0.2s, color 0.2s;

    &:hover {
      color: #68009b;
      border-bottom: 3px solid #c69fda;
    }
    &:active {
      color: #495057;
      border-bottom: 3px solid #68009b;
    }
  }
  button:last-child {
    margin-left: auto;
    margin-right: 3vw;
    font-size: 0.9rem;
  }
`;
function Header() {
  return (
    <Wrapper>
      <Container>
        <LoginDiv>
          <button>로그인</button>
        </LoginDiv>

        <SearchDiv>
          <img src={logo} alt="logo" />
          <button>
            <FaSearch />
          </button>
          <input placeholder="검색어를 입력하세요 !"></input>
        </SearchDiv>
        <MenuDiv>
          <button>차트</button>
          <button>추천</button>
          <button>마이페이지</button>
        </MenuDiv>
      </Container>
    </Wrapper>
  );
}
export default Header;
