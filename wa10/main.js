const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

const storyText = "On a starry night in Gotham, :insertx:, known for :inserty:, found themselves in the middle of :insertz:. It wasn't just any night, they knew that it would make them famous for years in Gotham. The night was hot, 94 degrees Fahrenheit outside, and :insertx: weighed 300 pounds.";

const insertX = ['Barbie', 'Ken', 'Allan'];
const insertY = ['loving yourself so much', 'singing romantic songs', 'supporting Barbie'];
const insertZ = ['a foam party of the year', 'a dance with other Kens on a ranch', 'sharing all secrets with Barbie'];

randomize.addEventListener('click', result);

function result() {
  let newStory = storyText;
  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);

  newStory = newStory.replace(/:insertx:/g, xItem);
  newStory = newStory.replace(/:inserty:/g, yItem);
  newStory = newStory.replace(/:insertz:/g, zItem);

  if(customName.value !== '') {
    newStory = newStory.replace('Barbie', customName.value);
  }

  if(document.getElementById("uk").checked) {
    const weightInStones = Math.round(300 * 0.071429) + ' stone'; 
    const temperatureInCelsius = Math.round((94 - 32) * 5 / 9) + ' centigrade'; 
    newStory = newStory.replace('94 degrees Fahrenheit', temperatureInCelsius);
    newStory = newStory.replace('300 pounds', weightInStones);
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}
