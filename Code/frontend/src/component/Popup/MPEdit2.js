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
  background-color: rgb(91, 25, 148);
`;

const SaveButton = styled(ModalButton)`
  width: 80px;
  height: 40px;
  font-size: 1rem;
  background-color: rgb(91, 25, 148);
  margin-top: 20px;
  &:hover {
    background-color: #380d66;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const StyledModalInput = styled(ModalInput)`
  font-size: 15px; /* 기본 폰트 크기 */
  &::placeholder {
    font-size: 13px; /* 플레이스홀더 폰트 크기 */
    color: rgb(196, 196, 196);
  }
`;

const MPEdit2 = ({ isOpen, onClose }) => {
  // 입력값 상태
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");

  // 각 필드의 변경(확인) 상태. 사용자가 변경 버튼을 눌러 유효성 검사 통과하면 true가 됩니다.
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [isNicknameConfirmed, setIsNicknameConfirmed] = useState(false);

  // 비밀번호 변경 버튼 클릭 핸들러
  // 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 함.
  const handlePasswordChange = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("비밀번호는 영문, 숫자, 특수문자를 포함해 8자 이상이어야 합니다.");
      return;
    }
    alert("비밀번호 변경이 완료되었습니다.");
    setIsPasswordConfirmed(true);
  };

  // 이메일 변경 버튼 클릭 핸들러
  // 올바른 이메일 형식인지 검사합니다.
  const handleEmailChange = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }
    alert("이메일 변경이 완료되었습니다.");
    setIsEmailConfirmed(true);
  };

  // 별명 변경 버튼 클릭 핸들러
  // 별도 검증 없이 변경 버튼을 누르면 변경 완료 처리합니다.
  const handleNicknameChange = () => {
    if (nickname.trim() === "") {
      alert("별명은 비어있을 수 없습니다.");
      return;
    }
    alert("별명 변경이 완료되었습니다. 저장 버튼을 눌러주세요.");
    setIsNicknameConfirmed(true);
  };

  // 저장 버튼 클릭 핸들러
  // 하나라도 변경 버튼을 눌러 확인한 필드가 있어야 저장이 가능하도록 합니다.
  const handleSave = () => {
    if (!(isPasswordConfirmed || isEmailConfirmed || isNicknameConfirmed)) {
      alert("변경 버튼을 눌러 변경사항을 확인하세요.");
      return;
    }
    console.log("저장된 정보:", { password, email, nickname });
    alert("저장이 완료되었습니다.");
    // 모든 입력값 및 확인 플래그 초기화
    setPassword("");
    setEmail("");
    setNickname("");
    setIsPasswordConfirmed(false);
    setIsEmailConfirmed(false);
    setIsNicknameConfirmed(false);
    onClose();
  };

  // 모달의 x(닫기) 버튼 클릭 시 모든 상태 초기화
  const handleClose = () => {
    setPassword("");
    setEmail("");
    setNickname("");
    setIsPasswordConfirmed(false);
    setIsEmailConfirmed(false);
    setIsNicknameConfirmed(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
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
            onChange={(e) => {
              setPassword(e.target.value);
              setIsPasswordConfirmed(false); // 입력값이 변경되면 확인 플래그 초기화
            }}
          />
          <SmallButton onClick={handlePasswordChange}>변경</SmallButton>
        </InputContainer>
        {/* 이메일 변경 */}
        <InputContainer>
          <Label>이메일</Label>
          <StyledModalInput
            type="email"
            placeholder="새로운 이메일 입력"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsEmailConfirmed(false); // 입력값이 변경되면 확인 플래그 초기화
            }}
          />
          <SmallButton onClick={handleEmailChange}>변경</SmallButton>
        </InputContainer>
        {/* 별명 변경 */}
        <InputContainer>
          <Label>별명</Label>
          <StyledModalInput
            type="text"
            placeholder="새로운 별명 입력"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              setIsNicknameConfirmed(false); // 입력값이 변경되면 확인 플래그 초기화
            }}
          />
          <SmallButton onClick={handleNicknameChange}>변경</SmallButton>
        </InputContainer>
      </div>
      {/* 저장 버튼은 하나라도 변경 확인된 필드가 있을 때 활성화 */}
      <SaveButton
        onClick={handleSave}
        disabled={
          !(isPasswordConfirmed || isEmailConfirmed || isNicknameConfirmed)
        }
      >
        저장
      </SaveButton>
    </Modal>
  );
};

export default MPEdit2;
