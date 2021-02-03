import './styles.styl';
import Icon from './assets/anubis.png';

function article() {
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

document.body.prepend(article());
