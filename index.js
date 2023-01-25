import { catsData } from "./data.js";

const emotionRadios = document.getElementById("emotion-radios"); 
const getImageBtn = document.getElementById("get-image-btn"); 
const gifsOnlyOption = document.getElementById("gifs-only-option"); 
const memeModalInner = document.getElementById('meme-modal-inner'); 
const memeModal = document.getElementById('meme-modal') 
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn');  

emotionRadios.addEventListener("change", highlightCheckedOption); // assigns an event listener to emotionRadios which calls the highlightCheckedOption function when the user changes inputs

memeModalCloseBtn.addEventListener("click", closeModal); // assigns an event listener the close button which closes the modal when clicked

getImageBtn.addEventListener("click", renderCat); // assigns an event listener to getImageBtn which calls renderCats() when clicked

function highlightCheckedOption(e){
    const radiosArray = document.getElementsByClassName("radio"); // grabs elements that have the radio class
    for (let radio of radiosArray) { // iterates through those elements
        radio.classList.remove("highlight"); // removes the hightlight class from the previously selected input
    }
    document.getElementById(e.target.id).parentElement.classList.add("highlight"); // adds the highlight class on the currently selected input
}

function closeModal() {
    memeModal.style.display = "none";
}

// uses the cat object provided by getSingleCatObject to create an HTML string which it will render to the DOM
function renderCat() {
    const catObject = getSingleCatObject();
    memeModalInner.innerHTML = `
    <img class="cat-img"
    src="./images/${catObject.image}"
    alt="${catObject.alt}">
    `
    memeModal.style.display = "flex";
}

// returns a single cat object selected from the array provided by getMatchingCatsArray
function getSingleCatObject(){
    const catsArray = getMatchingCatsArray(); // creates a variable with the return value of getMatchingCatsArray()
    if(catsArray.length === 1) { // if there is only one cat in the array
        return catsArray[0]; // return that cat object
    } else {
        const randomNumber = Math.floor(Math.random() * catsArray.length); // get a random index number from catsArray
        return catsArray[randomNumber]; // return the catsArray object with that index number
    }
}

// returns an array of cat objects that matches the user's criteria
function getMatchingCatsArray(){
    if (document.querySelector('input[type="radio"]:checked')) { // if a radio button is selected
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value; // save the value of the radio input to the variable selectedEmotion
        const isGif = gifsOnlyOption.checked; // if the gifsOnlyOption checkbox is checked, set the variable isGif to true
        const matchingCatsArray = catsData.filter(function(cat){ // iterates through each cat in the CatsData array
            if(isGif){ // if isGif is true
                return cat.isGif && cat.emotionTags.includes(selectedEmotion); // return  cats whose isGif value is set to true and emotionTags includes the selected emotion
            }
            else {
                return cat.emotionTags.includes(selectedEmotion); // return all cats whose EmotionTags include the selected emotion
            }
        })
        return matchingCatsArray; // returns the filtered array
    }
}

// creates an array with all the unique emotion tags from catsData
function getEmotionsArray(cats){ 
    const emotionsArray = []; // creates an array for all emotions
    for (let cat of cats) { // for each cat in the array,
        for (let emotion of cat.emotionTags) { // iterate over the emotionTags
            if (!emotionsArray.includes(emotion)){
            emotionsArray.push(emotion); // and push each nonduplicate into emotionsArray
            }
        }
    }
    return emotionsArray; // return value from newly populated emotionsArray
}

// renders out radio button inputs for all the unique emotions
function renderEmotionsRadios(cats) {
    const emotions = getEmotionsArray(cats); // call getEmotionsArray() and store return value into emotions variable
    let emotionRadiosContent = ""; // create empty string for emotion-radios' HTML content
    for (let emotion of emotions) { // for every item in the emotions array
        emotionRadiosContent += `
        <div class = "radio">
            <label for = "${emotion}">${emotion}</label>
            <input type="radio" id="${emotion}" value="${emotion}" name="emotion">
        </div>
        `
        // create HTML for each emotion and add it to the emotionRadiosContent string
    }
    emotionRadios.innerHTML = emotionRadiosContent; // set the string as the emotion-radio element's inner HTML
}

renderEmotionsRadios(catsData);