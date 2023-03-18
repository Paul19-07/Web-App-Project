
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
      document.querySelector("#results").innerHTML=`${amount} ${base.toUpperCase()} ≙ ${foreignCurrency} ${convert().toFixed(
        2
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
