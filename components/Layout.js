import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import Showcase from "./Showcase";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Body>
        <Header />
        {router.pathname === "/" && <Showcase />}

        <Container>{children}</Container>
        <Footer />
      </Body>
    </div>
  );
}

const Body = styled.div`
  min-height: 100%;

  a {
    font-size: 1.3rem;
    text-decoration: none;
    transition: 0.2s ease;
  }
`;

const Container = styled.main`
  min-height: 60vh;
  max-width: 113rem;
  padding: 2rem 3rem;
  margin: 0 auto 3rem auto;
  overflow: auto;

  @media only screen and (max-width: 768px) {
    padding: 0 1rem;
  }
`;

Layout.defaultProps = {
  title: "Events | Find the hottest parties",
  description: "Find the latest Events and other music festivals",
  keywords: "music, festivals, dj, edm, events",
};
