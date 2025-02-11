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

  const onConfirm = async () => {
    const token = sessionStorage.getItem("access_token");
    const tidToken = sessionStorage.getItem("tidToken");
  
    if (!token || !tidToken) {
      alert("로그인이 필요합니다.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080//payment/cancel-subscription/${tidToken}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("구독 해지 요청에 실패했습니다.");
      }
  
      alert("구독이 해지되었습니다."); // 알림 표시
  
      // 해지 후 sessionStorage에서 tidToken 제거
      sessionStorage.removeItem("tidToken");
  
      // 메인 페이지로 이동
      navigate("/");
    } catch (error) {
      console.error("구독 해지 중 오류 발생:", error);
      alert("구독 해지를 처리하는 중 오류가 발생했습니다.");
    }
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
