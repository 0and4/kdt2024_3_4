import styled from "styled-components";
import { FaChevronRight } from "react-icons/fa";
const Wrapper = styled.div`
  width: 100%;
  position: relative;
  overflow-x: hidden;
`;

const Container = styled.div`
  width: 100%;
  margin: 20px;
  display: flex;
  flex-direction: column;
  div {
    margin-left: 10px;
  }
  max-width: 100%;
`;
function Search() {
  return (
    <Wrapper>
      <Container>
        <p>
          '<span>가을</span>'(으)로 검색 결과
        </p>
        <div>
          <div>
            <p>곡명으로 검색</p>
            <button>
              더보기 <FaChevronRight />
            </button>
            <h2>노래목록</h2>
          </div>
          <div>
            <p>앨범명으로 검색</p>
            <button>
              더보기 <FaChevronRight />
            </button>
            <h2>앨범목록</h2>
          </div>
          <div>
            <p>아티스트명으로 검색</p>
            <button>
              더보기 <FaChevronRight />
            </button>
            <h2>아티스트목록</h2>
          </div>
        </div>
      </Container>
    </Wrapper>
  );
}
export default Search;
