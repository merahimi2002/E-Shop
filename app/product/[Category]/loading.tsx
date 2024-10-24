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
              <div className="skeleton w-full h-60 mb-8"></div>
              <div className="flex flex-col gap-4 p-5">
                <div className="skeleton w-48 h-7"></div>
                <div className="flex flex-col gap-2 my-5">
                  <div className="skeleton w-full h-3"></div>
                  <div className="skeleton w-60 h-3"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="skeleton w-32 h-7"></div>
                  <div className="skeleton w-20 h-7"></div>
                </div>
                <div className="flex gap-4 flex-center justify-between flex-row my-5">
                  <div className="skeleton w-40 h-12"></div>
                  <div className="flex gap-3 items-center">
                    <div className="skeleton w-8 h-8"></div>
                    <div className="skeleton w-8 h-8"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoadingCategoryFilterPage;
