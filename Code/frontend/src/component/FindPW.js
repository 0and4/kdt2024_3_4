import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #c69fda;
`;

const Logo = styled.img`
  width: 400px;
  margin-bottom: 35px;
  cursor: pointer;
`;

const FindBox = styled.div`
  width: 600px;
  background-color: rgb(239, 224, 225);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

/* 아이디와 입력창 스타일 */
const IdInputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  width: 100%;
  margin-left: 150px;
`;

const IdLabel = styled.label`
  font-size: 1rem;
  color: #333;
  text-align: right;
  width: 80px;
`;

const IdInput = styled.input`
  width: 230px;
  height: 40px;
  padding: 5px 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:focus {
    border-color: rgb(164, 131, 181);
    outline: none;
  }
`;

/* 나머지 입력창 스타일 */
const InputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #333;
  text-align: right;
  width: 90px;
`;

const Input = styled.input`
  width: 230px;
  height: 40px;
  padding: 5px 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:focus {
    border-color: rgb(164, 131, 181);
    outline: none;
  }
`;

const SmallButton = styled.button`
  height: 35px;
  width: 90px;
  padding: 0 10px;
  font-size: 0.9rem;
  color: white;
  background-color: rgb(121, 16, 174);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgb(95, 31, 137);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  width: 150px;
  height: 45px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: rgb(121, 16, 174);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  margin-bottom: 10px;

  &:hover {
    background-color: rgb(95, 31, 137);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: rgb(241, 216, 255);
  padding: 20px 40px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  width: 320px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalButton = styled.button`
  margin-top: 20px;
  width: 100px;
  height: 40px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: rgb(121, 16, 174);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: rgb(95, 31, 137);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
`;

const TimerText = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  font-size: 1rem;
  transform: translateY(-50%);
  color: ${(props) => (props.timer === 0 ? "red" : "rgba(43, 43, 43, 0.61)")};
`;

const InputWrapper = styled.div`
  position: relative;
  width: 250px;
`;

function FindPw() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(300); // 5분 (300초)
  const [isCounting, setIsCounting] = useState(false); // 타이머 작동 여부

  //로고
  const handleLogoClick = () => {
    navigate("/");
  };

  const handleSendVerificationCode = () => {
    if (!email) {
      alert("이메일을 입력해주세요."); //
      return;
    }
    alert(
      "입력한 이메일로 인증번호를 발송했습니다.\n5분 내로 번호를 입력해 주세요."
    ); //
    startTimer();
  };

  // 타이머 시작 함수
  const startTimer = () => {
    setTimer(300); // 5분 초기화
    setIsCounting(true); // 타이머 작동 시작
  };

  // 타이머 감소 로직
  useEffect(() => {
    if (isCounting) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setIsCounting(false); // 타이머 멈추기
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isCounting]);

  // "분:초" 포맷 변환 함수
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/login-id");
  };

  const handleVerifyCode = () => {
    alert("인증이 완료되었습니다."); // ✅ 인증 완료 alert 표시
  };

  return (
    <Wrapper>
      <Logo src={logo} alt="Berrecommend 로고" onClick={handleLogoClick} />{" "}
      <FindBox>
        <Description>
          비밀번호 찾기를 위해 회원가입 시 입력한 <br />
          아이디와 이메일을 입력해주세요.
        </Description>
        <IdInputGroup>
          <IdLabel htmlFor="username">아이디</IdLabel>
          <IdInput id="username" type="text" placeholder="아이디" />
        </IdInputGroup>

        <InputGroup>
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            placeholder="이메일"
            value={email} // 🔥 입력값을 `email` 상태와 연결
            onChange={(e) => setEmail(e.target.value)} // 🔥 입력값이 변경될 때 `setEmail`로 상태 업데이트
          />
          <SmallButton onClick={handleSendVerificationCode}>
            코드 전송
          </SmallButton>
        </InputGroup>

        <InputGroup>
          <Label htmlFor="emailCode">이메일 인증</Label>
          <InputWrapper>
            <Input id="emailCode" type="text" placeholder="인증코드 입력" />
            {/* ✅ 타이머 표시 */}
            {timer !== null && (
              <TimerText expired={timer === 0}>
                {timer > 0 ? formatTime(timer) : "시간 초과"}
              </TimerText>
            )}
          </InputWrapper>
          <SmallButton onClick={handleVerifyCode}>인증하기</SmallButton>
        </InputGroup>

        <ButtonWrapper>
          <Button onClick={handleButtonClick}>확인</Button>
        </ButtonWrapper>
      </FindBox>
      {/* 팝업 모달 */}
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <p>
              이메일로 전송된 임시 비밀번호로 <br />
              로그인 후 마이페이지에서
              <br />
              비밀번호를 변경해 주세요.
            </p>
            <ModalButton onClick={closeModal}>확인</ModalButton>
          </ModalContent>
        </Modal>
      )}
    </Wrapper>
  );
}

export default FindPw;
