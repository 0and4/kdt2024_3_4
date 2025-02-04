import { useState } from "react";
import styled from "styled-components";
import MPEdit1 from "../Popup/MPEdit1";
import Subscribe1 from "../Popup/Subscribe1";
import EditPL from "../Popup/EditPL";
import { Wrapper as mpWrapper, Container as mpContainer } from "../ui/AllDiv";
const Wrapper = styled(mpWrapper)`
  width: 100%;
  padding: 0;
`;
const Container = styled(mpContainer)`
  width: 100%;
  padding: 0;
  @media (min-width: 769px) {
    width: calc(100% - 70px);
    margin: 0 auto;
  }
  @media (min-width: 1171px) {
    width: calc(100% - 350px);
    margin: 0 auto;
  }
`;
// 프로필 섹션
const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  gap: 16px;

  border-bottom: 1px solid #dadada;
  @media (max-width: 768px) {
    width: 85%;
    margin: 0 auto;
  }
`;

// 프로필 이미지
const ProfileImage = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background-color: #cfcfcf;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
  margin-right: 15px;
  flex-shrink: 0;
`;

// 프로필 정보
const UsernameContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  text-align: left;
`;
const UserDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
  flex-grow: 1;
  text-align: left;
  p {
    margin: 0;
  }
`;

const Username = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
`;

// 프로필 수정 버튼
const EditButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  color: #8a2be2;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Email = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0;
`;

// 플레이리스트 섹션
const PlaylistSection = styled.div`
  padding: 15px 20px;
`;

const PlaylistHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 0 10px;
`;

const PlaylistTitle = styled.p`
  font-size: 1.1rem;
  text-align: left;
  font-weight: 900;
`;

// 플레이리스트 수정 버튼
const EditButtons = styled.div`
  display: flex;
  gap: 10px;
`;

// 수정, 삭제 버튼
const Button = styled.button`
  background: none;
  border: none;
  font-size: 0.9rem;
  height: 25px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  color: ${(props) => (props.disabled ? "#aaa" : "black")};

  &:hover {
    background-color: ${(props) =>
      props.disabled ? "none" : "rgb(146, 92, 173)"};
    color: ${(props) => (props.disabled ? "#aaa" : "white")};
  }
`;

// 플레이리스트 아이템
const PlaylistItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const PlaylistThumbnail = styled.div`
  width: 100px;
  height: 100px;
  background-color: #cfcfcf;
  margin-right: 15px;
`;

const PlaylistName = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
  flex-grow: 1;
  text-align: left;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

// 구독정보 버튼
const SubscriptionButton = styled.button`
  padding: 8px 12px;
  height: 36px;
  font-size: 0.9rem;
  white-space: nowrap;
  background-color: #dadada;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: rgb(146, 92, 173);
    color: white;
  }
`;

function MyPage() {
  const [isMPEdit1Open, setIsMPEdit1Open] = useState(false);
  const [isSubscribe1Open, setIsSubscribe1Open] = useState(false);
  const [isEditPLOpen, setIsEditPLOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  //임의의 플레이리스트 데이터, 실제 데이터 연결 시 PlaylistInfo.js로 이동하도록 설정 필요
  const playlists = [
    "내가 좋아하는 노래 💜",
    "플레이리스트 1",
    "앤틱한 카페에서 듣기 좋은 노래 모음 👑",
  ];

  const handleCheckboxChange = (playlist) => {
    setSelectedPlaylist(playlist === selectedPlaylist ? null : playlist);
  };

  const handleDelete = (playlistName) => {
    if (window.confirm(`"${playlistName}" 플레이리스트를 삭제하시겠습니까?`)) {
      console.log(`"${playlistName}" 삭제됨`);
    }
  };

  return (
    <Wrapper>
      <Container>
        <ProfileSection>
          <ProfileImage>S</ProfileImage>
          <UserDiv>
            <ProfileInfo>
              <UsernameContainer>
                <Username>
                  <span id="nickname">즐거운 자몽</span>
                </Username>
                <EditButton onClick={() => setIsMPEdit1Open(true)}>
                  ✏️
                </EditButton>
                <MPEdit1
                  isOpen={isMPEdit1Open}
                  onClose={() => setIsMPEdit1Open(false)}
                />
              </UsernameContainer>
              <Email>
                <span id="email">kim0408@gmail.com</span>
              </Email>
            </ProfileInfo>
            <SubscriptionButton onClick={() => setIsSubscribe1Open(true)}>
              구독정보
            </SubscriptionButton>
            <Subscribe1
              isOpen={isSubscribe1Open}
              onClose={() => setIsSubscribe1Open(false)}
            />
          </UserDiv>
        </ProfileSection>

        <PlaylistSection>
          <PlaylistHeader>
            <PlaylistTitle>내 플레이리스트</PlaylistTitle>
            <EditButtons>
              <Button
                onClick={() => selectedPlaylist && setIsEditPLOpen(true)}
                disabled={!selectedPlaylist}
              >
                수정
              </Button>
              |
              <Button
                onClick={() =>
                  selectedPlaylist && handleDelete(selectedPlaylist)
                }
                disabled={!selectedPlaylist}
              >
                삭제
              </Button>
            </EditButtons>
          </PlaylistHeader>

          {playlists.map((playlist, index) => (
            <PlaylistItem key={index}>
              <PlaylistThumbnail />
              <PlaylistName>{playlist}</PlaylistName>
              <Checkbox
                type="checkbox"
                checked={playlist === selectedPlaylist}
                onChange={() => handleCheckboxChange(playlist)}
              />
            </PlaylistItem>
          ))}
        </PlaylistSection>
      </Container>

      {/* 플레이리스트 수정 팝업 */}
      <EditPL
        isOpen={isEditPLOpen}
        onClose={() => setIsEditPLOpen(false)}
        playlistName={selectedPlaylist}
        onSave={(newName) => console.log("새 플레이리스트 이름:", newName)}
      />
    </Wrapper>
  );
}

export default MyPage;
