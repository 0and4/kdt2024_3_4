import { useState } from "react";
import styled from "styled-components";
import MPEdit1 from "../Popup/MPEdit1";
import Subscribe1 from "../Popup/Subscribe1";
import EditPL from "../Popup/EditPL";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  overflow-x: hidden;
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  div {
    margin-left: 10px;
  }
  max-width: 100%;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #dadada;
`;

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

const UsernameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
  flex-grow: 1;
`;

const Username = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

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
  font-size: 1.3rem;
  color: #666;
  margin: 0;
`;

const PlaylistSection = styled.div`
  padding: 20px;
`;

const PlaylistHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 0 10px;
`;

const PlaylistTitle = styled.h3`
  font-size: 1.2rem;
  text-align: left;
`;

const EditButtons = styled.div`
  display: flex;
  gap: 10px;
`;

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
  font-size: 1.3rem;
  margin: 0;
  flex-grow: 1;
  text-align: left;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const SubscriptionButton = styled.button`
  padding: 8px 12px;
  font-size: 1rem;
  background-color: #dadada;
  border: none;
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
          <ProfileInfo>
            <UsernameContainer>
              <Username>즐거운 자몽</Username>
              <EditButton onClick={() => setIsMPEdit1Open(true)}>✏️</EditButton>
              <MPEdit1
                isOpen={isMPEdit1Open}
                onClose={() => setIsMPEdit1Open(false)}
              />
            </UsernameContainer>
            <Email>kim0408@gmail.com</Email>
          </ProfileInfo>
          <SubscriptionButton onClick={() => setIsSubscribe1Open(true)}>
            구독정보
          </SubscriptionButton>
          <Subscribe1
            isOpen={isSubscribe1Open}
            onClose={() => setIsSubscribe1Open(false)}
          />
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
