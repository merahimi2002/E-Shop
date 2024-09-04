const ProductDetailsPage = () => {
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 lg:col-span-1 h-screen">
            <div className="skeleton w-full h-1/2 rounded-xl"></div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="flex flex-col gap-4">
              <div className="skeleton w-80 h-12"></div>
              <div className="skeleton w-60 h-8"></div>
              <div className="skeleton w-40 h-5"></div>
              <div className="skeleton w-20 h-4"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
