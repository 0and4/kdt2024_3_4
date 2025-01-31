import "./App.css";
import styled from "styled-components";
import Header from "./component/header";
import Main from "./component/Main";
import Player from "./component/Player";
import Search from "./component/pages/Search";
import SongInfo from "./component/pages/SongInfo";
import ArtistInfo from "./component/pages/ArtistInfo";
import AlbumInfo from "./component/pages/AlbumInfo";
import LoginMenu from "./component/LoginMenu";
import Login from "./component/Login";
import Join from "./component/Join";
import FindId from "./component/FindId";
import FindPW from "./component/FindPW";

import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  overflow-x: hidden;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  @media (max-width: 768px) {
    padding-bottom: 72px;
  }
`;

const Container = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FullScreenWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #c39edb; /* 보라색 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`;

function App() {
  const [activeMenu, setActiveMenu] = useState("chart");
  const navigate = useNavigate();
  const location = useLocation();

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
      {/* 로그인 페이지일 경우 전체 보라색 화면, 아니면 기존 Wrapper 적용 */}
      {location.pathname === "/login" ||
      location.pathname === "/login-id" ||
      location.pathname === "/signup" ||
      location.pathname === "/find-id" ||
      location.pathname === "/find-pw" ? (
        <FullScreenWrapper>
          {location.pathname === "/login" && <LoginMenu />}
          {location.pathname === "/login-id" && <Login />}
          {location.pathname === "/signup" && <Join />}
          {location.pathname === "/find-id" && <FindId />}
          {location.pathname === "/find-pw" && <FindPW />}
        </FullScreenWrapper>
      ) : (
        <Wrapper>
          <Container>
            <Header activeMenu={activeMenu} onMenuClick={onMenuClick} />
            <Routes>
              <Route path="*" element={<Main activeMenu={activeMenu} />} />
              <Route path="/search" element={<Search />} />
              <Route path="/login" element={<LoginMenu />} />
              <Route path="/find-id" element={<FindId />} />
              <Route path="/find-pw" element={<FindPW />} />
              <Route path="/signup" element={<Join />} />
              <Route path="/login-id" element={<Login />} />
              <Route path="/song/:songId" element={<SongInfo />} />
              <Route path="/artist/:artistName" element={<ArtistInfo />} />
              <Route path="/album/:albumName" element={<AlbumInfo />} />
            </Routes>
          </Container>
          <Player />
        </Wrapper>
      )}
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
