console.log("test");

//TODO: I want to store my images
const images = [
  {
    src: "./images/dalmatian-dog.jpg",
    alt: "a picture of a dalmatian dog pet playing with falling leaves on a path of a park during autumn.",
  },
  { src: "./images/deer.jpg", alt: "a picture of a red deer in the woods" },
  {
    src: "./images/elephant.jpg",
    alt: "a picture of an elephant in the forest",
  },
  {
    src: "./images/european-shorthair-cat.jpg",
    alt: "a picture of a european shorthair cat",
  },
  { src: "images/fox.jpg", alt: "an image of a fox taken during winter" },
  { src: "images/leopard.jpg", alt: "a leopard lying on a tree branch" },
  {
    src: "images/parrot-yellow-macau.jpg",
    alt: "a beautiful yellow macau parrot",
  },
  {
    src: "images/peafowl-peacock.jpg",
    alt: "a peafowl peacock with its feathers spread open",
  },
];

//TODO: I want to create my thumbnail images
//STEP 1: Select the DOM element we are manipulating

const thumbnail = document.getElementById("thumbnail-container");
const largeContainer = document.getElementById("large-image-container");

function createThumbnails(imagesArray) {
  //b4 i was passing the whole image data i needed to make sure the  createLargeImagesHandler recived the single image data being clicked. hence the imageData parameter.
  imagesArray.forEach((imageData, index) => {
    const newImage = document.createElement("img");
    newImage.src = imageData.src;
    newImage.alt = imageData.alt;
    newImage.className = "ImageStyle";

    newImage.addEventListener("click", function () {
      console.log("Thumbnail clicked", imageData);
      createLargeImagesHandler(imageData, index);
      setTimeout(() => {
        largeContainer.classList.add("show"); // Add the .show class after the image is added
      }, 0);
    });

    thumbnail.appendChild(newImage);
  });
}
createThumbnails(images);

// Function to handle the large image display
function createLargeImagesHandler(imageData, currentIndex) {
  console.log(imageData);

  largeContainer.innerHTML = "";
  //creting large image
  const largeImage = document.createElement("img");
  largeImage.src = imageData.src; //use the clicked images's src
  largeImage.alt = imageData.alt;
  largeImage.className = "largeImageStyle";

  // Create Previous Button
  const prevButton = document.createElement("button");
  prevButton.innerText = "Previous";
  prevButton.className = "prev-button";

  prevButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    createLargeImagesHandler(images[prevIndex], prevIndex);
  });

  // Create Next Button
  const nextButton = document.createElement("button");
  nextButton.innerText = "Next";
  nextButton.className = "next-button";

  nextButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const nextIndex = (currentIndex + 1) % images.length;
    createLargeImagesHandler(images[nextIndex], nextIndex);
  });

  largeContainer.appendChild(prevButton);
  largeContainer.appendChild(largeImage);
  largeContainer.appendChild(nextButton);
}

// Close the large container when clicking outside the image
window.addEventListener("click", function (event) {
  if (!largeContainer.contains(event.target)) {
    largeContainer.classList.remove("show"); // Hide large container when clicking outside
  }
});
