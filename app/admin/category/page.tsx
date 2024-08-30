import { FiEdit } from "react-icons/fi";
import prisma from "@/prisma/client";
import Link from "next/link";


const AdminCategory = async () => {
  const Categories = await prisma.category.findMany();
  return (
    <section>
      <div className="container">
        <div className="overflow-x-auto">
          <table className="table table-auto table-striped table-hover thead-primary">
            <thead>
              <tr className="text-center">
                <th>Category</th>
                <th>Title</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {Categories.map((category) => (
                <tr key={category.id} className="text-center">
                  <td>
                    <img
                      src={category.imageUrl}
                      alt={category.title}
                      className="object-cover w-16 h-16 m-auto"
                    />
                  </td>
                  <td>{category.title}</td>
                  <td>
                    <div className="flex justify-center items-center gap-4">
                      <Link href={`/admin/category/update/${category.slug}`}>
                        <button className="btn btn-primary w-fit text-xl px-4">
                          <FiEdit />
                        </button>
                      </Link>
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

export default AdminCategory;
