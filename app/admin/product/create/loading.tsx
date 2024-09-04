const CreateProductLoading = () => {
  return (
    <section>
      <div className="container">
        <div className="flex flex-col gap-4">
          <div className="skeleton w-96 h-10"></div>
          <div className="skeleton w-96 h-96 mb-5"></div>
          <div className="skeleton w-48 h-10"></div>
          <div className="skeleton w-96 h-10"></div>
          <div className="skeleton w-96 h-10"></div>
          <div className="skeleton w-40 h-12 mt-5"></div>
        </div>
      </div>
    </section>
  );
};

export default CreateProductLoading;
