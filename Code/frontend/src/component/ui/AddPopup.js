import React from "react";
import styled from "styled-components";
import { CiCirclePlus, CiCircleRemove } from "react-icons/ci";

const PopupWrapper = styled.div`
  position: absolute;
  top: ${(props) => props.position.top}px;
  left: ${(props) => props.position.left}px;
  z-index: 10;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 180px;
`;
const CreateDiv = styled.div`
  display: flex;
  flex-direction: row;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  gap: 0px;
  border-bottom: 1px solid #ccc;
  padding-right: 3px;
  cursor: pointer;
  font-weight: bold;
  p {
    margin: 0;
    font-size: 0.8rem;
  }
  &:hover {
    color: #717171;
  }
`;
const PlusBtn = styled.button`
  width: 20px;
  height: 20px;
  background-color: #fff;
  border: none;
  font-size: 1em;
  cursor: pointer;
`;
const CloseBtn = styled.button`
  width: 20px;
  height: 20px;
  padding: 0;
  background-color: #fff;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  margin-top: -30px;
  &:hover {
    color: #68009b;
  }
`;
const PlaylistOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
  div {
    width: 40px;
    height: 40px;
    background-color: #ccc;
  }
  p {
    margin: 0;
    font-size: 0.8rem;
    text-align: left;
  }
  input[type="checkbox"] {
    margin-left: 15px;
  }
`;
const SaveBtn = styled.button`
  float: right;
  padding: 5px 10px;
  background-color: #68009b;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

function AddPopup({ position, onClose, playlists }) {
  return (
    <PopupWrapper position={position}>
      <div>
        <CreateDiv style={{ marginBottom: "10px" }}>
          <PlusBtn>
            <CiCirclePlus />
          </PlusBtn>
          <p>새 플레이리스트 생성</p>
          <CloseBtn onClick={onClose}>
            <CiCircleRemove />
          </CloseBtn>
        </CreateDiv>
        {playlists.map((playlist, index) => (
          <PlaylistOption key={index}>
            <div></div>
            <p>{playlist.name}</p>
            <input type="checkbox" />
          </PlaylistOption>
        ))}
      </div>
      <SaveBtn>저장</SaveBtn>
    </PopupWrapper>
  );
}

export default AddPopup;
