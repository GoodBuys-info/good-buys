function showInfo(name) {
    if (name === 'Navid') {
        const personalInfo = document.querySelector('.info');
        const h1Element = personalInfo.querySelector('h1'); 
        const detailElement = personalInfo.querySelector('.detail');
        h1Element.textContent = 'Navid Shaghaghi'; 
        detailElement.innerHTML = `
            <p>Role: Superviser and Organizer</p>
            <p>Degree: Lecturer and researcher in the departments of Computer Science & Engineering</p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/nshaghaghi">https://www.linkedin.com/in/nshaghaghi</a></p>
        `;
    } else if (name === 'Akaash') {
        const personalInfo = document.querySelector('.info');  
        personalInfo.innerHTML = 'Akaash Meghraj Trivedi';
        const nameDiv = document.createElement('div');
        const h1Element = document.createElement('h1');
        h1Element.textContent = `Akaash Meghraj Trivedi`;
        personalInfo.appendChild(nameDiv);
        nameDiv.appendChild(h1Element);
        const detailElement = document.createElement('div');
        detailElement.classList.add('detail');
        personalInfo.appendChild(detailElement);

        detailElement.innerHTML = `
            <p>Role: Web + Android Application Developer</p>
            <p>Degreed: Master of Science in Computer Science and Engineering</p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/akaash-trivedi/">https://www.linkedin.com/in/akaash-trivedi/</a></p>
        `;
    } else if(name === 'Jash' ) {
        const personalInfo = document.querySelector('.info');  
        personalInfo.innerHTML = 'Jash Hemant Shah';
        const nameDiv = document.createElement('div');
        const h1Element = document.createElement('h1');
        h1Element.textContent = `Jash Hemant Shah`;
        personalInfo.appendChild(nameDiv);
        nameDiv.appendChild(h1Element);
        const detailElement = document.createElement('div');
        detailElement.classList.add('detail');
        personalInfo.appendChild(detailElement);

        detailElement.innerHTML = `
            <p>Role: Lead Android Developer</p>
            <p>Degreed: Masters of Science in Computer Science & Engineering</p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/itsjashshah/">https://www.linkedin.com/in/itsjashshah/</a></p>
        `;
    } else if (name === 'Akshay') {
        const personalInfo = document.querySelector('.info');  
        personalInfo.innerHTML = 'Akshay Vijay Bidwai';
        const nameDiv = document.createElement('div');
        const h1Element = document.createElement('h1');
        h1Element.textContent = `Akshay Vijay Bidwai`;
        personalInfo.appendChild(nameDiv);
        nameDiv.appendChild(h1Element);
        const detailElement = document.createElement('div');
        detailElement.classList.add('detail');
        personalInfo.appendChild(detailElement);

        detailElement.innerHTML = `
            <p>Role: Backend Development</p>
            <p>Degreed: Masters of Science in Computer Science and Engineering</p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/akshay-bidwai/">https://www.linkedin.com/in/akshay-bidwai/</a></p>
        `;
    } else if(name === 'Amelia') {
        const personalInfo = document.querySelector('.info');  
        personalInfo.innerHTML = 'Amelia Mazer';
        const nameDiv = document.createElement('div');
        const h1Element = document.createElement('h1');
        h1Element.textContent = `Amelia Mazer`;
        personalInfo.appendChild(nameDiv);
        nameDiv.appendChild(h1Element);
        const detailElement = document.createElement('div');
        detailElement.classList.add('detail');
        personalInfo.appendChild(detailElement);

        detailElement.innerHTML = `
            <p>Role: Backend Database Developer</p>
            <p>Degreed: Master of Science in Information Systems</p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/amelia-mazer/">https://www.linkedin.com/in/amelia-mazer/</a></p>
        `;
    } else if(name === 'Jason') {
        const personalInfo = document.querySelector('.info');  
        personalInfo.innerHTML = 'Huizhirong (Jason) Guo';
        const nameDiv = document.createElement('div');
        const h1Element = document.createElement('h1');
        h1Element.textContent = `Huizhirong (Jason) Guo`;
        personalInfo.appendChild(nameDiv);
        nameDiv.appendChild(h1Element);
        const detailElement = document.createElement('div');
        detailElement.classList.add('detail');
        personalInfo.appendChild(detailElement);

        detailElement.innerHTML = `
            <p>Role: Software Engineer & Web Developer</p>
            <p>Degreed: Master of Science in Information Systems</p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/jason-guo-0559a7227">https://www.linkedin.com/in/jason-guo-0559a7227</a></p>
        `;
    } else if(name === 'Mansi' ) {
        const personalInfo = document.querySelector('.info');  
        personalInfo.innerHTML = 'Mansi Jainendra Tandel';
        const nameDiv = document.createElement('div');
        const h1Element = document.createElement('h1');
        h1Element.textContent = `Mansi Jainendra Tandel`;
        personalInfo.appendChild(nameDiv);
        nameDiv.appendChild(h1Element);
        const detailElement = document.createElement('div');
        detailElement.classList.add('detail');
        personalInfo.appendChild(detailElement);

        detailElement.innerHTML = `
            <p>Role: Software Engineer</p>
            <p>Degreed: Masters of science in computer science and engineering</p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/mansi-tandel/">https://www.linkedin.com/in/mansi-tandel/</a></p>
        `;
    } else if(name === 'Tony' ) {
        const personalInfo = document.querySelector('.info');  
        personalInfo.innerHTML = 'Tony Mathen';
        const nameDiv = document.createElement('div');
        const h1Element = document.createElement('h1');
        h1Element.textContent = `Tony Mathen`;
        personalInfo.appendChild(nameDiv);
        nameDiv.appendChild(h1Element);
        const detailElement = document.createElement('div');
        detailElement.classList.add('detail');
        personalInfo.appendChild(detailElement);

        detailElement.innerHTML = `
            <p>Role: Backend Software Developer</p>
            <p>Degreed: Master of Science - Computer Science and Engineering</p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/tony-mathen-74956615a">https://www.linkedin.com/in/tony-mathen-74956615a</a></p>
        `;
    } else if(name === 'Juilee' ) {
        const personalInfo = document.querySelector('.info');  
        personalInfo.innerHTML = 'Juilee Katpatal';
        const nameDiv = document.createElement('div');
        const h1Element = document.createElement('h1');
        h1Element.textContent = `Juilee Katpatal`;
        personalInfo.appendChild(nameDiv);
        nameDiv.appendChild(h1Element);
        const detailElement = document.createElement('div');
        detailElement.classList.add('detail');
        personalInfo.appendChild(detailElement);

        detailElement.innerHTML = `
            <p>Role: iOS App Developer</p>
            <p>Degreed: MS in COomputer Science and Engineering</p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/zuilee">https://www.linkedin.com/in/zuilee</a></p>
        `;
    } else if(name === 'Mohini' ) {
        const personalInfo = document.querySelector('.info');  
        personalInfo.innerHTML = 'Mohini Rana';
        const nameDiv = document.createElement('div');
        const h1Element = document.createElement('h1');
        h1Element.textContent = `Mohini Rana`;
        personalInfo.appendChild(nameDiv);
        nameDiv.appendChild(h1Element);
        const detailElement = document.createElement('div');
        detailElement.classList.add('detail');
        personalInfo.appendChild(detailElement);

        detailElement.innerHTML = `
            <p>Role: iOS Developer</p>
            <p>Degreed: MS in Computer Science</p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/mohini-rana">https://www.linkedin.com/in/mohini-rana</a></p>
        `;
    } else if(name === 'Payal' ) {
        const personalInfo = document.querySelector('.info');  
        personalInfo.innerHTML = 'Payal Mehta';
        const nameDiv = document.createElement('div');
        const h1Element = document.createElement('h1');
        h1Element.textContent = `Payal Mehta`;
        personalInfo.appendChild(nameDiv);
        nameDiv.appendChild(h1Element);
        const detailElement = document.createElement('div');
        detailElement.classList.add('detail');
        personalInfo.appendChild(detailElement);

        detailElement.innerHTML = `
            <p></p>
            <p>Degreed: Masters of Computer & Science & Engineering</p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/payal-m-mehta/">https://www.linkedin.com/in/payal-m-mehta/</a></p>
        `;
    }

  

}