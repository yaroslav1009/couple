const imagesFolder = 'images';
const imageCount = 12; // Кількість картинок у папці
let remainingImages = Array.from({ length: imageCount }, (_, i) => `image${i + 1}.jpg`); // Всі картинки

const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const winnerDiv = document.getElementById('winner');
const finalImage = document.getElementById('finalImage');

// Функція для вибору випадкової картинки
function getRandomImage(imagesArray) {
  const randomIndex = Math.floor(Math.random() * imagesArray.length);
  return imagesArray.splice(randomIndex, 1)[0]; // Видаляємо і повертаємо картинку
}

// Встановити початкові картинки
function setInitialImages() {
  const firstImage = getRandomImage(remainingImages);
  const secondImage = getRandomImage(remainingImages);

  img1.src = `${imagesFolder}/${firstImage}`;
  img2.src = `${imagesFolder}/${secondImage}`;
}

// Обробник кліку
function handleImageClick(selectedImage, otherImage) {
  const newImage = getRandomImage(remainingImages);

  if (!newImage) {
    // Якщо картинки закінчились
    document.querySelector('.images').classList.add('hidden');
    winnerDiv.classList.remove('hidden');
    finalImage.src = selectedImage.src;
  } else {
    // Зміна картинки
    otherImage.src = `${imagesFolder}/${newImage}`;

    // Додаємо клас для плавного ефекту
    otherImage.classList.add('animate-scale');

    // Видаляємо клас після анімації, щоб він міг застосуватись знову
    setTimeout(() => {
      otherImage.classList.remove('animate-scale');
    }, 300);
  }
}

// Додаємо обробники подій
img1.addEventListener('click', () => handleImageClick(img1, img2));
img2.addEventListener('click', () => handleImageClick(img2, img1));

// Встановлюємо початкові картинки при завантаженні сторінки
setInitialImages();
