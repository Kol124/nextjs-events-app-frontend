import Link from "next/link";
import styled from "styled-components";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

export default function DashboardItem({ evt, handleDelete }) {
  return (
    <ItemContainer>
      <Link href={`/events/${evt.slug}`}>
        <Name>{evt.name}</Name>
      </Link>

      <Link href={`/events/edit/${evt.id}`}>
        <a>
          <FaPencilAlt /> <span>Edit Event</span>
        </a>
      </Link>
      <a href="#" onClick={() => handleDelete(evt.id)}>
        <FaTimes /> <span>Delete</span>
      </a>
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  border: 2px #f1f1f1 solid;
  margin: 1.5rem 0 0;
  padding: 1rem;
  display: grid;
  border-radius: 5px;
  background-color: #f9f9f9;
  grid-template-columns: 3fr 1fr 1fr;

  a {
    text-align: center;
    color: #f48732;
    transition: 0.3s ease;

    &:hover {
      color: #333;
    }
  }
`;

const Name = styled.span`
  font-size: 1.8rem;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;
