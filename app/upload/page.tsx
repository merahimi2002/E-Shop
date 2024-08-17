"use client";

import { CldUploadWidget, CldImage } from "next-cloudinary";
import { useState } from "react";

interface CloudinaryResult {
  public_id: string;
}

const UploadPage = () => {
  const [publicId, setPublicId] = useState("");
  return (
    <>
      {publicId && (
        <CldImage src={publicId} alt="pic" width={270} height={180} />
      )}
      <CldUploadWidget
        uploadPreset="DBimage"
        options={{
          sources: ["local"],
          multiple: false,
          maxFiles:2,
          maxFileSize: 1000000
        }}
        onSuccess={(result, { widget }) => {
          const info = result.info as CloudinaryResult;
          setPublicId(info.public_id);
        }}
      >
        {({ open }) => (
          <button onClick={() => open()} className="btn btn-primary mt-5">
            Upload
          </button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;
