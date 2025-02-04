import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
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

// 로고 디자인
const Logo = styled.img`
  width: 250px;
  margin-bottom: 35px;
  cursor: pointer;
`;

// 로그인 박스 디자인
const LoginBox = styled.div`
  width: 380px;
  height: 200px;
  background-color: rgb(239, 224, 225);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

// 로그인 버튼 디자인
const InputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  &:first-child {
    margin-top: 10px;
  }
`;

// 아이디와 입력창 스타일
const Label = styled.label`
  font-size: 1rem;
  color: #333;
  text-align: center;
  width: 80px;
`;

// 입력창 스타일
const Input = styled.input`
  width: 230px;
  height: 40px;
  padding: 5px 10px;
  font-size: 1rem;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:focus {
    border-color: rgb(164, 131, 181);
    outline: none;
  }
`;

// 로그인 버튼 디자인
const Button = styled.button`
  width: 130px;
  height: 45px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: rgb(121, 16, 174);
  border: none;
  border-radius: 5px;
  maring-top: 10px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: rgb(95, 31, 137);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
`;

// '회원가입', 'ID 찾기' & 'PW 찾기' 문구 디자인
const TextLinks = styled.div`
  margin-top: 20px;
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

function Login() {
  const navigate = useNavigate(); // 페이지 이동 함수
  const [username, setUsername] = useState(""); // 아이디 입력값
  const [password, setPassword] = useState(""); // 비밀번호 입력값

  // 로고 클릭 시 메인 페이지로 이동
  const handleLogoClick = () => {
    navigate("/"); //
  };

  // 로그인 버튼 클릭 시 로그인 검증
  const handleLogin = () => {
    // 🔹 실제 로그인 검증 (여기서는 예제용으로 간단한 하드코딩)
    const validUsername = "user123"; // 실제 DB가 있다면 이 값은 API 요청으로 확인
    const validPassword = "password123!";

    if (username === validUsername && password === validPassword) {
      alert("로그인 성공. 환영합니다:)");
      navigate("/"); // 메인 페이지로 이동
    } else {
      alert("로그인 실패: 아이디 또는 비밀번호가 올바르지 않습니다."); // 로그인 실패 알림
    }
  };

  return (
    <Wrapper>
      <Header>
        <BackButton onClick={() => navigate(-1)}>{"<"}</BackButton>{" "}
        {/* 뒤로 가기 버튼 */}
        <Logo src={logo} alt="Berrecommend 로고" onClick={handleLogoClick} />
      </Header>
      <LoginBox>
        <InputGroup>
          <Label htmlFor="username">아이디</Label>
          <Input
            id="username"
            type="text"
            placeholder="아이디를 입력하세요"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
        <Button onClick={handleLogin}>로그인</Button>
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

export default Login;
