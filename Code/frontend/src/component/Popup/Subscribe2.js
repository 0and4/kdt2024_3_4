import React from "react";
import Modal, { ModalButton } from "./Modal"; // 같은 폴더 내 Modal 사용
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // 네비게이션 추가

const Text = styled.p`
  font-size: 1.1em;
  text-align: center;
  color: white;
  margin-bottom: 20px;
`;

const Subscribe2 = ({ isOpen, onClose }) => {
  const navigate = useNavigate(); // useNavigate 훅 추가

  const onConfirm = () => {
    alert("구독이 해지되었습니다."); // 해지 완료 alert
    navigate("/"); // main.js로 이동
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Text>
        정말로 구독을 해지하시겠습니까?
        <br />
        <strong>[추천 플레이리스트]</strong> 재생 기능을
        <br />더 이상 이용할 수 없습니다.
      </Text>
      <ModalButton onClick={onConfirm}>확인</ModalButton>
    </Modal>
  );
};

export default Subscribe2;
