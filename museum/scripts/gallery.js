export default function randomizer() {
  let container = document.querySelector('.art-gallery__container');
  let images = [];
  for (let i = 1; i <= 15; i++) {
    let elem = document.createElement('img');
    elem.src = `./assets/pictures/gallery/${i}.webp`;
    elem.alt = 'gallery picture';
    images.push(elem);
  }
  images.sort(() => Math.random() - 0.5);
  images.forEach((elem) => container.append(elem));
};
