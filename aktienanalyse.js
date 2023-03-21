function filterFunction(outputID) {

  var input, filter, dropdown, options, count;
  input = document.getElementById(outputID + "_input");
  filter = input.value.toUpperCase();
  dropdown = document.getElementById(outputID + "_select");
  options = dropdown.getElementsByTagName("option");
  count = 0;


  console.log("HII " + options.length)
  if (options.length == 0) {
      dropdown.innerHTML = '<option disabled>Keine Einträge gefunden</option>'
  }
  // } else if (count == 0) {
  //   dropdown.innerHTML = '<option disabled>Keine Einträge gefunden</option>'
  // }



}

function setSelectedValue(outputID) {
  var dropdown, selectedValueInput, input;
  dropdown = document.getElementById(outputID + "_select");
  input = document.getElementById(outputID + "_input");
  selectedValueInput = document.getElementById(outputID + "_value_stock");
  selectedValueInput.value = dropdown.value;
  dropdown.classList.remove("show");
  input.value = "";

}


const options = {
  method: 'GET',
  headers: {
      'X-RapidAPI-Key': '43ff4c0785msh7f17e4fc76bcaa7p1bd575jsn291a4f407afa',
      'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
  }
};

const inputElement = document.getElementById("")


function processResults(response, outputID) {
  var result = ""
  response.quotes.forEach(quote => {
      result += '<option value="' + quote.symbol + '">' + quote.shortname + '</option>'
  });
  document.getElementById(outputID + "_select").innerHTML = result
  filterFunction(outputID)
}


function autoCompletion(outputID) {
  const options2 = {
      method: 'GET',
      headers: {
          'X-RapidAPI-Key': '43ff4c0785msh7f17e4fc76bcaa7p1bd575jsn291a4f407afa',
          'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
      }
  };
  input = document.getElementById(outputID + "_input").value;

  if (input == "") {
      document.getElementById(outputID + "_select").classList.remove("show")
  } else {
      document.getElementById(outputID + "_select").classList.add("show")
      document.getElementById(outputID + "_select").innerHTML = '<option disabled>Lädt...</option>'
      fetch(`https://yh-finance.p.rapidapi.com/auto-complete?q=${input}`, options2)
          .then(response => response.json())
          .then(response => processResults(response, outputID))
          .catch(err => console.error(err));
  }

}






