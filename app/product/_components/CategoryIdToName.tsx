import prisma from "@/prisma/client";

const CategoryIdToName = async ({ Id }: { Id: number | null }) => {
  if (Id == null) {
    return null;
  }
  const Categories = await prisma.category.findUnique({
    where: {
      id: Id,
    },
  });

  return <p>{Categories?.title}</p>;
};

export default CategoryIdToName;
