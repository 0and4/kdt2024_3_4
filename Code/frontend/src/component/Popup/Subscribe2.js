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
    const tid = sessionStorage.getItem("tidToken"); // ✅ tid 가져오기
    const token = sessionStorage.getItem("access_token");

    if (!tid || !token) {
      alert("구독 해지를 진행할 수 없습니다. 다시 로그인 후 시도해주세요.");
      return;
    }

    console.log("보낼 token:", token); // 콘솔에서 토큰 확인
    console.log("보낼 tid:", tid); // 콘솔에서 토큰 확인

    try {
      const response = await fetch("http://localhost:8080/payment/cancel-subscription", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tid: tid }), // ✅ tid를 서버로 전송
      });

      if (!response.ok) {
        throw new Error("구독 해지 요청 실패");
      }

      alert("구독이 해지되었습니다.");
      sessionStorage.removeItem("tidToken"); // ✅ tid 삭제
      navigate("/");
    } catch (error) {
      console.error("구독 해지 중 오류 발생:", error);
      alert("구독 해지 중 오류가 발생했습니다.");
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
