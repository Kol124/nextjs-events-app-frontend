import { useState } from "react";
import styled from "styled-components";
import { API_URL } from "@/config/index";
import { Button } from "@/components/Button";

export default function ImageUpload({ evtId, imageUploaded, token }) {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "events");
    formData.append("refId", evtId);
    formData.append("field", "image");

    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      imageUploaded();
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <Upload>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <input type="file" onChange={handleFileChange} />
        </InputContainer>
        <Button type="submit">Upload</Button>
      </form>
    </Upload>
  );
}

const Upload = styled.div`
  text-align: center;
`;

const InputContainer = styled.section`
  margin-bottom: 2rem;

  input[type="file"] {
    display: block;
    width: 100%;
    height: 40px;
    padding: 5px;
    color: inherit;
    display: block;
    font-size: 14px;
    border-radius: 2px;
    font-family: inherit;
    padding: 1.5rem 2rem;
    border: 1px solid #ddd;
    background-color: #f9f9f9;
    border-bottom: 1px solid transparent;

    &::-webkit-input-placeholder {
      color: #f1f1f1;
    }
  }
`;
