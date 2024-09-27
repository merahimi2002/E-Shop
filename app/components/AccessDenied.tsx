const AccessDenied = () => {
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col flex-center">
            <h2 className="text-9xl text-secondary font-semibold leading-tight">
              Access Denied
            </h2>
          </div>
          <img
            src="https://res.cloudinary.com/eshop-project/image/upload/v1727418480/access_eg6lqk.png"
            alt="Access Denied"
          />
        </div>
      </div>
    </section>
  );
};

export default AccessDenied;
