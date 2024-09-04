const LoadingProductPage = () => {
  const Products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Products.map(() => (
            <div className="skeleton">
              <figure>
                <div className="skeleton  w-full h-64 pb-4" />
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoadingProductPage;
