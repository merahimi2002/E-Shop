import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { FcManager } from "react-icons/fc";
import { GrUserAdmin } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import DeleteUser from "./_components/DeleteUser";
import MakeUserAdmin from "./_components/MakeUserAdmin";
import MakeAdminUser from "./_components/MakeAdminUser";
import prisma from "@/prisma/client";
import AccessDenied from "@/app/components/AccessDenied";

const AdminUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    notFound();
  }

  const account = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
  });

  if (account?.role === "USER" || account?.role === "ADDPRODUCT") {
    return <AccessDenied />;
  }

  const Users = await prisma.user.findMany({
    orderBy: {
      role: "asc",
    },
  });

  return (
    <section>
      <div className="container">
        <div className="overflow-x-auto">
          <table className="table table-auto table-striped table-hover thead-primary mt-5">
            <thead>
              <tr className="text-center">
                <th>User</th>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {Users.map((user) => (
                <tr key={user.email} className="text-center">
                  <td>
                    {user.image ? (
                      <img
                        src={user.image}
                        className="object-cover w-16 h-16 m-auto"
                      />
                    ) : (
                      <FaUser className="w-14 h-14 p-2 m-auto text-base-200" />
                    )}
                  </td>
                  <td>
                    {user.firstName && user.lastName
                      ? `${user.firstName} ${user.lastName}`
                      : user.firstName || user.lastName || "-"}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    {user.role === "OWNER" ? (
                      <div className="flex justify-center items-center gap-4">
                        <FcManager className="text-5xl mx-4" />
                      </div>
                    ) : null}
                    {user.role === "ADMIN" ? (
                      <div className="">
                        {account?.role === "OWNER" ? (
                          <div className="flex justify-center items-center gap-4">
                            <MakeAdminUser email={user.email} />
                            <DeleteUser email={user.email} />
                          </div>
                        ) : (
                          <div className="flex justify-center items-center gap-4">
                            <GrUserAdmin className="text-success text-4xl font-semibold mx-3" />
                          </div>
                        )}
                      </div>
                    ) : null}
                    {user.role === "USER" ? (
                      <div className="flex justify-center items-center gap-4">
                        <MakeUserAdmin email={user.email} />
                        <DeleteUser email={user.email} />
                      </div>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminUser;
