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
  justify-content: space-evenly; /* 내부 요소 간 간격 균등 */
`;

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

  &:nth-child(1) {
    background-color: #fff;
    color: #757575;
    border: 1px solid #ddd;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 기본 그림자 효과 */
  }

  &:nth-child(1):hover {
    background-color: rgb(232, 232, 232);
  }

  &:nth-child(2) {
    background-color: #fff;
    color: #757575;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 기본 그림자 효과 */
  }

  &:nth-child(2):hover {
    background-color: rgb(232, 232, 232);
  }
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

function LoginMenu() {
  return (
    <Wrapper>
      <Logo src={logo} alt="Berrecommend 로고" />
      <LoginBox>
        <Button>Google로 로그인하기</Button>
        <Button>회원 ID로 로그인하기</Button>
      </LoginBox>
      <TextLink>
        아직 회원이 아니신가요?
        <a href="/signup">회원가입하기</a>
      </TextLink>
      <TextLink>
        회원 정보를 잊으셨나요?
        <a href="/find">ID/PW 찾기</a>
      </TextLink>
    </Wrapper>
  );
}

export default LoginMenu;
