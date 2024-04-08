const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

// Declare the array of image filenames
const imageFilenames = ['pic.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

// Declare the alternative text for each image file
const altText = {
  'pic.jpg': 'Old red car',
  'pic1.jpg': 'A beautiful landscape',
  'pic2.jpg': 'Green river',
  'pic3.jpg': 'Lion',
  'pic4.jpg': 'Puppies',
  'pic5.jpg': 'Artic fox'
};

// Loop through images
for (let i = 0; i < imageFilenames.length; i++) {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', 'images/' + imageFilenames[i]);
  newImage.setAttribute('alt', altText[imageFilenames[i]]);
  thumbBar.appendChild(newImage);

  // Add click event listener to each thumbnail image
  newImage.addEventListener('click', function() {
    displayedImage.setAttribute('src', this.getAttribute('src'));
    displayedImage.setAttribute('alt', this.getAttribute('alt'));
  });
}

// Wiring up the Darken/Lighten button
btn.addEventListener('click', function() {
  const currentClass = btn.getAttribute('class');
  if (currentClass === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgb(0 0 0 / 50%)';
  } else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgb(0 0 0 / 0%)';
  }
});
