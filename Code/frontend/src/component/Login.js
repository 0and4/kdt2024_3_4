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
  weight: 100vw;
  background-color: #c69fda;
`;

const Logo = styled.img`
  width: 400px;
  margin-bottom: 35px;
  cursor: pointer;
`;

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

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  &:first-child {
    margin-top: 10px;
  }
`;

const Label = styled.label`
  font-size: 1rem;
  color: #333;
  text-align: center;
  width: 80px;
`;

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

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogoClick = () => {
    navigate("/"); //
  };

  const handleLogin = () => {
    // 🔹 실제 로그인 검증 (여기서는 예제용으로 간단한 하드코딩)
    const validUsername = "user123"; // 실제 DB가 있다면 이 값은 API 요청으로 확인
    const validPassword = "password123";

    if (username === validUsername && password === validPassword) {
      alert("로그인 성공");
      navigate("/"); // ✅ 메인 페이지로 이동
    } else {
      alert("로그인 실패: 아이디 또는 비밀번호가 올바르지 않습니다."); // 로그인 실패 알림
    }
  };

  return (
    <Wrapper>
      <Logo src={logo} alt="Berrecommend 로고" onClick={handleLogoClick} />{" "}
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
          <a href="/signup">회원가입하기</a>
        </TextLink>
        <TextLink>
          회원 정보를 잊으셨나요?
          <a onClick={() => navigate("/find-id")}>ID 찾기</a>
          {" / "}
          <a onClick={() => navigate("/find-pw")}>PW 찾기</a>
        </TextLink>
      </TextLinks>
    </Wrapper>
  );
}

export default Login;
