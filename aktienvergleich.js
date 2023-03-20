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

document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("form").onsubmit = () => {

        var myTable = document.getElementById("myTable")
        console.log(myTable)

        var stock1 = document.getElementById("stock1")
        var stock2 = document.getElementById("stock2")

        var stock1Content1 = document.getElementById("stock1_content1")
        var stock2Content1 = document.getElementById("stock2_content1")

        var stock1Content2 = document.getElementById("stock1_content2")
        var stock2Content2 = document.getElementById("stock2_content2")

        var stock1Content3 = document.getElementById("stock1_content3")
        var stock2Content3 = document.getElementById("stock2_content3")

        var stock1Content4 = document.getElementById("stock1_content4")
        var stock2Content4 = document.getElementById("stock2_content4")

        var stock1Content5 = document.getElementById("stock1_content5")
        var stock2Content5 = document.getElementById("stock2_content5")

        var stock1Content6 = document.getElementById("stock1_content6")
        var stock2Content6 = document.getElementById("stock2_content6")

        var stock1Content7 = document.getElementById("stock1_content7")
        var stock2Content7 = document.getElementById("stock2_content7")

        var stock1Content8 = document.getElementById("stock1_content8")
        var stock2Content8 = document.getElementById("stock2_content8")

        var stock1Content9 = document.getElementById("stock1_content9")
        var stock2Content9 = document.getElementById("stock2_content9")

        var stockSymbol1 = document.getElementById("output1_value_stock").value
        var stockSymbol2 = document.getElementById("output2_value_stock").value

        console.log(stockSymbol1)

        fetch(`https://yh-finance.p.rapidapi.com/stock/v2/get-analysis?symbol=${stockSymbol1}`, options)
            .then(response => response.json())
            .then((response) => {

                var stock1Name = response.price.shortName
                var zelle = myTable.rows[0].cells[1]
                zelle.innerHTML = stock1Name

                var currentPriceStock1 = response.price.regularMarketPrice.raw
                var zelle = myTable.rows[1].cells[1]
                zelle.innerHTML = currentPriceStock1 + "$"

                var marketCapStock1 = response.price.marketCap.longFmt
                var zelle = myTable.rows[2].cells[1]
                zelle.innerHTML = marketCapStock1 + "$"

                var peRatioStock1 = response.indexTrend.peRatio.fmt
                var zelle = myTable.rows[3].cells[1]
                zelle.innerHTML = peRatioStock1

                var psRatioStock1 = response.summaryDetail.priceToSalesTrailing12Months.fmt
                var zelle = myTable.rows[4].cells[1]
                zelle.innerHTML = psRatioStock1

                var annualDividendsStock1 = response.summaryDetail.trailingAnnualDividendRate.fmt
                var zelle = myTable.rows[5].cells[1]
                zelle.innerHTML = annualDividendsStock1

            })

        /*
                fetch(`https://yh-finance.p.rapidapi.com/stock/v3/get-options?symbol=${stockSymbol1}`, options)
                .then(response => response.json())
                .then((response) => {
        
                    var performanceStock1 = response.defaultKeyStatistics["52WeekChange"].fmt
                    var zelle = myTable.rows[6].cells[1]
                    zelle.innerHTML = performanceStock1
        
                    var financialPartStock1 = response.defaultKeyStatistics.heldPercentInstitutions.fmt
                    var zelle = myTable.rows[7].cells[1]
                    zelle.innerHTML = financialPartStock1
        
                    var profitMarginStock1 = response.defaultKeyStatistics.profitMargins.fmt
                    var zelle = myTable.rows[8].cells[1]
                    zelle.innerHTML = profitMarginStock1
        
                    var enterpriseMultipleStock1 = response.defaultKeyStatistics.enterpriseToEbitda.fmt
                    var zelle = myTable.rows[9].cells[1]
                    zelle.innerHTML = enterpriseMultipleStock1
        
                    var sharesOutStock1 = response.defaultKeyStatistics.sharesPercentSharesOut.fmt
                    var zelle = myTable.rows[10].cells[1]
                    zelle.innerHTML = sharesOutStock1
                })
        */

        fetch(`https://yh-finance.p.rapidapi.com/stock/v2/get-analysis?symbol=${stockSymbol2}`, options)
            .then(response => response.json())
            .then((response) => {

                var stock1Name = response.price.shortName
                var zelle = myTable.rows[0].cells[2]
                zelle.innerHTML = stock1Name

                var currentPriceStock1 = response.price.regularMarketPrice.raw
                var zelle = myTable.rows[1].cells[2]
                zelle.innerHTML = currentPriceStock1 + "$"

                var marketCapStock1 = response.price.marketCap.longFmt
                var zelle = myTable.rows[2].cells[2]
                zelle.innerHTML = marketCapStock1 + "$"

                var peRatioStock1 = response.indexTrend.peRatio.fmt
                var zelle = myTable.rows[3].cells[2]
                zelle.innerHTML = peRatioStock1

                var psRatioStock1 = response.summaryDetail.priceToSalesTrailing12Months.fmt
                var zelle = myTable.rows[4].cells[2]
                zelle.innerHTML = psRatioStock1

                var annualDividendsStock1 = response.summaryDetail.trailingAnnualDividendRate.fmt
                var zelle = myTable.rows[5].cells[2]
                zelle.innerHTML = annualDividendsStock1

            })



        return false
    }
})