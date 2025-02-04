import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #c69fda;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  position: relative; /* 상대적 위치 */
  width: 50%;
  justify-content: center; /* 로고를 중앙 정렬 */
`;

// 뒤로 가기 버튼 스타일
const BackButton = styled.button`
  position: absolute;
  left: 150px; /* 화면 왼쪽 여백 */
  top: 20px; /* 화면 위쪽 여백 */
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0);
  border: 3px solid rgba(255, 255, 255, 0.36);
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.51);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: rgba(255, 255, 255, 0.18);
    color: rgba(126, 85, 176, 0.68);
  }
`;

/*로고 디자인*/
const Logo = styled.img`
  width: 250px;
  margin-bottom: 35px;
  cursor: pointer;
`;

/*로그인 박스 디자인*/
const LoginBox = styled.div`
  background-color: rgb(239, 224, 225);
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 380px;
  height: 200px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

/*로그인 버튼 디자인*/
const Button = styled.button`
  width: 300px;
  height: 50px;
  padding: 10px 0;
  margin: 0px auto;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  /*Google 로그인 버튼 디자인*/
  &:nth-child(1) {
    background-color: #fff;
    color: #757575;
    border: 1px solid #ddd;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:nth-child(1):hover {
    background-color: rgb(232, 232, 232);
  }

  /*회원 ID 로그인 버튼 디자인*/
  &:nth-child(2) {
    background-color: #fff;
    color: #757575;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:nth-child(2):hover {
    background-color: rgb(232, 232, 232);
  }
`;

// '회원가입', 'ID 찾기' & 'PW 찾기' 문구 디자인

const TextLinks = styled.div`
  margin-top: 5px;
  text-align: center;
`;
const TextLink = styled.p`
  margin-bottom: 0;
  font-size: 1.1em;
  color: rgb(57, 57, 57);

  a {
    margin-left: 5px;
    color: #68009b;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.1s;
    cursor: pointer;

    &:hover {
      color: rgb(231, 224, 236);
    }
  }
`;

const StyledButton = styled.button`
  margin-left: 5px;
  color: #68009b;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.1s;
  cursor: pointer;
  background: none;
  border: none;
  font-size: inherit;
  padding: 0;

  &:hover {
    color: rgb(231, 224, 236);
  }
`;

/*로그인 메뉴 컴포넌트*/
function LoginMenu() {
  const navigate = useNavigate(); // 페이지 이동 함수

  const handleIdLogin = () => {
    navigate("/login-id"); // 회원 ID 로그인 페이지로 이동
  };

  const handleLogoClick = () => {
    navigate("/"); // 로고 클릭 시 메인 페이지로 이동
  };

  return (
    <Wrapper>
      <Header>
        <BackButton onClick={() => navigate(-1)}>{"<"}</BackButton>{" "}
        {/* 뒤로 가기 버튼 */}
        <Logo src={logo} alt="Berrecommend 로고" onClick={handleLogoClick} />
      </Header>

      <LoginBox>
        <Button>Google로 로그인하기</Button>
        <Button onClick={handleIdLogin}>회원 ID로 로그인하기</Button>
      </LoginBox>
      <TextLinks>
        <TextLink>
          아직 회원이 아니신가요?
          <StyledButton onClick={() => navigate("/signup")}>
            회원가입하기
          </StyledButton>
        </TextLink>
        <TextLink>
          회원 정보를 잊으셨나요?
          <StyledButton onClick={() => navigate("/find-id")}>
            ID 찾기
          </StyledButton>
          {" / "}
          <StyledButton onClick={() => navigate("/find-pw")}>
            PW 찾기
          </StyledButton>
        </TextLink>
      </TextLinks>
    </Wrapper>
  );
}

export default LoginMenu;
