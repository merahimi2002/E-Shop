"use client";

import { CldUploadWidget } from "next-cloudinary";

const UploadPage = () => {
  return (
    <CldUploadWidget uploadPreset="DBimage">
      {({ open }) => (
        <button onClick={() => open()} className="btn btn-primary mt-5">
          Upload
        </button>
      )}
    </CldUploadWidget>
  );
};

export default UploadPage;
