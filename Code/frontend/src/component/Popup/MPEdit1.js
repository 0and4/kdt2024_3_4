import React, { useState } from "react";
import Modal, { ModalInput, ModalButton } from "../Popup/Modal";
import MPEdit2 from "./MPEdit2"; //

const MPEdit1 = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState("");
  const [isMPEdit2Open, setIsMPEdit2Open] = useState(false);

  const handleConfirm = () => {
    console.log("입력된 비밀번호:", password);
    setIsMPEdit2Open(true); //
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <p style={{ fontSize: "1.2rem", marginBottom: "15px" }}>
          회원님의 비밀번호를 다시 입력해주세요
        </p>
        <ModalInput
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ModalButton onClick={handleConfirm}>확인</ModalButton>
      </Modal>

      {/* MPEdit2 팝업 */}
      <MPEdit2 isOpen={isMPEdit2Open} onClose={() => setIsMPEdit2Open(false)} />
    </>
  );
};

export default MPEdit1;
