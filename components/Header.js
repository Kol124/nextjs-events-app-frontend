import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useContext } from "react";
import Link from "next/link";
import Search from "./Search";
import styled from "styled-components";
import AuthContext from "@/context/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Navigation>
      <Logo>
        <Link href="/">
          <span>FESTA</span>
        </Link>
      </Logo>

      <Search />

      <nav>
        <ul>
          <li>
            <Link href="/events">
              <a>Events</a>
            </Link>
          </li>
          {user ? (
            // If logged in
            <>
              <User>
                <UserImg src="/images/user.png" alt="User" />
                <DropDown>
                  <li>
                    <Link href="/events/add">
                      <a>Add Event</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/account/dashboard">
                      <a>Dashboard</a>
                    </Link>
                  </li>
                  <li>
                    <button onClick={() => logout()}>
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </DropDown>
              </User>
            </>
          ) : (
            // If logged out
            <>
              <li>
                <Link href="/account/login">
                  <button>
                    <FaSignInAlt /> Login
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </Navigation>
  );
}

const Navigation = styled.header`
  color: #333;
  display: flex;
  background: #f6f6f6;
  justify-content: space-around;
  align-items: center;
  height: 8.5rem;

  @media (max-width: 1024px) {
    padding: 0 2rem;
    justify-content: space-between;
  }

  nav > ul {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;

    > li {
      font-weight: 700;
      transition: 0.3s ease;

      &:not(:last-of-type) {
        margin-right: 20px;
      }

      a {
        font-size: 1.6rem;
        color: #333;

        :hover {
          color: rgb(244, 135, 50);
        }
      }
    }

    button {
      border: none;
      font: inherit;
      color: #f9f9f9;
      font-size: 1.4rem;
      border-radius: 2px;
      background-color: rgb(244, 135, 50);
      transition: 0.2s ease;
      padding: 7px 12px;
      cursor: pointer;
      outline: none;

      &:hover {
        background: #f6f6f6;
        color: rgb(244, 135, 50);
        border: 1px solid rgb(244, 135, 50);
      }
    }
  }
`;

const DropDown = styled.ul`
  top: 5rem;
  right: 0px;
  list-style: none;
  font-size: 1.5rem;
  border-radius: 2px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  box-shadow: 0.5rem 0.7rem 0.9rem rgba(30, 30, 30, 0.3);
  width: max-content;
  position: absolute;
  padding: 1.5rem;
  z-index: 100;
  opacity: 0;

  li {
    font-weight: 400;

    a {
      font-size: 1.5rem !important;
    }
  }

  button {
    margin-top: 1rem !important;
    font-weight: 600 !important;
    font-size: 1.2rem !important;
    padding: 5px 10px !important;
  }
`;

const User = styled.li`
  position: relative;
  cursor: pointer;
  height: 4.8rem;
  width: 4.8rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 0.6s;
    }
  }
`;

const UserImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid #333;
`;

const Logo = styled.div`
  font-size: 3rem;
  text-transform: uppercase;
  font-family: "Shadows Into Light", sans-serif;
  cursor: pointer;
`;
