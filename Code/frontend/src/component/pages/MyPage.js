import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MPEdit1 from "../Popup/MPEdit1";
import Subscribe1 from "../Popup/Subscribe1";
import EditPL from "../Popup/EditPL";
import { Wrapper as MPWrapper, Container} from "../ui/AllDiv";
const Wrapper = styled(MPWrapper)`
height:auto;
`

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

const generateRandomNickname = () => {
  const adjectives = [
    "달달한",
    "새콤한",
    "상큼한",
    "고소한",
    "시원한",
    "부드러운",
    "향긋한",
    "진한",
  ];
  const fruits = [
    "자몽",
    "사과",
    "바나나",
    "포도",
    "복숭아",
    "딸기",
    "수박",
    "오렌지",
  ];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];

  return `${randomAdjective} ${randomFruit}`;
};

function MyPage() {
  const navigate = useNavigate();

  const [isMPEdit1Open, setIsMPEdit1Open] = useState(false);
  const [isSubscribe1Open, setIsSubscribe1Open] = useState(false);
  const [isEditPLOpen, setIsEditPLOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [email, setEmail] = useState("loading...");
  const [nickname, setNickname] = useState("로딩 중...");

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/profile/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`요청 실패: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("사용자 정보:", data);
        setEmail(data.email || "이메일 없음");

        // 각 계정(email)마다 닉네임을 다르게 저장하기 위해 키값을 "nickname_email" 형식으로 저장
        const nicknameKey = `nickname_${data.email}`;
        let storedNickname = sessionStorage.getItem(nicknameKey);

        // 닉네임이 Anonymous가 아니라면 그대로 사용하고, sessionStorage에 저장
        if (data.nickname && data.nickname !== "Anonymous") {
          setNickname(data.nickname);
          sessionStorage.setItem(nicknameKey, data.nickname);
          return;
        }

        // sessionStorage에 닉네임이 없고, 서버에서 받은 닉네임도 Anonymous라면 랜덤 생성
        if (!storedNickname) {
          storedNickname = generateRandomNickname();

          // 서버에도 한 번만 저장 (Anonymous인 경우에만)
          fetch("http://localhost:8080/profile/edit?editType=NICKNAME", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
            },
            credentials: "include",
            body: JSON.stringify({ value: storedNickname }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`닉네임 업데이트 실패: ${response.status}`);
              }
              return response.json();
            })
            .then((updatedData) => {
              console.log("닉네임 업데이트 성공:", updatedData);
              setNickname(updatedData.nickname);
              sessionStorage.setItem(nicknameKey, updatedData.nickname);
            })
            .catch((error) => console.error("닉네임 업데이트 오류:", error));
        } else {
          setNickname(storedNickname);
        }
      })
      .catch((error) => console.error("사용자 정보 요청 실패:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/playList/normal/my-thumb", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`플레이리스트 불러오기 실패: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setPlaylists(data.dataList || []);
      })
      .catch((error) => console.error("플레이리스트 요청 실패:", error));
  }, []);

  const handlePlaylistClick = (playlist, event) => {
    if (event.target.type === "checkbox") return; // 체크박스를 클릭한 경우 페이지 이동을 막음
    navigate(`/my-playlist/${playlist.id}`, {
      state: { playlistTitle: playlist.name }, // 제목 데이터 함께 전달
    });
  };
  const handleCheckboxChange = (playlist) => {
    setSelectedPlaylist(playlist === selectedPlaylist ? null : playlist);
  };

  const handleEdit = (newName) => {
    if (!selectedPlaylist) return;
    
    fetch("http://localhost:8080/playList/normal/edit", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
      credentials: "include",
      body: JSON.stringify({
        playlistId: selectedPlaylist.id,
        title: newName,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`플레이리스트 수정 실패: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("수정된 플레이리스트:", data);
        setPlaylists((prev) =>
          prev.map((pl) => (pl.id === selectedPlaylist.id ? { ...pl, name: newName } : pl))
        );
        setIsEditPLOpen(false);
      })
      .catch((error) => console.error("플레이리스트 수정 오류:", error));
  };
  
  const handleDelete = () => {
    if (!selectedPlaylist) return;
    if (!window.confirm(`\"${selectedPlaylist.name}\"을 삭제하시겠습니까?`)) return;
  
    fetch(`http://localhost:8080/playList/normal/delete/${selectedPlaylist.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`플레이리스트 삭제 실패: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        alert("플레이리스트 삭제 완료");
        setPlaylists((prev) => prev.filter((pl) => pl.id !== selectedPlaylist.id));
        setSelectedPlaylist(null);
      })
      .catch((error) => console.error("플레이리스트 삭제 오류:", error));
  };

  return (
    <Wrapper>
      <Container>
        <ProfileSection>
          <ProfileImage>{email.charAt(0).toUpperCase()}</ProfileImage>{" "}
          {/* 이메일 첫 글자 표시 */}
          <UserDiv>
            <ProfileInfo>
              <UsernameContainer>
                <Username>{nickname}</Username>
                <EditButton onClick={() => setIsMPEdit1Open(true)}>
                  ✏️
                </EditButton>
                <MPEdit1
                  isOpen={isMPEdit1Open}
                  onClose={() => setIsMPEdit1Open(false)}
                />
              </UsernameContainer>
              <p>{email}</p>
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

          {playlists.map((playlist) => (
            <PlaylistItem
              key={playlist.id}
              onClick={(e) => handlePlaylistClick(playlist, e)}
            >
              <PlaylistThumbnail />
                <PlaylistName>
                    {playlist.name}
                </PlaylistName>
              <Checkbox
                type="checkbox"
                checked={playlist === selectedPlaylist}
                onChange={(e) => {
                  e.stopPropagation(); // 이벤트 전파 방지
                  handleCheckboxChange(playlist);
                }}
              />
            </PlaylistItem>
          ))}
        </PlaylistSection>
      </Container>

      {/* 플레이리스트 수정 팝업 */}
      <EditPL
        isOpen={isEditPLOpen}
        onClose={() => setIsEditPLOpen(false)}
        playlistName={selectedPlaylist ? selectedPlaylist.name : ""}
        onSave={(newName) => handleEdit(newName)} 
      />
    </Wrapper>
  );
}

export default MyPage;
