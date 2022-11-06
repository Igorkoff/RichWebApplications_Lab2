const mainElement = document.querySelector('.main');
const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');

// create form, input and search button

const formElement = document.createElement('form');
formElement.classList.add('search');
formElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputValue = Object.fromEntries(new FormData(e.target));
    const userResponse = await fetch(`https://api.github.com/users/${inputValue.name}`);

    if (userResponse.ok) {
        const reposResponse = await fetch(`https://api.github.com/users/${inputValue.name}/repos`);
        const reposData = await reposResponse.json();
        const userData = await userResponse.json();
        wrapper.appendChild(createProfileElement(userData, reposData));
        mainElement.appendChild(wrapper);
        inputElement.value = '';
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

// function to create profile information

function createProfileElement(profileData, reposData) {

    // create a div for information and repos cards

    const element = document.createElement('div');
    element.classList.add('record');

    // create user information card

    const profile = document.createElement('div');
    profile.classList.add('profile');
    profile.innerHTML = `
    <div class="user-info">
        <img class="search-image" src=${profileData.avatar_url}></img>
        <p class="search-text"><span>Name: </span>${profileData.name}</p>
        <p class="search-text"><span>Username: </span>${profileData.login}</p>
        <p class="search-text"><span>Email Address: </span>${profileData.email}</p>
        <p class="search-text"><span>Location: </span>${profileData.location}</p>
        <p class="search-text"><span>Number of Gists: </span>${profileData.public_gists}</p>
    </div>
    `
    profile.appendChild(createDeleteButtonElement());

    // create repos card

    const repos = document.createElement('div');
    repos.classList.add('repos');

    reposData.forEach((repo) => {
        const element = document.createElement('div');
        element.innerHTML = `
        <div class="repo">
            <a class="search-text" href=${repo.html_url}>${repo.name}</a>
            <p class="search-text">${repo.description}</p>
            <hr>
        </div>
        `
        repos.appendChild(element);
    });

    // add cards to the record div

    element.appendChild(profile);
    element.appendChild(repos);

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
