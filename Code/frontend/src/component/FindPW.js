import React, { useState } from "react";
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

const FindBox = styled.div`
  width: 600px;
  background-color: rgb(239, 224, 225);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

/* 아이디와 입력창 스타일 */
const IdInputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  width: 100%;
  margin-left: 150px; /* 아이디 입력창만 왼쪽으로 이동 */
`;

const IdLabel = styled.label`
  font-size: 1rem;
  color: #333;
  text-align: right;
  width: 80px;
`;

const IdInput = styled.input`
  width: 230px;
  height: 40px;
  padding: 5px 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:focus {
    border-color: rgb(164, 131, 181);
    outline: none;
  }
`;

/* 나머지 입력창 스타일 */
const InputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #333;
  text-align: right;
  width: 90px;
`;

const Input = styled.input`
  width: 230px;
  height: 40px;
  padding: 5px 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:focus {
    border-color: rgb(164, 131, 181);
    outline: none;
  }
`;

const SmallButton = styled.button`
  height: 35px;
  width: 90px;
  padding: 0 10px;
  font-size: 0.9rem;
  color: white;
  background-color: #68009b;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #9e7bb5;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  width: 150px;
  height: 45px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: rgb(121, 16, 174);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  margin-bottom: 10px;

  &:hover {
    background-color: rgb(95, 31, 137);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: rgb(241, 216, 255);
  padding: 20px 40px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  width: 320px; /* 팝업 너비 고정 */
  height: 200px; /* 팝업 높이 고정 */
  display: flex; /* 플렉스 박스 활성화 */
  flex-direction: column; /* 세로 정렬 */
  justify-content: center; /* 세로 가운데 정렬 */
  align-items: center; /* 가로 가운데 정렬 */
`;

const ModalButton = styled.button`
  margin-top: 20px;
  width: 100px;
  height: 40px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: rgb(121, 16, 174);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: rgb(95, 31, 137);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
`;

function FindPw() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Wrapper>
      <Logo src={logo} alt="Berrecommend 로고" />
      <FindBox>
        <Description>
          비밀번호 찾기를 위해 회원가입 시 입력한 <br />
          아이디와 이메일을 입력해주세요.
        </Description>
        <IdInputGroup>
          <IdLabel htmlFor="username">아이디</IdLabel>
          <IdInput id="username" type="text" placeholder="아이디" />
        </IdInputGroup>
        <InputGroup>
          <Label htmlFor="email">이메일</Label>
          <Input id="email" type="email" placeholder="이메일" />
          <SmallButton>인증하기</SmallButton>
        </InputGroup>
        <InputGroup>
          <Label htmlFor="emailCode">이메일 인증</Label>
          <Input
            id="emailCode"
            type="text"
            placeholder="이메일로 전송한 인증코드 입력"
          />
          <SmallButton>인증확인</SmallButton>
        </InputGroup>
        <ButtonWrapper>
          <Button onClick={handleButtonClick}>확인</Button>
        </ButtonWrapper>
      </FindBox>

      {/* 팝업 모달 */}
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <p>
              이메일로 전송된 임시 비밀번호로 <br />
              로그인 후 마이페이지에서
              <br />
              비밀번호를 변경해 주세요.
            </p>
            <ModalButton onClick={closeModal}>확인</ModalButton>
          </ModalContent>
        </Modal>
      )}
    </Wrapper>
  );
}

export default FindPw;
