const LoadingCategoryFilterPage = () => {
  const Products = [1, 2, 3, 4];
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 gap-4 my-8">
          <div className="skeleton w-40 h-12"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Products.map(() => (
            <div>
              <div className="skeleton w-full h-60 mb-5"></div>
              <div className="flex flex-col gap-4">
                <div className="skeleton w-40 h-7"></div>
                <div className="skeleton w-28 h-5"></div>
                <div className="skeleton w-20 h-5"></div>
                <div className="skeleton w-16 h-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoadingCategoryFilterPage;
