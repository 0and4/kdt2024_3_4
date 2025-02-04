import React, { useState } from "react";
import Modal, { ModalInput, ModalButton } from "../Popup/Modal";
import MPEdit2 from "./MPEdit2";

const MPEdit1 = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState("");
  const [isMPEdit2Open, setIsMPEdit2Open] = useState(false);

  // 모달이 닫힐 때 호출되는 핸들러
  const handleClose = () => {
    setPassword(""); // 입력값 초기화
    onClose(); // 부모 onClose 호출
  };

  const handleConfirm = () => {
    if (password === "password123!") {
      console.log("입력된 비밀번호:", password);
      setIsMPEdit2Open(true);
    } else {
      alert("잘못된 비밀번호 입니다. 다시 입력해주세요.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleConfirm();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <p style={{ fontSize: "1.2rem", marginBottom: "15px" }}>
          회원님의 비밀번호를 입력해주세요
        </p>
        <ModalInput
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown} // 엔터키 이벤트 추가
        />
        <ModalButton onClick={handleConfirm}>확인</ModalButton>
      </Modal>

      <MPEdit2
        isOpen={isMPEdit2Open}
        onClose={() => {
          setIsMPEdit2Open(false);
          setPassword(""); // 첫번째 팝업의 입력값(비밀번호) 초기화
          onClose(); // 부모에게 전체 팝업 종료 알림 (필요하다면)
        }}
      />
    </>
  );
};

export default MPEdit1;
