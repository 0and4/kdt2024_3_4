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

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  &:first-child {
    margin-top: 10px; /* 첫 번째 필드 위쪽 공간 추가 */
  }
`;

const Label = styled.label`
  font-size: 1rem;
  color: #333;
  text-align: right;
  width: 60px;
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
  width: 300px; /* 팝업 너비 고정 */
  height: 180px; /* 팝업 높이 고정 */
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

function FindId() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 성공 또는 오류 상태 저장

  const handleButtonClick = () => {
    // 성공 상태로 모달을 표시
    setIsModalOpen(true);
    setModalType("success");
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
    setModalType(""); // 모달 타입 초기화
  };

  return (
    <Wrapper>
      <Logo src={logo} alt="Berrecommend 로고" />
      <FindBox>
        <Description>
          아이디 찾기를 위해 회원가입 시 입력한 <br />
          이름과 이메일을 입력해주세요.
        </Description>
        <InputGroup>
          <Label htmlFor="name">이름</Label>
          <Input id="name" type="text" placeholder="이름" />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="email">이메일</Label>
          <Input id="email" type="email" placeholder="이메일" />
        </InputGroup>
        <ButtonWrapper>
          <Button onClick={handleButtonClick}>확인</Button>
        </ButtonWrapper>
      </FindBox>

      {/* 성공 팝업 */}
      {isModalOpen && modalType === "success" && (
        <Modal>
          <ModalContent>
            <p>
              000 회원님의 아이디는
              <br />
              <b>@@@</b> 입니다.
            </p>
            <ModalButton onClick={closeModal}>확인</ModalButton>
          </ModalContent>
        </Modal>
      )}

      {/* 오류 팝업 - 주석 처리 */}
      {/* 
      {isModalOpen && modalType === "error" && (
        <Modal>
          <ModalContent>
            <p>
              일치하는 회원 정보가 없습니다.
              <br />
              다시 한 번 확인해주세요.
            </p>
            <ModalButton onClick={closeModal}>확인</ModalButton>
          </ModalContent>
        </Modal>
      )}
      */}
    </Wrapper>
  );
}

export default FindId;
