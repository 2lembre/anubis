import './styles.styl';
import Icon from './assets/anubis.png';

function articleComponent() {
  const article = document.createElement('article');
  const title = document.createElement('h1');
  const imageAnubis = new Image();
  const name = 'Anúbis';

  article.classList.add('anubis');
  title.innerHTML = name;
  imageAnubis.alt = `${name} photo`;
  imageAnubis.src = Icon;
  imageAnubis.classList.add('anubis-photo');

  article.appendChild(title);
  article.appendChild(imageAnubis);

  return article;
}

document.body.prepend(articleComponent());

let anubis = document.querySelector('.anubis');
let screenWidth = window.screen.width / 2;
let screenHeight = window.screen.height / 2;
let otherProperty = 'perspective(1000px)';

document.addEventListener('mousemove', function (e) {
  let centroX = e.clientX - screenWidth;
  let centroY = screenHeight - e.clientY;
  let degX = centroX * 0.04;
  let degY = centroY * 0.08;

  anubis.style.transform = otherProperty + 'rotateY('+ degX +'deg)  rotateX('+ degY +'deg)';
});

// O seu coração contra peso nessa "pena da verdade"
// Está cheio de maldade ou será que é de bondade?
// 2Lembre a sinceridade trabalhe sempre com a verdade.
// 03/02/20/21
