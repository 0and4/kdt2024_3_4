import React, {useState, useEffect} from "react";
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

const Subscribe1 = ({ isOpen, onClose, isPremium }) => {
  const navigate = useNavigate();
  const [membership, setMembership] = useState("BASIC");

  useEffect(() => {
    const fetchRank = async () => {
      try {
        const response = await fetch("http://localhost:8080/profile/rank", {
          method: "GET",
          credentials: "include", // 쿠키를 포함하여 요청
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setMembership(data.rank === "PREMIUM" ? "PREMIUM" : "BASIC");
        } else {
          console.error("Failed to fetch rank");
        }
      } catch (error) {
        console.error("Error fetching rank:", error);
      }
    };

    if (isOpen) {
      fetchRank();
    }
  }, [isOpen]);

  const handleChangeSubscription = () => {
    navigate("/pr"); //
  };

  // const handleCancelSubscription = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8080/profile/cancel", {
  //       method: "POST",
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
  //       },
  //     });

  //     if (response.ok) {
  //       setMembership("BASIC"); // 해지 후 BASIC으로 변경
  //       alert("프리미엄 해지가 완료되었습니다.");
  //     } else {
  //       console.error("Failed to cancel subscription");
  //     }
  //   } catch (error) {
  //     console.error("Error cancelling subscription:", error);
  //   }
  // };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Text>
        회원님의 현재 이용권은 <br /> [ {membership} ] 입니다.
      </Text>
      {membership === "PREMIUM" ? (
        <ModalButton /*onClick={handleCancelSubscription}*/ >해지하기</ModalButton>
      ) : (
        <ModalButton onClick={handleChangeSubscription}>변경</ModalButton>
      )}
      {/* <ModalButton onClick={handleChangeSubscription}>변경</ModalButton> */}
    </Modal>
  );
};

export default Subscribe1;
