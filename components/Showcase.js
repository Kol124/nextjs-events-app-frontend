import styled from "styled-components";

export default function Showcase() {
  return (
    <HeaderImage>
      <h1>Welcome To The Party!</h1>
      <h2>Find the hottest events</h2>
    </HeaderImage>
  );
}

const HeaderImage = styled.div`
  text-align: center;
  height: 80vh;
  width: 100%;
  color: #fff;
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background: #000 url("/images/showcase-1.jpg") no-repeat center center;

  & * {
    z-index: 20;
  }

  &::after {
    position: absolute;
    height: 100%;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }

  h1 {
    font-family: "Shadows Into Light", sans-serif;
    font-size: 8rem;
    margin-bottom: 0;

    @media only screen and (max-width: 768px) {
      font-size: 5rem;
    }
  }

  h2 {
    font-size: 2.5rem;
    margin: 0;

    @media only screen and (max-width: 480px) {
      font-size: 2rem;
    }
  }
`;
