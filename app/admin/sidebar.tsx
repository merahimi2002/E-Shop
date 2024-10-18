import Link from "next/link";

const AdminSidebar = () => {
  return (
    <section className="bg-primary w-full h-screen -mt-5">
      <ul>
        <li>
          <Link href="/admin/product">Product</Link>
        </li>
        <li>
          <Link href="/admin/category">Category</Link>
        </li>
        <li>
          <Link href="/admin/user">User</Link>
        </li>
      </ul>
    </section>
  );
};

export default AdminSidebar;
