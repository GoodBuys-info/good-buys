import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function About() {
  useEffect(() => {
    AOS.refresh(); // Ensure animations apply correctly
  }, []);

  return (
    <div className="container my-5 text-white">
      <h1
        className="text-center fw-bold mb-5"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        About Goodbuys
      </h1>

      <div
        className="card bg-danger text-white mb-4"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div className="card-body">
          <h3 className="card-title fw-bold text-center">What is GoodBuys?</h3>
          <p className="card-text mt-3">
            GoodBuys is a social justice application that allows users to scan consumer goods to receive a score about how ethically the product was produced. 
            This score is derived from data about how the company sources the labor as well as its carbon footprint. 
            GoodBuy promotes businesses that are ethical and humane, by distinguishing them with a GoodBuy certification leaf, 
            to assist consumers in making informed decisions about their purchases.
          </p>
        </div>
      </div>

      <div
        className="card bg-danger text-white mb-4"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="card-body">
          <h3 className="card-title fw-bold text-center">Our Mission</h3>
          <p className="card-text mt-3">
            Our mission is to give ethical and sustainable companies credit for treating their environment right, 
            hopefully boosting their customer base. To encourage other companies to become more sustainable.
          </p>
        </div>
      </div>

      <div
        className="card bg-danger text-white mb-4"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <div className="card-body">
          <h3 className="card-title fw-bold text-center">Our Idea</h3>
          <p className="card-text mt-3">
            GoodBuys is a new application that in the least intrusive, yet most efficient way, will allow users to make more ethical choices when shopping. 
            Making conscientious consumerism the norm is imperative to holding companies accountable, and making the world a more just place. 
            It should not be tolerated that most garment workers face inhumane working conditions, often working with no ventilation, toxic chemicals, unsafe buildings, 
            up to 16 hours a day, for a fraction of a living wage. Not only that, 250 million of these workers are children between the ages of 5 and 14 years old. 
            The majority of consumers want to buy ethical and sustainable items, but are more likely to prioritize their time constraints over taking the tedious effort 
            to find and compare items.
          </p>
        </div>
      </div>
    </div>
  );
}
