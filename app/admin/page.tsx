import { IoSettingsSharp } from "react-icons/io5";
import Link from "next/link";

const AdminPage = () => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button rounded-none mt-5">
          <IoSettingsSharp />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-primary m-0  min-h-full w-80 p-4 rounded-xl">
          {/* Sidebar content here */}
          <li>
            <Link href="/admin/product">Product</Link>
          </li>
          <li>
            <Link href="/admin/category">Category</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
