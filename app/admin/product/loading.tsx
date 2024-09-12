const ProductAdminLoading = () => {
  const Products = [1, 2, 3, 4, 5, 6];
  return (
    <section>
      <div className="container">
        <div className="overflow-x-auto">
          <div className="flex gap-4 mb-5">
            <div className="skeleton w-48 h-12"></div>
          </div>
          <table className="table table-auto table-striped table-hover thead-primary">
            <thead>
              <tr className="text-center">
                <th>Product</th>
                <th>Title</th>
                <th>Description</th>
                <th>Category</th>
                <th>Price</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {Products.map((product) => (
                <tr>
                  <td>
                    <div className="skeleton m-auto w-10 h-10"></div>
                  </td>
                  <td>
                    <div className="skeleton m-auto w-20 h-5"></div>
                  </td>
                  <td>
                    <div className="skeleton m-auto w-20 h-5"></div>
                  </td>
                  <td>
                    <div className="skeleton m-auto w-20 h-5"></div>
                  </td>
                  <td>
                    <div className="skeleton m-auto w-20 h-5"></div>
                  </td>
                  <td>
                    <div className="flex justify-center items-center gap-4">
                      <div className="skeleton w-12 h-12"></div>
                      <div className="skeleton w-12 h-12"></div>
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

export default ProductAdminLoading;