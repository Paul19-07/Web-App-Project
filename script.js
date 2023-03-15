const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".menu");
const isMenuOpen = false;
const document2 = document.querySelector("#root");
const scrolldownConatiner = document.getElementById("scrolldown-menu-container")
const scrolldownNavbar = document.getElementById("scrolldown-menu-navbar")

menuButton.addEventListener("click", () => {
  menu.classList.toggle("open");
  isMenuOpen = !isMenuOpen;
});

document2.addEventListener("click", function() { 
    if (menu.classList.contains("open")) {
    menu.classList.toggle("open");
    isMenuOpen = !isMenuOpen;
    }
});

window.onscroll = function() {
  const fontSize = parseFloat(getComputedStyle(document.body).fontSize);
  const screenWidth = window.innerWidth / fontSize;
  let threshold;

  switch (true) {
    case screenWidth >= 100:
      threshold = 320;
      break;
    case screenWidth >= 80:
      threshold = 250;
      break;
    case screenWidth >= 60:
      threshold = 220;
      break;
    case screenWidth >= 50:
      threshold = 190;
      break;
    case screenWidth >= 20:
      threshold = 0;
      break;
    default:
      threshold = 0;
  }

  if (window.pageYOffset > threshold) {
    scrolldownConatiner.classList.add("open");
  } else {
    scrolldownConatiner.classList.remove("open");
  }
}

document.addEventListener("DOMContentLoaded",() => {

  document.querySelector("form").onsubmit = () => {
    const base = document.querySelector("#local_currency").value;
    fetch(`https://api.exchangerate.host/latest?/source=ecb&base=${base}`)
    .then((response) => response.json())
    .then((data) =>  {
      const amount = document.querySelector("#amount_currency").value;
      const foreignCurrency = document.querySelector("#foreign_currency").value;
      const rate = data.rates[foreignCurrency];
      function convert(){
        return amount * rate;
      }
      document.querySelector("#results").innerHTML=`${amount} ${base.toUpperCase()} equal to ${foreignCurrency} ${convert().toFixed(
        4
      )}`;
    }).catch((error)=>{
      console.log("Error: ", error);
    });
    return false;
  };
});


document.addEventListener("DOMContentLoaded",() => {
const exchangeIcon = document.querySelector("#switch_button");
exchangeIcon.addEventListener("click", () => {
  switchCurrencies();
});

function switchCurrencies() {
  const localCurrency = document.querySelector("#local_currency");
  const foreignCurrency = document.querySelector("#foreign_currency");
  const temp = localCurrency.value;
  localCurrency.value = foreignCurrency.value;
  foreignCurrency.value = temp;
  const amount = document.querySelector("#amount_currency");
  const tempAmount = amount.value;
  amount.value = "";
  amount.value = tempAmount;
};
});

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



function filterFunction() {
  var input, filter, dropdown, options, i, count;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  dropdown = document.getElementById("myDropdown");
  options = dropdown.getElementsByTagName("option");
  count = 0;
  for (i = 0; i < options.length; i++) {
    if (options[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
      options[i].style.display = "block";
      count++;
    } else {
      options[i].style.display = "none";
    }
    if (count >= 5) {
      break;
    }
  }
  if (count > 0) {
    dropdown.classList.add("show");
  } else {
    dropdown.classList.remove("show");
  }

  if (input.value === "") {
    dropdown.classList.remove("show")
  }


}

function setSelectedValue() {
  var dropdown, selectedValueInput, input;
  dropdown = document.getElementById("myDropdown");
  input = document.getElementById("myInput");
  selectedValueInput = document.getElementById("selectedValue");
  selectedValueInput.value = dropdown.value;
  dropdown.classList.remove("show");
  input.value="";

}





document.addEventListener("DOMContentLoaded",() => {
  document.querySelector("form").onsubmit = () => {
    const localCurrency = document.querySelector("#local_currency").value;
    const amount = document.querySelector("#amount_currency").value;
    const foreignCurrency = document.querySelector("#foreign_currency").value;

    fetch(`https://api.exchangerate.host/convert?from=${localCurrency}&to=${foreignCurrency}&amount=${amount}`)
    .then((response) => response.json())
    .then((data) =>  {
      const result = data.result;
      console.log(result);
      document.querySelector("#results").innerHTML=`${amount} ${localCurrency} equal to ${foreignCurrency} ${convert().toFixed(4)}`;
    }).catch((error)=>{
      console.log("Error: ", error);
    });
    return false;
  };
});




const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3ebe14fa2amsh6da3e8b7880403ep11dbd6jsnbcc1654175ab',
		'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com'
	}
};

const inputElement = document.getElementById("")

function processResults(response) {
  var result = ""
  response.quotes.forEach(quote => {

      result += '<option value="' + quote.symbol + '">' + quote.shortname + '</option>'
    }
  );
  document.getElementById("myDropdown").innerHTML = result
}

function autoCompletion() {
  const options2 = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '3ebe14fa2amsh6da3e8b7880403ep11dbd6jsnbcc1654175ab',
      'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com'
    }
  };
input = document.getElementById("myInput").value;
document.getElementById("myDropdown").innerHTML = '<option disabled>Lädt...</option>'

fetch(`https://yh-finance.p.rapidapi.com/auto-complete?q=${input}`, options2)
	.then(response => response.json())
	.then(response => processResults(response))
	.catch(err => console.error(err));

}

window.onload = function() {
var canvas = document.getElementById("stock_chart_canvas");
var ctx = canvas.getContext("2d");

var canvasWidth = canvas.offsetWidth;
var canvasHeight = canvas.offsetHeight;

var x = canvasWidth * 0.5;

ctx.beginPath();
ctx.strokeStyle = "yellow";
ctx.moveTo(0, 0);
ctx.lineTo(canvasWidth, canvasHeight);
ctx.stroke();
}