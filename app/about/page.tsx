import { About } from "./about";

const AboutPage = () => {
  return (
    <>
      <About />
      <section>
        <div className="container">
          <div className="gird grid-cols-1 gap-4">
            <div>
              <h2 className="Titr">What We Offer</h2>
              <p className="w-full 2xl:w-3/4">
                Our store is stocked with a wide range of products from leading
                brands, including the latest laptops, desktops, smartphones,
                tablets, and accessories. We cater to a diverse clientele,
                offering products that meet the needs of both casual users and
                tech-savvy professionals.
              </p>
              <ul className="list-disc">
                <li>
                  Laptops & Computers: From powerful gaming rigs to sleek
                  ultrabooks, we have it all.
                </li>
                <li>
                  Mobile Devices: Explore the latest smartphones and tablets
                  that keep you connected and productive on the go.
                </li>
                <li>
                  Accessories: Enhance your tech experience with our selection
                  of peripherals, cases, chargers, and more.
                </li>
              </ul>
              <h2 className="Titr mt-8">Our Commitment</h2>
              <p className="w-full 2xl:w-3/4">
                We are more than just a retail store; we are your tech partners.
                Our knowledgeable staff is always ready to help you make
                informed decisions, ensuring you get the best value for your
                money. We also offer after-sales support, including repairs,
                warranties, and technical assistance, to ensure your devices
                continue to perform at their best.
              </p>
              <p className="w-full 2xl:w-3/4">
                As technology continues to evolve, our vision is to become a
                leading name in the electronics retail industry, known for our
                reliability, innovation, and customer-centric approach. We aim
                to build lasting relationships with our customers by
                consistently exceeding their expectations.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-10">
            <div className="flex-center h-full shadow-md border-solid border-4 rounded-lg m-2 border-primary p-6 text-center duration-300 hover:-translate-y-2 hover:rounded-xl hover:bg-gradient-to-b from-accent to-primary">
              <h5 className="Titr text-xl mb-5">Quality Assurance</h5>
              <p className="">
                Get the latest technology at prices that won’t break the bank.
              </p>
            </div>
            <div className="flex-center h-full shadow-md border-solid border-4 rounded-lg m-2 border-primary p-6 text-center duration-300 hover:-translate-y-2 hover:rounded-xl hover:bg-gradient-to-b from-accent to-primary">
              <h5 className="Titr text-xl mb-5 "> Competitive Pricing</h5>
              <p>We source only genuine products from trusted brands.</p>
            </div>
            <div className="flex-center h-full shadow-md border-solid border-4 rounded-lg m-2 border-primary p-6 text-center duration-300 hover:-translate-y-2 hover:rounded-xl hover:bg-gradient-to-b from-accent to-primary">
              <h5 className="Titr text-xl mb-5 ">Customer Satisfaction</h5>
              <p>
                We pride ourselves on delivering a seamless shopping experience,
                both in-store and online.
              </p>
            </div>
            <div className="flex-center h-full shadow-md border-solid border-4 rounded-lg m-2 border-primary p-6 text-center duration-300 hover:-translate-y-2 hover:rounded-xl hover:bg-gradient-to-b from-accent to-primary">
              <h5 className="Titr text-xl mb-5 text-center">Tech Expertise</h5>
              <p>
                Our team stays updated with the latest trends and technologies
                to better serve your needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
