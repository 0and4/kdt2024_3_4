import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const Wrapper = styled.div`
  position: relative;
`;
const Container = styled.div`
  width: calc(100% - 250px);
  @media (max-width: 768px) {
    width: 100%;
  }
`;
function ArtistInfo() {
  const { artistName } = useParams();
  return (
    <Wrapper>
      <Container>
        <div>
          <h1>Artist Info - {artistName}</h1>
          {/* 아티스트 정보 표시 */}
        </div>
      </Container>
    </Wrapper>
  );
}
export default ArtistInfo;