document.addEventListener("DOMContentLoaded",() => {

document.querySelector("form").onsubmit = () => {

  var canvas = document.getElementById("stock_chart_canvas");
  var ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var stockSymbol = document.getElementById("output1_value_stock").value;
  console.log(stockSymbol)

  var range = document.getElementById("stock_range").value
  console.log(range + " Range")

  var interval = ""

  if (range === "1d") {
    interval = "1m";
  } else if (range === "5d") {
    interval = "30m";
  } else if (range === "1mo") {
    interval = "60m";
  } else if (range === "3mo") {
    interval = "60m";
  } else if (range === "6mo") {
    interval = "1d";
  } else if (range === "1y") {
    interval = "1d";
  } else if (range === "2y") {
    interval = "1d";
  } else if (range === "5y") {
    interval = "1wk";
  } else if (range === "10y") {
    interval = "1wk";
  } else if (range === "ytd") {
    interval = "1d";
  } else {
    interval = "1mo";
  }

console.log(interval + " Das ist das generierte Intervall")
  

var canvasWidth = canvas.offsetWidth;
var canvasHeight = canvas.offsetHeight;

var x = canvasWidth * 0.5;


for (i = 0.03; i < 0.93; i += 0.1) {
  ctx.beginPath();
  ctx.strokeStyle = "grey";
  ctx.moveTo(i * canvasWidth, 0.87 * canvasHeight);
  ctx.lineTo(i * canvasWidth, 0.07 * canvasHeight);
  ctx.stroke();
}

for (i = 0.07; i < 0.87; i += 0.08) {
  ctx.beginPath();
  ctx.strokeStyle = "grey";
  ctx.moveTo(0.03 * canvasWidth, i * canvasHeight);
  ctx.lineTo(0.93 * canvasWidth, i * canvasHeight);
  ctx.stroke();
}





fetch(`https://yh-finance.p.rapidapi.com/stock/v3/get-chart?interval=${interval}&symbol=${stockSymbol}&range=${range}&region=US&includePrePost=false&useYfid=true&includeAdjustedClose=true&events=capitalGain%2Cdiv%2Csplit`, options)
	.then(response => response.json())
  .then((response) =>  { 

    var newStockSymbol = response.chart.result[0].meta.symbol

    var timestamps = response.chart.result[0].timestamp;
    console.log(timestamps)

    var firstTimestamp = timestamps[0];
    var lastTimestamp = timestamps[timestamps.length - 1];
    console.log(firstTimestamp);
    console.log(lastTimestamp);

    var timeBetween = lastTimestamp - firstTimestamp
    console.log(timeBetween)

    var timePerStamp = (timeBetween / 9).toFixed(0)
    timePerStamp = Number(timePerStamp)
    console.log(typeof timePerStamp)
    console.log(typeof timeBetween)

    var xAxisPosition = 0.01
    var counter1 = 0

    for (i = firstTimestamp; i < (lastTimestamp + 100); i += timePerStamp) {

      if (counter1 >= 10) {
        break;
      }
      currentTimestamp = i * 1000;
      currentTimestamp = new Date(currentTimestamp);
      let year = currentTimestamp.getFullYear();
      let month = currentTimestamp.getMonth();
      month = month + 1
      let day = currentTimestamp.getDate();
      let hour = currentTimestamp.getHours();
      let minute = currentTimestamp.getMinutes();

      if (minute < 10) {
        minute = minute.toString();
        minute = `0${minute}`;
      }


      timeToPrint = `${day}.${month}.${year}`
      clockTimeToPrint = `${hour}:${minute}`

      ctx.font = "10px Arial";
      ctx.fillStyle = "white";
      ctx.fillText(timeToPrint, xAxisPosition * canvasWidth, 0.9 * canvasHeight);
      ctx.fillText(clockTimeToPrint, (xAxisPosition + 0.01) * canvasWidth, 0.92 * canvasHeight);
      xAxisPosition += 0.1
      console.log(i)

      counter1 += 1
    
    }

    var highPrize = response.chart.result[0].indicators.quote[0].high;
    console.log(highPrize)

    highPrize = highPrize.filter(element => {
      return element !== null;
    })

    var highestPrize = Math.max(...highPrize);
    var lowestPrize = Math.min(...highPrize);

    let prizeBetween = highestPrize - lowestPrize;
    let prizePerStamp = (prizeBetween / 9).toFixed(2);
    prizePerStamp = Number(prizePerStamp)

    console.log(typeof highestPrize)
    console.log(typeof lowestPrize)
    console.log(typeof prizeBetween)
    console.log(typeof prizePerStamp)

    console.log(highestPrize.toFixed(2), lowestPrize.toFixed(2))

    var counter2 = 0
    var yAxisPosition = 0.795

    for (i = lowestPrize; i <= (highestPrize + 100); i += prizePerStamp) {

      if (counter2 >= 10) {
        break;
      }

      currentPrize = i.toFixed(2);
      console.log(currentPrize)

      ctx.font = "10px Arial";
      ctx.fillStyle = "white";
      ctx.fillText(currentPrize + "$", 0.94 * canvasWidth, yAxisPosition * canvasHeight);

      yAxisPosition -= 0.08

      counter2 += 1;
    }

    var progressPerPoint = 0.9 / (highPrize.length - 1)
    console.log(progressPerPoint)
    var xValue = 0.03


    ctx.beginPath();
    for (i = 0; i <= highPrize.length; i++) {

      if (highPrize[i] === null) {
        ctx.arc( xValue * canvasWidth, prizePercentage * canvasHeight, 0, 0, 0, false);
        xValue += progressPerPoint;
      }

      else {
      var prize = highPrize[i] 
      prize = prize - lowestPrize
      var prizeDifference = highestPrize - lowestPrize 

      /* Preis immer Minus den niedristen machen, um Differenz rauszufinden */
      /* Dann noch den höchsten vom niedrigsten abziehen*/

      var prizePercentage = prize / prizeDifference;
      prizePercentage = 1 - prizePercentage;
      prizePercentage = prizePercentage * 0.72;
      prizePercentage = prizePercentage + 0.07

      ctx.arc( xValue * canvasWidth, prizePercentage * canvasHeight, 0, 0, 0, false);
      ctx.strokeStyle = 'red';
      ctx.stroke();

      console.log(xValue);
      console.log(prizePercentage + " tütütü")

      xValue += progressPerPoint;
      }

      /* 0.07 bis 0.79 auf der y-Achse
        es wird um 0.72 fortgeschritten und muss in gleichmäßige Teile aufgeteilt werden


      /* 0.03 bis 0.93 auf der x-Achse
         es wird um 0.9 fortgeschritten und muss in gleichmäßige Teile aufgeteilt werden*/
      
      /* Variable, wie weit pro Punkt fortgeschritten wird*/

    }
    ctx.closePath();


    fetch(`https://yh-finance.p.rapidapi.com/stock/v3/get-options?symbol=${newStockSymbol}`, options)
    .then(response => response.json())
    .then((response) => {
      var obj = response.optionChain.result[0].quote.shortName
      console.log(obj)
    

    ctx.font = "15px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(obj, 0.03 * canvasWidth, 0.05 * canvasHeight);

    })

    console.log(highPrize)

  })
	.catch(err => console.error(err));
  return false
}
})