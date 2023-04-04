document.getElementById('story-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const age = document.getElementById('age').value;
    const theme = document.getElementById('theme').value;
    const pages = document.getElementById('pages').value;
    const words = document.getElementById('words').value;

    const prompt = `Write a story for a ${gender} child named ${name} aged ${age} years, 
with the theme "${theme}", ${pages} pages long and approximately ${words} words per page. Each page needs to start in a new paragraph`;

    const story = await generateStory(prompt);
    const images = await generateImages(prompt);

    displayStory(story);
    displayImages(images);
});

async function generateStory(prompt) {
    // Call ChatGPT API to generate a story based on the given prompt
    // Replace the URL with the actual API endpoint and add your API key
    const response = await fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 1500,
            n: 1,
            stop: null,
            temperature: 1,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        })
    });

    const data = await response.json();
    return data.choices[0].text;
}

async function generateImages(prompt) {
    // Call DALL-E 2 API to generate images based on the given prompt
    // Replace the URL with the actual API endpoint and add your API key
    const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
            prompt: prompt,
            model: "image-alpha-001",
            n: 5,
            size: "512x512",
            response_format: "url"
        })
    });

    const data = await response.json();
    return data.data;
}

function displayStory(story) {
    const storyResult = document.getElementById('story-result');
    storyResult.textContent = story;
}

function displayImages(images) {
    const imagesResult = document.getElementById('images-result');
    imagesResult.innerHTML = '';

    images.forEach(image => {
        const img = document.createElement('img');
        img.src = image.url;
        img.alt = 'Generated image';
        img.width = 128;
        img.height = 128;
        img.style.margin = '5px';

        imagesResult.appendChild(img);
    });
}
