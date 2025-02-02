import React, { useState } from "react";
import Modal, { ModalInput, ModalButton } from "../Popup/Modal";
import styled from "styled-components";

const Label = styled.label`
  font-size: 17px;
  color: white;
  margin: 0 auto;
  width: 130px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 350px;
  margin-bottom: 5px;
`;

const SmallButton = styled(ModalButton)`
  width: 80px;
  height: 35px;
  font-size: 0.9rem;
  margin-left: 15px;
  background-color: rgb(189, 189, 189);
`;

const SaveButton = styled(ModalButton)`
  width: 80px;
  height: 40px;
  font-size: 1rem;
  background-color: rgb(103, 53, 128);
  margin-top: 20px;

  &:hover {
    background-color: #380d66;
  }
`;

const StyledModalInput = styled(ModalInput)`
  font-size: 15px; /* 기본 폰트 크기 */

  &::placeholder {
    font-size: 13px; /* 플레이스홀더 폰트 크기 */
    color: rgb(196, 196, 196); /* 플레이스홀더 색상 (선택) */
  }
`;

const MPEdit2 = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");

  const handleSave = () => {
    console.log("저장된 정보:", { password, email, nickname });
    onClose(); // 팝업 닫기
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "90%",
        }}
      >
        {/* 비밀번호 변경 */}
        <InputContainer>
          <Label>비밀번호</Label>
          <StyledModalInput
            type="password"
            placeholder="영문+숫자+특수문자 8자 이상"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SmallButton>변경</SmallButton>
        </InputContainer>
        {/* 이메일 변경 */}
        <InputContainer>
          <Label>이메일</Label>
          <StyledModalInput
            type="email"
            placeholder="새로운 이메일 입력" //
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <SmallButton>변경</SmallButton>
        </InputContainer>
        {/* 별명 변경 */}
        <InputContainer>
          <Label>별명</Label>
          <StyledModalInput
            type="text"
            placeholder="새로운 별명 입력" //
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <SmallButton>변경</SmallButton>
        </InputContainer>
      </div>
      {/* 저장 버튼 */}
      <SaveButton onClick={handleSave}>저장</SaveButton>
    </Modal>
  );
};

export default MPEdit2;
