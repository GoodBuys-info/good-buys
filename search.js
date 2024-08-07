document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const resultsGrid = document.getElementById('resultsGrid');
  
    fetchAllCompanies();

    searchInput.addEventListener('input', function() {
      const searchTerm = searchInput.value.toLowerCase();
      const suggestions = allCompanies.filter(company => company.toLowerCase().startsWith(searchTerm));
      displaySuggestions(suggestions);
    });

    searchInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        const searchTerm = searchInput.value;
        searchCompanies(searchTerm);
      }
    });

    function fetchAllCompanies() {
      fetch('https://goodbuys.info/backend-services/searchCompany?searchQuery=')
          .then(response => response.json())
          .then(data => {
              if (data && data.companies.length > 0) {
                  allCompanies = data.companies.map(company => company.company_name);
              } else {
                  console.log('No companies found');
              }
          })
          .catch(error => console.error('Error:', error));
    }

    function displaySuggestions(suggestions) {
      const datalist = document.createElement('datalist');
      datalist.id = 'companySuggestions';
      suggestions.forEach(company => {
          const option = document.createElement('option');
          option.value = company;
          datalist.appendChild(option);
      });
      document.body.appendChild(datalist);
      searchInput.setAttribute('list', 'companySuggestions');
    }
  
    function searchCompanies(searchTerm) {
      fetch('https://goodbuys.info/backend-services/searchCompany?searchQuery=' + encodeURIComponent(searchTerm))
        .then(response => response.json())
        .then(data => {
          if (data && data.companies.length > 0) {
            displayCompanyResults(data.companies);
          } else {
            resultsGrid.innerHTML = '<p>No companies found</p>';
            console.log('No companies found with that name');
          }
        })
        .catch(error => console.error('Error:', error));
    }
  
    function displayCompanyResults(companies) {
        let html = '<div class="results-grid company-results">';
      companies.forEach(company => {
        html += `
          <div class="grid-item">
            <h3>${company.company_name}</h3>
            <p>Company ID: ${company.company_id}</p>
            <div id="certificatesGrid-${company.company_id}"></div>
          </div>
        `;
        getCertificatesByCompany(company.company_id);
      });
      html += '</div>';
      resultsGrid.innerHTML = html;
      resultsGrid.style.display = 'block';
    }
  
    function getCertificatesByCompany(companyId) {
      fetch('https://goodbuys.info/backend-services/getCertificatesByCompany?companyId=' + encodeURIComponent(companyId))
        .then(response => response.json())
        .then(certificates => {
          displayCertificates(certificates, companyId);
        })
        .catch(error => console.error('Error:', error));
    }
  
    function displayCertificates(certificates, companyId) {
      const certificatesGrid = document.getElementById('certificatesGrid-' + companyId);
      if (certificates && certificates.length > 0) {
        let html = '<div class="certificates-grid certificates-results">';
        certificates.forEach(certificate => {
          html += `
            <div class="certificate-item">
              <h3><a href="${certificate.cert_link}" target="_blank">${certificate.certification_name}</a></h3>
              <p>Date: ${new Date(certificate.cert_date).toLocaleDateString()}</p>
              <p>${certificate.cert_description}</p>
            </div>
          `;
        });
        html += '</div>';
        certificatesGrid.innerHTML = html;
      } else {
        certificatesGrid.innerHTML = '<p>No certificates found for this company</p>';
      }
      certificatesGrid.style.display = 'block';
    }
  });
  

  