const quoteText = document.querySelector("#js-quote-text");
const characterName = document.querySelector("#js-character-name");
const characterImage = document.querySelector("#js-character-image");
const endpoint = 'https://officeapi.akashrajpurohit.com/quote/random';

async function getQuote() {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const json = await response.json();
        quoteText.textContent = json.quote;
        characterName.textContent = json.character;
        characterImage.src = json.character_avatar_url;
        characterImage.alt = json.character;
    } catch (err) {
        console.error("Error fetching quote:", err);
        alert('Failed to fetch new quote: ' + err.message);
    }
}

function tweetQuote() {
    const tweetText = `"${quoteText.textContent}" - ${characterName.textContent}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(twitterUrl, '_blank');
}

function downloadImage() {
    const imageUrl = characterImage.src;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'OfficeQuote.jpg'; // Provide a default name for the downloaded image
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.querySelector("#js-new-quote").addEventListener('click', getQuote);
document.querySelector("#js-tweet-quote").addEventListener('click', tweetQuote);
document.querySelector("#js-download").addEventListener('click', downloadImage);

getQuote();
