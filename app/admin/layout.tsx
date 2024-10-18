import AdminSidebar from "./sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-7">
      <div className="col-span-1">
        <AdminSidebar />
      </div>
      <div className="col-span-6 p-10">{children}</div>
    </div>
  );
}
