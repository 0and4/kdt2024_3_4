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

const JoinBox = styled.div`
  width: 650px;
  background-color: rgb(239, 224, 225);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  width: 150px;
`;

const Input = styled.input`
  width: 280px;
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

const AgreementGroup = styled.div`
  display: flex;
  align-items: flex-start; /* 위아래 정렬 */
  gap: 20px;
`;

const Textarea = styled.textarea`
  width: 390px;
  height: 120px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-y: scroll; /* 스크롤 추가 */
  resize: none; /* 크기 조절 불가능하게 설정 */

  &:focus {
    border-color: rgb(164, 131, 181);
    outline: none;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 350px; /* 라디오 버튼이 텍스트와 맞춰지도록 조정 */
  margin-bottom: 15px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  width: 200px;
  height: 45px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: rgb(121, 16, 174);
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;

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
  background: rgba(0, 0, 0, 0.5);
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

function Join() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleJoinClick = () => {
    // 현재는 버튼 클릭 시 모달만 열림
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <Wrapper>
      <Logo src={logo} alt="Berrecommend 로고" />
      <JoinBox>
        <InputGroup>
          <Label htmlFor="username">아이디</Label>
          <Input id="username" type="text" placeholder="8~15자" />
          <SmallButton>중복확인</SmallButton>
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            placeholder="영문+숫자+특문 8자 이상"
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="confirm-password">비밀번호 확인</Label>
          <Input id="confirm-password" type="password" />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="email">이메일</Label>
          <Input id="email" type="email" placeholder="유효한 이메일 입력" />
        </InputGroup>
        <AgreementGroup>
          <Label htmlFor="agreement">개인정보 수집 동의</Label>
          <Textarea
            id="agreement"
            defaultValue={`개인정보 수집 동의 내용:\n\n1. 수집하는 개인정보 항목\n- 이름, 이메일, 아이디, 비밀번호 등 회원가입 시 필수 정보\n\n2. 개인정보 이용 목적\n- 회원 관리, 서비스 제공 및 개선`}
          />
        </AgreementGroup>
        <RadioGroup>
          <label>
            <input type="radio" name="agreement" value="동의함" /> 동의함
          </label>
          <label>
            <input type="radio" name="agreement" value="동의하지 않음" />{" "}
            동의하지 않음
          </label>
        </RadioGroup>
        <ButtonWrapper>
          <Button onClick={handleJoinClick}>회원가입</Button>
        </ButtonWrapper>
      </JoinBox>

      {/* 모달 */}
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <p>
              000님,
              <br /> 베리코멘드의 회원이 된 것을 환영합니다!
            </p>
            <ModalButton onClick={closeModal}>확인</ModalButton>
          </ModalContent>
        </Modal>
      )}
    </Wrapper>
  );
}

export default Join;
