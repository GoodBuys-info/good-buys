// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import Typeahead from '../components/Typeahead';
import labels from './../assets/data/labeldata.json';
import './../assets/styles/Home.css';
import './../assets/styles/Typeahead.css';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch suggestions for typeahead
  const fetchSuggestions = async (searchTerm) => {
    if (!searchTerm || searchTerm.length < 2) return [];
    
    try {
      const response = await fetch(
        `https://goodbuys.info/api/searchCompany.php?searchQuery=${searchTerm}`
      );
      const data = await response.json();
      return data.companies || [];
    } catch (error) {
      console.error('Failed to fetch suggestions', error);
      return [];
    }
  };

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://goodbuys.info/api/searchCompany.php?searchQuery=${query}`
      );
      const data = await response.json();
      setResults(data.companies || []);
      setSelectedCompany(null);
    } catch (error) {
      console.error('Failed to fetch results', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle when a suggestion is selected from typeahead
  const handleSuggestionSelect = (selectedCompany) => {
    setQuery(selectedCompany.company_name);
    setResults([selectedCompany]);
    setSelectedCompany(selectedCompany);
  };

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === 'Enter') handleSearch();
    };
    window.addEventListener('keydown', handleEnter);
    return () => window.removeEventListener('keydown', handleEnter);
  }, [query]);

  return (
    <div className="container-fluid py-5 text-white">
      <div className="glass-overlay p-4 rounded-4 shadow-lg mx-auto d-flex flex-column">
        {/* Modern Search Bar */}
        <div className="d-flex justify-content-center mb-4 gap-3">
          <div className="search-container flex-grow-1" style={{ maxWidth: '600px' }}>
            <Typeahead
              value={query}
              onChange={setQuery}
              onSelect={handleSuggestionSelect}
              placeholder="Search for a company..."
              fetchSuggestions={fetchSuggestions}
              minLength={2}
              maxSuggestions={8}
            />
          </div>
          <button 
            className={`search-button ${loading ? 'loading' : ''}`} 
            onClick={handleSearch} 
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {/* Companies and Sidebar */}
        <div className="row h-100 overflow-hidden">
          {/* Company Grid */}
          <div className={`col ${selectedCompany ? 'col-lg-8' : 'col-12'}`} style={{ overflowY: 'auto', maxHeight: '60vh' }}>
            <div className="d-flex flex-wrap gap-4 justify-content-center">
              {results.map((company, index) => (
                <div
                  key={index}
                  className="company-card text-center p-3 rounded-3"
                  onClick={() => setSelectedCompany(company)}
                >
                  <h6 className="fw-bold mb-3">{company.company_name}</h6>
                  <div className="d-flex flex-wrap justify-content-center gap-2">
                    {company.ecolabels.map((label, i) => {
                      // Find matching label from our labels data
                      const matchingLabel = labels.find(l => {
                        const normalizedCompanyLabel = label.toLowerCase().replace(/[^a-z0-9]/g, '');
                        const normalizedLabelTitle = l.title.toLowerCase().replace(/[^a-z0-9]/g, '');
                        
                        return normalizedCompanyLabel.includes(normalizedLabelTitle) ||
                               normalizedLabelTitle.includes(normalizedCompanyLabel) ||
                               // Special cases for common variations
                               (label.toLowerCase().includes('bcorp') && l.title.toLowerCase().includes('b corp')) ||
                               (label.toLowerCase().includes('b corp') && l.title.toLowerCase().includes('bcorp'));
                      });
                      
                      return (
                        <div key={i} className="text-center">
                          <img
                            src={matchingLabel ? `/images/${matchingLabel.image}` : '/images/ecolables/bcorp.jpeg'}
                            alt={label}
                            className="eco-logo"
                            title={label}
                            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                          />
                          <p className="small mt-1 mb-0" style={{ fontSize: '0.75rem', opacity: 0.8 }}>{label}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          {selectedCompany && (
            <div className="col-lg-4 mt-4 mt-lg-0 d-flex align-items-start justify-content-center">
              <div className="bg-dark text-white p-4 rounded-4 shadow-sm w-100" style={{ maxWidth: '400px', maxHeight: '70vh', overflowY: 'auto' }}>
                <h5 className="fw-bold mb-3">{selectedCompany.company_name}</h5>
                <h6 className="fw-bold mb-3">Ecolabels:</h6>
                
                <div className="row g-3">
                  {labels
                    .map((label, idx) => ({
                      ...label,
                      originalIndex: idx,
                      isAssociated: selectedCompany.ecolabels.some(
                        companyLabel => {
                          const normalizedCompanyLabel = companyLabel.toLowerCase().replace(/[^a-z0-9]/g, '');
                          const normalizedLabelTitle = label.title.toLowerCase().replace(/[^a-z0-9]/g, '');
                          
                          return normalizedCompanyLabel.includes(normalizedLabelTitle) ||
                                 normalizedLabelTitle.includes(normalizedCompanyLabel) ||
                                 // Special cases for common variations
                                 (companyLabel.toLowerCase().includes('bcorp') && label.title.toLowerCase().includes('b corp')) ||
                                 (companyLabel.toLowerCase().includes('b corp') && label.title.toLowerCase().includes('bcorp'));
                        }
                      )
                    }))
                    .sort((a, b) => {
                      // Sort by isAssociated (true first), then by original index
                      if (a.isAssociated && !b.isAssociated) return -1;
                      if (!a.isAssociated && b.isAssociated) return 1;
                      return a.originalIndex - b.originalIndex;
                    })
                    .map((label, sortedIdx) => {
                      return (
                        <div key={label.originalIndex} className="col-4">
                          <div
                            className="text-center p-2"
                            style={{
                              opacity: label.isAssociated ? 1 : 0.3,
                              filter: label.isAssociated ? 'none' : 'grayscale(100%)',
                              transition: 'all 0.3s ease',
                              backgroundColor: 'rgba(255,255,255,0.1)',
                              borderRadius: '12px',
                              minHeight: '100px',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                              border: label.isAssociated ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(255,255,255,0.1)'
                            }}
                          >
                            <img
                              src={`/images/${label.image}`}
                              alt={label.title}
                              className="eco-logo mb-2"
                              style={{ 
                                width: '50px', 
                                height: '50px', 
                                objectFit: 'contain',
                                cursor: 'pointer'
                              }}
                              title={label.title}
                              onClick={() => window.open(label.link, '_blank')}
                            />
                            <p className="small mb-0" style={{ fontSize: '0.7rem' }}>{label.title}</p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
