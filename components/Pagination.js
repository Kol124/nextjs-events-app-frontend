import Link from "next/link";
import styled from "styled-components";
import { PER_PAGE } from "@/config/index";

export default function Pagination({ page, total }) {
  const lastPage = Math.ceil(total / PER_PAGE);

  return (
    <PaginationContainer>
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <PaginationButton>Prev</PaginationButton>
        </Link>
      )}

      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <PaginationButton>Next</PaginationButton>
        </Link>
      )}
    </PaginationContainer>
  );
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PaginationButton = styled.a`
  color: #f9f9f9;
  padding: 1rem 2rem;
  text-decoration: none;
  background: rgb(244, 135, 50);
  transition: 0.2s ease;
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    background: transparent;
    color: rgb(244, 135, 50);
    border: 1px solid rgb(244, 135, 50);
  }
`;
