const dictionary = document.getElementById('dictionary');
const links = dictionary.querySelectorAll('#alphabet a');

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function(event) {
    event.preventDefault();
    const target = document.getElementById(this.getAttribute('href').slice(1));
    const content = dictionary.querySelector('#content');
    const offsetTop = target.offsetTop - content.offsetTop;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  });
}

const termTitles = document.querySelectorAll('.term-title');
for (let i = 0; i < termTitles.length; i++) {
  termTitles[i].addEventListener('click', function(event) {
    event.preventDefault();
    const termContent = this.nextElementSibling;
    if (termContent.style.display === 'none') {
      termContent.style.display = 'block';
      this.querySelector('span').textContent = '-';
    } else {
      termContent.style.display = 'none';
      this.querySelector('span').textContent = '+';
    }
  });
}