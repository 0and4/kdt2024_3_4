import React from "react";
import styled from "styled-components";
import logo from "../images/logo.png"; // 로고 이미지 경로

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #c69fda;
`;

const Logo = styled.img`
  width: 400px;
  margin-bottom: 35px;
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
    margin-top: 10px; /* 아이디 입력란 위쪽 공간 추가 */
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
    transition: color 0.3s;

    &:hover {
      color: rgb(95, 31, 137);
    }
  }
`;

function Login() {
  return (
    <Wrapper>
      <Logo src={logo} alt="Berrecommend 로고" />
      <LoginBox>
        <InputGroup>
          <Label htmlFor="username">아이디</Label>
          <Input id="username" type="text" placeholder="아이디를 입력하세요" />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
          />
        </InputGroup>
        <Button>로그인</Button>
      </LoginBox>
      <TextLinks>
        <TextLink>
          아직 회원이 아니신가요?
          <a href="/signup">회원가입하기</a>
        </TextLink>
        <TextLink>
          회원 정보를 잊으셨나요?
          <a href="/find">ID/PW 찾기</a>
        </TextLink>
      </TextLinks>
    </Wrapper>
  );
}

export default Login;
