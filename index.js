const quoteContainer = document.getElementById('quoteContainer');
const quoteAuthor = document.getElementById('quote-author');
const quoteText = document.getElementById('quote');
const twitterBtn = document.getElementById('twitter');
const generatorBtn = document.getElementById('generator-btn');
const loader = document.getElementById('loader');

let apiQuotesData = [];
const url = 'https://type.fit/api/quotes';
 
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete (){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

async function getQuotesData() {
    // loading();   
    try {
        const response = await fetch(url);
        apiQuotesData = await response.json();
        newQuote();
    } catch (e) {
        console.error(e);
    }
}

function newQuote() {
    // loading();
    const quote = apiQuotesData[Math.floor(Math.random() * apiQuotesData.length)];
     if (!quote.author) {
        quoteAuthor.textContent = "unknown";
     } else {
        quoteAuthor.textContent = quote.author;
     }    
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    // set the quote, hide the loader 
    quoteText.textContent = quote.text;
    complete();
}

function shareQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}

twitterBtn.addEventListener('click', shareQuote);
generatorBtn.addEventListener('click', newQuote);

getQuotesData();
