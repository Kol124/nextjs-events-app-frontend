import moment from "moment";
import { FaImage, FaPencilAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseCookies } from "@/helpers/index";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import styled from "styled-components";
import { Button } from "@/components/Button";
import ImageUpload from "@/components/ImageUpload";
import { API_URL } from "@/config/index";

export default function EditEventPage({ evt, token }) {
  const [values, setValues] = useState({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  });

  const [imagePreview, setImagePreview] = useState(
    evt.image ? evt.image.formats.thumbnail.url : null
  );
  const [showModal, setShowModal] = useState(false);

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

    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error("Unauthorized");
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

  const imageUploaded = async (e) => {
    const res = await fetch(`${API_URL}/events/${evt.id}`);
    const data = await res.json();
    setImagePreview(data.image.formats.thumbnail.url);
    setShowModal(false);
  };

  return (
    <Layout title="Edit Event">
      <Link href="/events">Go Back</Link>
      <Edit>
        <h1>
          <FaPencilAlt /> Edit Event
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
                value={moment(values.date).format("yyyy-MM-DD")}
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

          <Button type="submit">Update Event</Button>
        </form>

        <aside>
          {imagePreview ? (
            <Image src={imagePreview} alt={evt.name} height={100} width={170} />
          ) : (
            <div>
              <p>No image uploaded</p>
            </div>
          )}

          <div>
            <Button secondary onClick={() => setShowModal(true)}>
              <FaImage /> Edit Image
            </Button>
          </div>

          <Modal show={showModal} onClose={() => setShowModal(false)}>
            <ImageUpload
              evtId={evt.id}
              imageUploaded={imageUploaded}
              token={token}
            />
          </Modal>
        </aside>
      </Edit>
    </Layout>
  );
}

const Edit = styled.section`
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

  aside {
    margin-top: 2rem;
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

export async function getServerSideProps({ params: { id }, req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/events/${id}`);
  const evt = await res.json();

  return {
    props: {
      evt,
      token,
    },
  };
}
