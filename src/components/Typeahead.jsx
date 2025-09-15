import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Typeahead({ 
  value, 
  onChange, 
  onSelect, 
  placeholder, 
  fetchSuggestions, 
  minLength = 2,
  maxSuggestions = 10 
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [completion, setCompletion] = useState('');
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update dropdown position when input changes
  useEffect(() => {
    if (wrapperRef.current && showSuggestions) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }, [showSuggestions, value]);

  useEffect(() => {
    const fetchData = async () => {
      if (value.length < minLength) {
        setSuggestions([]);
        setShowSuggestions(false);
        setCompletion('');
        return;
      }

      setLoading(true);
      try {
        const results = await fetchSuggestions(value);
        setSuggestions(results.slice(0, maxSuggestions));
        const shouldShow = results.length > 0;
        setShowSuggestions(shouldShow);
        setSelectedIndex(-1);
        
        // Set completion text from first suggestion
        if (results.length > 0) {
          const firstSuggestion = results[0];
          if (firstSuggestion.company_name.toLowerCase().startsWith(value.toLowerCase())) {
            setCompletion(firstSuggestion.company_name);
          } else {
            setCompletion('');
          }
        } else {
          setCompletion('');
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
        setShowSuggestions(false);
        setCompletion('');
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchData, 300);
    return () => clearTimeout(debounceTimer);
  }, [value, minLength, maxSuggestions, fetchSuggestions]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  const handleSuggestionClick = (suggestion) => {
    // Update the input value immediately
    onChange(suggestion.company_name);
    // Call the onSelect callback
    onSelect(suggestion);
    // Close dropdown and reset state
    setShowSuggestions(false);
    setSelectedIndex(-1);
    setCompletion('');
  };

  const handleInputFocus = () => {
    if (value.length >= minLength && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab' && completion) {
      e.preventDefault();
      onChange(completion);
      setCompletion('');
      setShowSuggestions(false);
      setSelectedIndex(-1);
      return;
    }

    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} style={{ 
          backgroundColor: 'rgba(34, 197, 94, 0.3)', 
          color: '#22c55e', 
          padding: '2px 4px', 
          borderRadius: '4px',
          fontWeight: '600'
        }}>
          {part}
        </mark>
      ) : part
    );
  };

  // Render dropdown using portal
  const renderDropdown = () => {
    if (!showSuggestions || suggestions.length === 0) return null;

    const dropdownContent = (
      <div
        style={{
          position: 'fixed',
          top: dropdownPosition.top,
          left: dropdownPosition.left,
          width: dropdownPosition.width,
          zIndex: 99999,
          animation: 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)',
            overflow: 'hidden',
            maxHeight: '300px',
            display: 'block',
            visibility: 'visible',
            opacity: 1
          }}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              onMouseEnter={() => setSelectedIndex(index)}
              style={{
                padding: '12px 16px',
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 500,
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                backgroundColor: index === selectedIndex ? 'rgba(34, 197, 94, 0.15)' : 'transparent',
                display: 'block'
              }}
            >
              <div 
                className="fw-bold text-white"
                style={{
                  fontSize: '1rem',
                  lineHeight: '1.4'
                }}
              >
                {highlightMatch(suggestion.company_name, value)}
              </div>
              {suggestion.ecolabels && suggestion.ecolabels.length > 0 && (
                <div 
                  className="small text-white-50 mt-1"
                  style={{
                    fontSize: '0.875rem',
                    opacity: 0.7
                  }}
                >
                  {suggestion.ecolabels.slice(0, 3).join(', ')}
                  {suggestion.ecolabels.length > 3 && '...'}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );

    return createPortal(dropdownContent, document.body);
  };

  return (
    <>
      <div ref={wrapperRef} style={{ position: 'relative', width: '100%' }}>
        <div className="input-container">
          {/* Search Icon */}
          <svg 
            className="search-icon" 
            width="20" 
            height="20" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
          
          <div className="position-relative flex-grow-1">
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={handleInputFocus}
              className="modern-input"
              placeholder={placeholder}
              autoComplete="off"
            />
            {completion && (
              <div 
                className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center px-3 completion-overlay"
                style={{ 
                  pointerEvents: 'none',
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  paddingLeft: '52px' // Account for search icon
                }}
              >
                <span style={{ color: 'transparent' }}>
                  {value}
                </span>
                <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                  {completion.substring(value.length)}
                </span>
              </div>
            )}
          </div>
        </div>
        
        {loading && (
          <div 
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              marginTop: '8px',
              zIndex: 9999,
              background: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)',
              overflow: 'hidden',
              padding: '16px',
              textAlign: 'center'
            }}
          >
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <span className="ms-2 text-white-50">Loading suggestions...</span>
          </div>
        )}
      </div>
      
      {/* Render dropdown using portal */}
      {renderDropdown()}
    </>
  );
} 