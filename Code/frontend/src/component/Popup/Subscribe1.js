import React from "react";
import Modal, { ModalButton } from "../Popup/Modal";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Text = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  color: white;
  margin-bottom: 20px;
`;

const Subscribe1 = ({ isOpen, onClose }) => {
  const navigate = useNavigate(); //

  const handleChangeSubscription = () => {
    navigate("/pr"); //
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Text>
        회원님의 현재 이용권은 <br /> [ Basic ] 입니다.
      </Text>
      <ModalButton onClick={handleChangeSubscription}>변경</ModalButton>
    </Modal>
  );
};

export default Subscribe1;
