import React, { useEffect } from "react";
import AOS from "aos";

const Publications = () => {
  useEffect(() => {
    AOS.refresh(); // Ensures animation works after mount
  }, []);

  return (
    <div className="container py-5 text-white">
      <h1 className="text-center fw-bold mb-5" data-aos="fade-down">
        Publication
      </h1>

      <div
        className="bg-danger rounded-4 p-4 mx-auto"
        style={{ maxWidth: "1280px" }}
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="row align-items-center g-4">
          {/* Left: Logo */}
          <div className="col-md-4 text-center" data-aos="zoom-in" data-aos-delay="200">
            <img
              src="/images/ghtc_logo.jpg"
              alt="IEEE GHTC Logo"
              className="img-fluid rounded"
              style={{ maxWidth: "100%" }}
            />
          </div>

          {/* Right: Content */}
          <div className="col-md-8" data-aos="fade-left" data-aos-delay="300">
            <h4 className="fw-bold">Goodbuys</h4>
            <p>
              In an economic system that prioritizes profit, humanitarian and ecological ethics often get disregarded,
              because to many giant corporations the mere consideration of them is a detriment to manufacturing
              productivity. Thus, making conscientious consumerism the norm is imperative to holding companies
              accountable, and making the world a more equitable place.
            </p>
            <p>
              While in general, consumers are willing to spend more money on ethically produced goods, they are often
              unaware of the ethical scoring of the products they purchase. GoodBuys is a social justice mobile
              application that allows users to scan consumer goods’ barcodes using their mobile phones or tablets in
              order to view information about how ethically the products were produced by displaying which Ecolabels the
              products or the products’ producers have obtained as well as what obtaining or lacking each of those labels entails.
            </p>
            <p>
              As this information can drive consumers towards or away from specific products, producers, and
              distributors, the large scale adaption of Good-Buys and similar technologies will encourage the adaption
              of United Nations (UN) Sustainable Development Goal (SDG) 12: "Ensure[ing] sustainable consumption and
              production patterns" through target 12.6: "encourage[ing] companies, especially large and transnational
              companies, to adopt sustainable practices and to integrate sustainability information into their reporting."
            </p>
            <p className="fw-semibold">
              Published in: 2020 IEEE Global Humanitarian Technology Conference (GHTC)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publications;
