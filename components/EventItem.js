import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

export default function EventItem({ evt }) {
  const excerpt = evt.description.slice(0, 170).concat(" ...");

  return (
    <Card>
      <ImageContainer>
        <Image
          src={
            evt.image
              ? evt.image.formats.medium.url
              : "/images/event-default.png"
          }
          alt={evt.name}
          width={500}
          height={333}
        />
      </ImageContainer>

      <CardInfo>
        <span>
          {new Date(evt.date).toLocaleDateString("en-US")} at {evt.time}
        </span>
        <h2>{evt.name}</h2>
        <p>{excerpt}</p>
        <Link href={`/events/${evt.slug}`}>
          <ButtonLink>Details</ButtonLink>
        </Link>
      </CardInfo>
    </Card>
  );
}

const Card = styled.div`
  padding: 0;
  display: flex;
  margin: 5rem 0;
  align-items: center;
  background-color: #f6f6f6;
  justify-content: space-between;
  box-shadow: 0.5rem 1rem 1.3rem rgba(220, 220, 220, 0.4);
`;

const ImageContainer = styled.div`
  flex-basis: 45%;
  margin: 0;
  padding: 0;
  clip-path: polygon(0 0, 100% 0%, 75% 100%, 0% 100%);

  & > * {
    display: block !important;
  }
`;

const CardInfo = styled.div`
  flex-basis: 50%;
  padding-right: 1rem;

  h2 {
    line-height: 1.2;
    font-size: 2.5rem;
    margin-bottom: 1rem;

    @media only screen and (max-width: 1024px) {
      margin-bottom: 2rem;
    }

    @media only screen and (max-width: 480px) {
      font-size: 2rem;
    }
  }

  p {
    line-height: 1.4;
    font-size: 1.9rem;
    margin-bottom: 1.5rem;

    @media only screen and (max-width: 1024px) {
      display: none;
    }
  }

  span {
    font-size: 1.6rem;
  }
`;

const ButtonLink = styled.a`
  padding: 1rem 2rem;
  font-size: 1.6rem;
  color: #fff;
  border: 0;
  cursor: pointer;
  border-radius: 2px;
  transition: 0.3s ease;
  background-color: #000;

  &:hover {
    background-color: #f6f6f6;
    border: 1px solid #000;
    color: #000;
  }
`;
