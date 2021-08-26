import Image from "next/image";
import styled from "styled-components";

export default function Footer() {
  return (
    <Foot>
      <FooterImages>
        <Image
          src="/images/red-bull-elecktropedia.png"
          alt="Red Bull"
          width={95}
          height={60}
        />
        <Image src="/images/StuBru.jpg" alt="Stru Bru" width={70} height={70} />
        <Image src="/images/pickx.png" alt="Pickx" width={60} height={60} />
        <Image
          src="/images/proximus.png"
          alt="Proximus"
          width={120}
          height={25}
        />
        <Image
          src="/images/blox-blanc.jpg"
          alt="Blox Blanc"
          width={90}
          height={45}
        />
        <Image src="/images/tarmac.png" alt="Tarmac" width={60} height={60} />
      </FooterImages>
      <FooterText>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
        {/* <p>
            <Link href="/about">About This Project</Link>
          </p> */}
        <p>Copyright &copy; DJ Events 2021</p>
      </FooterText>
    </Foot>
  );
}

const Foot = styled.footer`
  background: #f6f6f6;
  position: relative;
  width: 100%;
  clear: both;
  margin-top: 2rem;
  text-align: center;
  padding: 1.2rem 0.7rem 0;

  a {
    margin-top: 2rem;
    color: #333;
  }

  p {
    font-size: 1.5rem;
    margin: 5px 0 0;
  }
`;

const FooterImages = styled.div`
  width: 85%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #ddd;
  padding: 2rem 0 3.2rem 0;
  flex-wrap: wrap;
  margin: 0 auto;

  & > * {
    margin-right: 4rem !important;

    @media only screen and (max-width: 768px) {
      margin-bottom: 2rem !important;
    }
  }
`;

const FooterText = styled.section`
  padding: 3rem 0.5rem 0;
`;