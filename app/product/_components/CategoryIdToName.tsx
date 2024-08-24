import prisma from "@/prisma/client";

interface CategoryIdToNameProps {
  Id: number | null;
}

const CategoryIdToName = async ({ Id }: CategoryIdToNameProps) => {
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
