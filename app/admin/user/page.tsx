import { FaUser } from "react-icons/fa";
import prisma from "@/prisma/client";

const AdminUser = async () => {
  const Users = await prisma.user.findMany();
  return (
    <section>
      <div className="container">
        <div className="overflow-x-auto">
          <table className="table table-auto table-striped table-hover thead-primary mt-5">
            <thead>
              <tr className="text-center">
                <th>User</th>
                <th>Name</th>
                <th>Email</th>
                <th>Delete</th>
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
                    {user.firstName || user.lastName
                      ? user.firstName + " " + user.lastName
                      : "-"}
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <div className="flex justify-center items-center gap-4">
                      {/* <DeleteCategory slug={category.slug} /> */}
                    </div>
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
