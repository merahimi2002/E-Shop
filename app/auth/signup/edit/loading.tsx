import React from "react";

const SignUpUpdateLoading = () => {
  return (
    <section>
      <div className="container">
        <div className="flex flex-center m-auto w-full md:w-1/3 p-10">
          <div className="flex flex-center flex-row gap-4 mb-5">
            <div className="skeleton m-auto w-14 h-14"></div>
            <div className="skeleton m-auto w-28 h-9"></div>
          </div>
          <div className="flex flex-col gap-7 my-5">
            <div className="skeleton m-auto w-96 h-12"></div>
            <div className="skeleton m-auto w-96 h-12"></div>
            <div className="skeleton m-auto w-96 h-12"></div>
            <div className="skeleton m-auto w-96 h-12"></div>
            <div className="skeleton m-auto w-96 h-12"></div>
            <div className="skeleton m-auto w-96 h-12"></div>
            <div className="skeleton m-auto w-96 h-12"></div>
            <div className="skeleton m-auto w-96 h-12"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpUpdateLoading;
