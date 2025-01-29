import "./App.css";
import styled from "styled-components";
import Header from "./component/header";
import Main from "./component/Main";
import Player from "./component/Player";
import Search from "./component/pages/Search";
import SongInfo from "./component/pages/SongInfo";
import ArtistInfo from "./component/pages/ArtistInfo";
import AlbumInfo from "./component/pages/AlbumInfo";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  overflow-x: hidden;
  @media (max-width: 768px) {
    flex-direction: column; /* 화면이 좁을 때 세로로 변경 */
  }
  @media (max-width: 768px) {
    padding-bottom: 72px; /* 플레이어 높이에 맞게 적절한 값으로 설정 */
  }
`;
const Container = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
function App() {
  const [activeMenu, setActiveMenu] = useState("chart");
  const navigate = useNavigate();

  const onMenuClick = (menu) => {
    setActiveMenu(menu);
    if (menu === "chart") {
      navigate("/chart");
    } else if (menu === "recommend") {
      navigate("/recommend");
    }
  };

  return (
    <div className="App">
      <Wrapper>
        <Container>
          <Header activeMenu={activeMenu} onMenuClick={onMenuClick} />
          <Routes>
            <Route path="*" element={<Main activeMenu={activeMenu} />} />
            <Route path="/search" element={<Search />} />
            <Route path="/song/:songId" element={<SongInfo />} />
            <Route path="/artist/:artistName" element={<ArtistInfo />} />
            <Route path="/album/:albumName" element={<AlbumInfo />} />
          </Routes>
        </Container>
        <Player />
      </Wrapper>
    </div>
  );
}

function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
export default AppWithRouter;
