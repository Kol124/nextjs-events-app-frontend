import { parseCookies } from "@/helpers/index";
import { FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styled from "styled-components";
import { Button } from "@/components/Button";

export default function AddEventPage({ token }) {
  const [values, setValues] = useState({
    name: "",
    performers: "",
    venue: "",
    address: "",
    date: "",
    time: "",
    description: "",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      toast.error("Please fill in all fields");
    }

    const res = await fetch(`${API_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error("No token included");
        return;
      }
      toast.error("Something Went Wrong");
    } else {
      const evt = await res.json();
      router.push(`/events/${evt.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">
        <ButtonLink>
          <span> &larr;</span> Go Back
        </ButtonLink>
      </Link>
      <Add>
        <h1>
          <FaPlus /> Add Event
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <Grid>
            <InputContainer>
              <label htmlFor="name">Event Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={values.name}
                onChange={handleInputChange}
              />
            </InputContainer>
            <InputContainer>
              <label htmlFor="performers">Performers</label>
              <input
                type="text"
                name="performers"
                id="performers"
                value={values.performers}
                onChange={handleInputChange}
              />
            </InputContainer>
            <InputContainer>
              <label htmlFor="venue">Venue</label>
              <input
                type="text"
                name="venue"
                id="venue"
                value={values.venue}
                onChange={handleInputChange}
              />
            </InputContainer>
            <InputContainer>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                value={values.address}
                onChange={handleInputChange}
              />
            </InputContainer>
            <InputContainer>
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                id="date"
                value={values.date}
                onChange={handleInputChange}
              />
            </InputContainer>
            <InputContainer>
              <label htmlFor="time">Time</label>
              <input
                type="text"
                name="time"
                id="time"
                value={values.time}
                onChange={handleInputChange}
              />
            </InputContainer>
          </Grid>

          <InputContainer>
            <label htmlFor="description">Event Description</label>
            <textarea
              type="text"
              name="description"
              id="description"
              value={values.description}
              onChange={handleInputChange}
            ></textarea>
          </InputContainer>

          <Button type="submit">Add Event</Button>
        </form>
      </Add>
    </Layout>
  );
}

const Add = styled.div`
  margin: 2rem 0 auto;
  background-color: #f6f6f6;
  padding: 3rem 3rem 2.5rem 3rem;
  box-shadow: 0.5rem 1rem 1.3rem rgba(220, 220, 220, 0.4);

  h1 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 2rem;
    text-transform: uppercase;
  }

  p {
    margin-top: 1.4rem;
    font-size: 1.5rem;
    text-align: center;

    a {
      color: rgb(244, 135, 50);
    }
  }
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 2rem;
  gap: 3rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ButtonLink = styled.a`
  transition: all 0.2s;
  font-size: 1.6rem;
  padding: 8px;
  border: none;
  color: #000;
  outline: none;
  cursor: pointer;
  margin-bottom: 1rem;
  display: inline-block;

  & span {
    margin-right: 3px;
    transition: margin-right 0.2s;
  }

  &:hover {
    color: rgb(244, 135, 50);

    span {
      margin-right: 10px;
    }
  }

  &:focus {
    outline: none;
  }
`;

const InputContainer = styled.section`
  margin-bottom: 1rem;

  label {
    font-size: 1.6rem;
    font-weight: 500;
    display: block;
    transition: all 0.3s;
    margin-bottom: 7px;
  }

  textarea,
  input[type="text"],
  input[type="date"],
  input[type="email"],
  input[type="password"] {
    display: block;
    width: 100%;
    height: 4rem;
    padding: 5px;
    color: inherit;
    display: block;
    font-size: 1.4rem;
    border-radius: 2px;
    font-family: inherit;
    padding: 1.5rem 2rem;
    transition: all 0.3s;
    border: 1px solid #ddd;
    background-color: #f9f9f9;
    border-bottom: 1px solid transparent;

    &:focus {
      outline: none;
      background-color: #fff;
      border-bottom: 1px solid #aaa;
    }

    &:focus:invalid {
      border-bottom: 1px solid #aaa;
    }

    &::-webkit-input-placeholder {
      color: #f1f1f1;
    }
  }

  textarea {
    width: 100%;
    height: 15rem;
  }
`;

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  return {
    props: {
      token,
    },
  };
}
