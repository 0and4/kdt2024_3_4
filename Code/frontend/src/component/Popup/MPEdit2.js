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

  // 비밀번호 변경
  // 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 함
  const handlePasswordChange = async () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("비밀번호는 영문, 숫자, 특수문자를 포함해 8자 이상이어야 합니다.");
      return;
    }

    const token = sessionStorage.getItem("access_token"); // 저장된 JWT 토큰 가져오기
    console.log("보내는 토큰:", token);
    console.log("요청할 새 비밀번호:", password);

    try {
      const response = await fetch(
        "http://localhost:8080/profile/edit?editType=PASSWORD",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 인증 토큰 추가
          },
          body: JSON.stringify({ value: password }), // 새로운 비밀번호 전달
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("비밀번호 변경 성공:", data);
        alert("비밀번호 변경이 완료되었습니다.");
        setIsPasswordConfirmed(true); // 비밀번호 변경 완료 상태 업데이트
      } else {
        const errorData = await response.json();
        console.error("비밀번호 변경 실패:", errorData);
        alert("비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("네트워크 오류:", error);
      alert("네트워크 오류가 발생했습니다.");
    }
  };

  // 이메일 변경 (수정 필요, 백엔드 이메일 변경 코드 추가 필요)
  const handleEmailChange = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }

    const token = sessionStorage.getItem("access_token"); // 저장된 JWT 토큰 가져오기
    console.log("보내는 토큰:", token);
    console.log("요청할 새 이메일:", email);

    try {
      const response = await fetch(
        "http://localhost:8080/profile/edit?editType=EMAIL",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 인증 토큰 추가
          },
          body: JSON.stringify({ value: email }), // 새로운 이메일 전달
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("이메일 변경 성공:", data);
        alert("이메일 변경이 완료되었습니다.");
        setIsEmailConfirmed(true); // 이메일 변경 완료 상태 업데이트
      } else {
        const errorData = await response.json();
        console.error("이메일 변경 실패:", errorData);
        alert("이메일 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("네트워크 오류:", error);
      alert("네트워크 오류가 발생했습니다.");
    }
  };

  // 별명 변경
  const handleNicknameChange = async () => {
    if (nickname.trim() === "") {
      alert("별명은 비어있을 수 없습니다.");
      return;
    }

    const token = sessionStorage.getItem("access_token"); // 저장된 토큰 가져오기

    try {
      const response = await fetch(
        "http://localhost:8080/profile/edit?editType=NICKNAME",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ value: nickname }), // 변경할 별명 전달
        }
      );

      if (!response.ok) {
        throw new Error("별명 변경 실패");
      }

      const data = await response.json();
      console.log("변경된 별명:", data.nickname); // 응답 데이터 확인
      alert("별명이 성공적으로 변경되었습니다!");
      setIsNicknameConfirmed(true);
    } catch (error) {
      console.error("별명 변경 오류:", error);
      alert("별명 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 저장 기능
  // 하나라도 변경 버튼을 눌러 확인한 필드가 있어야 저장이 가능하도록 함
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
