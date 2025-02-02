import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png"; // 로고 이미지 경로

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

const JoinBox = styled.div`
  width: 650px;
  background-color: rgb(239, 224, 225);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  &:first-child {
    margin-top: 10px; /* 첫 번째 필드 위쪽 공간 추가 */
  }
`;

const Label = styled.label`
  font-size: 1rem;
  color: #333;
  text-align: right;
  width: 150px;
`;

const Input = styled.input`
  width: 280px;
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
  background-color: #68009b;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #9e7bb5;
  }
`;

const AgreementGroup = styled.div`
  display: flex;
  align-items: flex-start; /* 위아래 정렬 */
  gap: 20px;
`;

const Textarea = styled.textarea`
  width: 390px;
  height: 120px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-y: scroll; /* 스크롤 추가 */
  resize: none; /* 크기 조절 불가능하게 설정 */

  &:focus {
    border-color: rgb(164, 131, 181);
    outline: none;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 350px; /* 라디오 버튼이 텍스트와 맞춰지도록 조정 */
  margin-bottom: 15px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  width: 200px;
  height: 45px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: rgb(121, 16, 174);
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;

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

const PasswordCriteria = styled.div`
  font-size: 0.9rem;
  color: ${(props) => (props.isValid ? "green" : "red")};
`;

const Tooltip = styled.div`
  position: absolute;
  top: 320px;
  right: 250px;
  width: 200px;
  background-color: white;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  font-size: 0.7rem;
  color: #333;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

function Join() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // 비밀번호 입력값
  const [tooltipVisible, setTooltipVisible] = useState(false); // 비밀번호 툴팁 보이기 여부

  //로고
  const handleLogoClick = () => {
    navigate("/");
  };

  //가짜 데이터베이스 (이미 가입된 아이디 리스트)
  const existingUsernames = ["user123", "testUser", "helloWorld", "berry123"];

  //아이디 중복 확인 버튼
  const handleCheckUsername = () => {
    if (username.trim() === "") {
      alert("아이디를 입력하세요.");
      return;
    }

    if (existingUsernames.includes(username)) {
      alert("사용이 불가한 아이디입니다. 다시 입력해 주세요.");
    } else {
      alert("사용이 가능합니다!");
    }
  };

  //회원가입 버튼
  const handleJoinClick = () => {
    // 현재는 버튼 클릭 시 모달만 열림
    setIsModalOpen(true);
  };

  // 팝업에서 확인 버튼 클릭 시 Main.js로 이동
  const handleModalConfirm = () => {
    setIsModalOpen(false);
    navigate("/"); // 메인 페이지로 이동
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  //비밀번호 검증 (유효성 검사)
  const containsUppercase = /[A-Z]/.test(password);
  const containsLowercase = /[a-z]/.test(password);
  const containsNumber = /\d/.test(password);
  const containsSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isLengthValid = password.length >= 8;

  return (
    <Wrapper>
      <Logo src={logo} alt="Berrecommend 로고" onClick={handleLogoClick} />{" "}
      <JoinBox>
        <InputGroup>
          <Label htmlFor="username">아이디</Label>
          <Input
            id="username"
            type="text"
            placeholder="8~15자"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <SmallButton onClick={handleCheckUsername}>중복확인</SmallButton>
        </InputGroup>

        {/* 비밀번호 입력란 */}
        <InputGroup>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            placeholder="영문+숫자+특문 8자 이상"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setTooltipVisible(true)} // 포커스 시 툴팁 표시
            onBlur={() => setTooltipVisible(false)} // 포커스 해제 시 툴팁 숨김
          />

          {/* ✅ 툴팁 추가 */}
          <Tooltip visible={tooltipVisible}>
            <PasswordCriteria isValid={containsUppercase || containsLowercase}>
              {containsUppercase || containsLowercase
                ? "✅ 영문 포함됨"
                : "❌ 영문 필요"}
            </PasswordCriteria>
            <PasswordCriteria isValid={containsNumber}>
              {containsNumber ? "✅ 숫자 포함됨" : "❌ 숫자 필요"}
            </PasswordCriteria>
            <PasswordCriteria isValid={containsSpecialChar}>
              {containsSpecialChar ? "✅ 특수문자 포함됨" : "❌ 특수문자 필요"}
            </PasswordCriteria>
            <PasswordCriteria isValid={isLengthValid}>
              {isLengthValid ? "✅ 8자 이상" : "❌ 8자 이상 필요"}
            </PasswordCriteria>
          </Tooltip>
        </InputGroup>

        {/* 비밀번호 확인 입력란 */}
        <InputGroup>
          <Label htmlFor="confirm-password">비밀번호 확인</Label>
          <Input id="confirm-password" type="password" />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="email">이메일</Label>
          <Input id="email" type="email" placeholder="유효한 이메일 입력" />
        </InputGroup>
        <AgreementGroup>
          <Label htmlFor="agreement">개인정보 수집 동의</Label>
          <Textarea
            readOnly
            id="agreement"
            defaultValue={`개인정보 수집 동의 내용:\n\n1. 수집하는 개인정보 항목\n- 이름, 이메일, 아이디, 비밀번호 등 회원가입 시 필수 정보\n\n2. 개인정보 이용 목적\n- 회원 관리, 서비스 제공 및 개선`}
          />
        </AgreementGroup>
        <RadioGroup>
          <label>
            <input type="radio" name="agreement" value="동의함" /> 동의함
          </label>
          <label>
            <input type="radio" name="agreement" value="동의하지 않음" />{" "}
            동의하지 않음
          </label>
        </RadioGroup>
        <ButtonWrapper>
          <Button onClick={handleJoinClick}>회원가입</Button>
        </ButtonWrapper>
      </JoinBox>
      {/* 모달 */}
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <p>
              000님,
              <br /> 베리코멘드의 회원이 된 것을 환영합니다!
            </p>
            <ModalButton onClick={handleModalConfirm}>확인</ModalButton>
          </ModalContent>
        </Modal>
      )}
    </Wrapper>
  );
}

export default Join;
