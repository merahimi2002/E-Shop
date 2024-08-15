"use client";

import { FaRegImage } from "react-icons/fa6";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { PiCoinsThin } from "react-icons/pi";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const AddProductPage = () => {
  return (
    <div className="container">
      <div className="flex flex-col gap-4 my-5">
        <label className="w-full md:w-1/3 input input-bordered flex items-center gap-2">
          <MdDriveFileRenameOutline />
          <input type="text" className="grow" placeholder="Name" />
        </label>
        <SimpleMDE placeholder="Description" className="w-full md:w-1/3" />
        <label className="w-full md:w-1/3 input input-bordered flex items-center gap-2">
          <FaRegImage />
          <input type="text" className="grow" placeholder="Image" />
        </label>
        <label className="w-full md:w-1/3 input input-bordered flex items-center gap-2">
          <PiCoinsThin />
          <input type="number" className="grow" placeholder="Price" />
        </label>
        <select className="select w-full md:w-1/3 input-bordered">
          <option disabled selected>
            Category
          </option>
          <option>Homer</option>
        </select>
        <button className="btn btn-secondary w-fit mt-5">Add New Product</button>
      </div>
    </div>
  );
};

export default AddProductPage;
