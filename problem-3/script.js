const mainElement = document.querySelector('.main');

// create form, input and search button

const formElement = document.createElement('form');
formElement.classList.add('search');
formElement.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputValue = Object.fromEntries(new FormData(e.target));
});

const inputElement = document.createElement('input');
inputElement.classList.add('search-input');
inputElement.setAttribute('name', 'name');

const searchButtonElement = document.createElement('button');
searchButtonElement.classList.add('search-button');
searchButtonElement.setAttribute('type', 'submit');
searchButtonElement.innerHTML = "Search";

// add created elements to the form

formElement.appendChild(inputElement);
formElement.appendChild(searchButtonElement);

// add form to the website

mainElement.appendChild(formElement);
