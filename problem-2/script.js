async function fetchPosts() {
    response = await fetch("http://jsonplaceholder.typicode.com/posts");
    data = response.json();

    // list all of the post titles having more than six words
    
    data.map((data) => {
        let numberOfWordsInPostTitles = countWords(data.title);
        if (numberOfWordsInPostTitles > 6) {
            console.log(data.title);
        }
    });

    // show a word frequency map for all of the body contents of the posts
    
    let bodyContent;
    data.map((data) => {
        bodyContent += JSON.stringify(data.body);
    });
    
    let frequency = createFrequencyMap(bodyContent);
    console.log(frequency);
}

function countWords(str) {
    const arr = str.split(' ');
    return arr.filter(word => word !== '').length;
}

function createFrequencyMap(str) {
    let frequencyMap = str.split(" ").map((i, j) => {
        return {
            Word: i,
            Frequency: str.split(" ").filter((j) => j === i).length,
        };
    });
    let frequencyArray = Array.from(new Set(frequencyMap.map(JSON.stringify)));
    return frequencyArray;
}

fetchPosts();