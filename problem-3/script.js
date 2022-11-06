const mainElement = document.querySelector('.main');
const wrapper = document.createElement('div');

// create form, input and search button

const formElement = document.createElement('form');
formElement.classList.add('search');
formElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputValue = Object.fromEntries(new FormData(e.target));
    const response = await fetch(`https://api.github.com/users/${inputValue.name}`);

    if (response.ok) {
        const data = await response.json();
        wrapper.appendChild(createProfileElement(data));
        mainElement.appendChild(wrapper);
    } else {
        alert("User Not Found");
    }
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

// function to create profile card

function createProfileElement(profileData) {
    const element = document.createElement('div');
    element.classList.add('profile');
    element.innerHTML = `
    <img class="search-image" src=${profileData.avatar_url}></img>
    <p class="search-text"><span>Name: </span>${profileData.name}</p>
    <p class="search-text"><span>Username: </span>${profileData.login}</p>
    <p class="search-text"><span>Email Address: </span>${profileData.email}</p>
    <p class="search-text"><span>Location: </span>${profileData.location}</p>
    <p class="search-text"><span>Number of Gists: </span>${profileData.public_gists}</p>
    `
    element.appendChild(createDeleteButtonElement())
    return element;
}

// function to create delete button

function createDeleteButtonElement() {
    const element = document.createElement('button');
    element.classList.add('delete-button');
    element.innerText = "Delete";
    element.addEventListener('click', (e) => {
        wrapper.innerHTML = '';
    });
    return element;
}
