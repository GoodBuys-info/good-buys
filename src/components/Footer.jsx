// src/components/Footer.jsx
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import labelData from '../assets/data/labeldata.json';

export default function Footer() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate ecolabels every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 3) % labelData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Get 3 ecolabels starting from current index
  const getCurrentLabels = () => {
    const labels = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % labelData.length;
      labels.push(labelData[index]);
    }
    return labels;
  };

  return (
    <footer className="bg-danger text-white py-4 mt-auto">
      <div className="container">
        <div className="row align-items-center">
          {/* Left side - Rotating ecolabels */}
          <div className="col-lg-6">
            <div className="d-flex justify-content-center justify-content-lg-start">
              <div className="d-flex align-items-center" style={{ gap: '20px' }}>
                {getCurrentLabels().map((label, index) => (
                  <div 
                    key={`${currentIndex}-${index}`}
                    className="text-center footer-ecolabel-rotate"
                    style={{
                      animationDelay: `${index * 0.2}s`
                    }}
                  >
                    <img 
                      src={"/images/" + label.image} 
                      alt={label.title}
                      className="img-fluid rounded-circle footer-ecolabel"
                      style={{ 
                        width: '70px', 
                        height: '70px', 
                        objectFit: 'cover',
                        border: '3px solid white',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                      }}
                      title={label.title}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Navigation links */}
          <div className="col-lg-6">
            <div className="d-flex justify-content-center justify-content-lg-end mt-3 mt-lg-0">
              <div className="d-flex flex-column flex-md-row align-items-center">
                <NavLink 
                  to="/ecolabels" 
                  className={({ isActive }) =>
                    isActive ? 'text-white text-decoration-none fw-bold me-md-4 mb-2 mb-md-0 footer-nav-link active' : 'text-white text-decoration-none fw-bold me-md-4 mb-2 mb-md-0 footer-nav-link'
                  }
                >
                  View All Ecolabels
                </NavLink>
                <NavLink 
                  to="/terms" 
                  className={({ isActive }) =>
                    isActive ? 'text-white text-decoration-none fw-bold me-md-4 mb-2 mb-md-0 footer-nav-link active' : 'text-white text-decoration-none fw-bold me-md-4 mb-2 mb-md-0 footer-nav-link'
                  }
                >
                  Terms of Use
                </NavLink>
                <NavLink 
                  to="/privacy" 
                  className={({ isActive }) =>
                    isActive ? 'text-white text-decoration-none fw-bold footer-nav-link active' : 'text-white text-decoration-none fw-bold footer-nav-link'
                  }
                >
                  Privacy Policy
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="row mt-3">
          <div className="col-12">
            <p className="text-center mb-0 small">© 2025 GoodBuys. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
