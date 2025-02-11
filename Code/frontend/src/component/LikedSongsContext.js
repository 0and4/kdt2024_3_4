import React, { createContext, useContext, useState, useEffect } from 'react';

// LikedSongsContext 생성
const LikedSongsContext = createContext();

export const useLikedSongs = () => {
  return useContext(LikedSongsContext);
};

export const LikedSongsProvider = ({ children }) => {
  const [likedSongs, setLikedSongs] = useState([]);

  // 로그인 시 "내가 좋아하는 노래" 플레이리스트 정보를 가져와서 likedSongs 상태에 설정
  useEffect(() => {
    const fetchLikedSongs = async () => {
      const token = sessionStorage.getItem("access_token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:8080/playList/normal/my-thumb", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("플레이리스트를 불러오는 데 실패했습니다.");
        
        const data = await response.json();
        const favoritePlaylist = data.dataList.find(
          (playlist) => playlist.name === "내가 좋아하는 노래"
        );
        
        if (favoritePlaylist) {
          setLikedSongs(favoritePlaylist.songs); // '내가 좋아하는 노래'의 노래 목록을 상태로 저장
        }
      } catch (error) {
        console.error("🚨 오류 발생:", error);
      }
    };

    fetchLikedSongs();
  }, []);

  return (
    <LikedSongsContext.Provider value={{ likedSongs, setLikedSongs }}>
      {children}
    </LikedSongsContext.Provider>
  );
};