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

  return Categories?.title;
};

export default CategoryIdToName;
