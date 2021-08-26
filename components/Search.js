import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function Search() {
  const [term, setTerm] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/events/search?term=${term}`);
    setTerm("");
  };

  return (
    <SearchBox onSubmit={handleSubmit}>
      <Input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search Events"
      />
      <button>
        <FaSearch />
      </button>
    </SearchBox>
  );
}

const SearchBox = styled.form`
  flex: 0 0 35%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    flex: 0 0 40%;
  }

  button {
    color: #333;
    border: none;
    background-color: transparent;

    &:focus {
      outline: none;
    }

    &:active {
      transform: translateY(5px);
    }
  }
`;

const Input = styled.input`
  border: 1px solid #f1f1f1;
  border-radius: 100px;
  font-family: inherit;
  padding: 1rem 2rem;
  width: 90%;
  color: inherit;
  transition: all 0.2s;
  margin-right: -3.25rem;
  background-color: #f9f9f9;

  &:focus {
    outline: none;
    width: 100%;
    background-color: #fff;
  }

  &::-webkit-input-placeholder {
    font-weight: 100;
    color: #aaa;
    font-size: 1.5rem;
  }
`;
