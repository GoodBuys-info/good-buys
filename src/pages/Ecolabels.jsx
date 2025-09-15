// src/pages/Ecolabels.jsx
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import labels from './../assets/data/labeldata.json'; // Adjust the path as needed
// import './../assets/styles/Ecolabels.css';

export default function Ecolabels() {
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <div className="container-fluid py-5 text-white">
      <div
        className="glass-overlay p-4 rounded-4 shadow-lg mx-auto d-flex"
        style={{ width: '60vw', height: '70vh' }}
      >
        {/* Grid Section */}
        <div className="col-12 col-lg-8 d-flex flex-wrap gap-4 justify-content-center" style={{overflow:'scroll'}}>
          {labels.map((label, idx) => (
            <div
              key={idx}
              className="ecolabel-card text-center p-3 rounded-3"
              onMouseEnter={() => setHovered(label)}
              onMouseLeave={() => setHovered(null)}
              data-aos="zoom-in"
              data-aos-delay={idx * 30}
              onClick={() => window.open(label.link, '_blank')}
            >
              <img
                src={"/images/"+label.image}
                alt={label.title}
                className="eco-logo mb-2"
                style={{ width: '60px', height: '60px', objectFit: 'contain' }}
              />
              <h6 className="fw-bold small mb-0">{label.title}</h6>
            </div>
          ))}
        </div>

        {/* Sidebar Description */}
        <div
          className="col-lg-4 d-none d-lg-block px-4"
          style={{ borderLeft: '1px solid #ccc', marginLeft: 'auto' }}
        >
          <div className="bg-dark text-white p-3 rounded-3 h-100">
            <h6 className="fw-bold">Details</h6>
            {hovered ? (
              <>
                <p className="mt-2"><strong>{hovered.name}</strong></p>
                <p style={{ fontSize: '0.9rem' }}>{hovered.description}</p>
              </>
            ) : (
              <p className="small">Hover over an ecolabel to see its description.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
