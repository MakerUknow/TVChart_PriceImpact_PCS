// VTX TradingView Lightweight Chart Testing
//Step 1: Define chart properties
//Step 2: Create the chart with defined properties and bind it to the dom element
//Step 3: Add the CandleStick series
//Step 4: Set the data and render chart

//Code

const API_KEY = "DFGDZIPFJ6Z8ZWSN4QAMIYIVHF1Y1QN8K1";
const PAIR_CONTRACT_ADDRESS = "0xf349a9f98c5405F5854d664Dd5fC7c89BE0F9D01";
const TOKEN_CONTRACT_ADDRESS = "0xf454377e595a3AB0eEF41c5b6f0473de1161CcD8";
const RESERVE_CONTRACT_ADDRESS = "0xcB2e6325DeAc7CD59ccE10fF90bfbe227d6D20Fc";

const log = console.log;

const chartProperties = {
    width: 1500,
    height: 600,
    timeScale:{
        timeVisible:true, // For setting time in milliseconds
        secondsVisible:false,
    },
    layout: {
        background: { color: '#222' },
        textColor: '#DDD',
    },
    grid: {
        vertLines: { color: '#444' },
        horzLines: { color: '#444' },
    },
}

const domElement = document.getElementById('tvchart');
const mCap = document.getElementById('marketcap');
const resBal = document.getElementById('reservebalance');
const priceImpact = document.getElementById('priceimpact');
const chart = LightweightCharts.createChart(domElement,chartProperties);

// function generateCandlestickData() {
//     for (i = 0; i < candleStore.length -1; i++) {
//         var candleData = {
//              0:[time = candleStore[0],
//              open = candleStore[1],
//              high = candleStore[2],
//              low = candleStore[3],
//              close = candleStore[4]]
//         }
//     }
// }

var candleStore = [];

const candleData = candleStore.map(d => {
    return {time:d[0],open:(d[1]),high:(d[2]),low:(d[3]),close:(d[4])}
})

// Generate sample data to use within a candlestick series
const candleStickData = candleStore; //generateCandlestickData();

//Convert the candlestick data for use with a line series
const lineData = candleStickData.map(datapoint => ({
    time: datapoint.time,
    value: (datapoint.close + datapoint.open) / 2,
}));

// Add an area series to the chart,
// Adding this before we add the candlestick chart
// so that it will appear beneath the candlesticks
const areaSeries = chart.addAreaSeries({
    priceFormat: {
        type: 'price',
        minMove: 0.0000000000001,
        precision: 13,
    },
    lastValueVisible: false, // hide the last value marker for this series
    crosshairMarkerVisible: false, // hide the crosshair marker for this series
    lineColor: 'transparent', // hide the line
    topColor: 'rgba(56, 33, 110, 0.6)',
    bottomColor: 'rgba(56, 33, 110, 0.1)',
});
// Set the data for the Area Series
// areaSeries.setData(lineData);

const candleSeries = chart.addCandlestickSeries({
    priceFormat: {
        type: 'price',
        minMove: 0.0000000000001,
        precision: 13,
    },
});

    //  candleSeries.setData(candleData);
    //  log(candleData);

// Setting the border color for the vertical axis
chart.priceScale().applyOptions({
    borderColor: 'rgba(56, 33, 110, 0.6)',
});

// Setting the border color for the horizontal axis
chart.timeScale().applyOptions({
    borderColor: 'rgba(56, 33, 110, 0.6)',
});

// Adjust the options for the priceScale of the mainSeries
candleSeries.priceScale().applyOptions({
    autoScale: true, // enables auto scaling based on visible content
    scaleMargins: {
        top: 0.1,
        bottom: 0.2,
    },
});

// Customizing the Crosshair
chart.applyOptions({
    crosshair: {
        // Change mode from default 'magnet' to 'normal'.
        // Allows the crosshair to move freely without snapping to datapoints
        //mode: LightweightCharts.CrosshairMode.Normal,

        // Vertical crosshair line (showing Date in Label)
        vertLine: {
            //width: 4,
            color: '#9B7DFF',
            //style: LightweightCharts.LineStyle.Solid,
            labelBackgroundColor: 'rgba(56, 33, 110, 0.6)',
        },

        // Horizontal crosshair line (showing Price in Label)
        horzLine: {
            color: '#9B7DFF',
            labelBackgroundColor: 'rgba(56, 33, 110, 0.6)',
        },
    },
});

// async function load () { // We need to wrap the loop into an async function for this to work
//   for (var i = 0; i < 3; i++) {
//     console.log(i);
//     await timer(3000); // then the created Promise can be awaited
//   }
// }



// Returns a Promise that resolves after "ms" Milliseconds
const timer = ms => new Promise(res => setTimeout(res, ms))

// var startTime = Math.floor((new Date()).getTime()/1000);
// log(startTime);
// var oneMinuteLater = Math.floor((new Date()).getTime()/1000+60);
// log(oneMinuteLater);

// const currentTime = async() => {
//     var currentTime = Math.floor(Date.now() / 1000);          
//     while (currentTime < oneMinuteLater) {
//         await timer(1000);
//         currentTime = await Math.floor(Date.now() / 1000);
//         log(currentTime);
//         continue;
//     } if (currentTime == oneMinuteLater) {
//         return oneMinuteLater;
//     }
    
// }
// currentTime();
var iterate = true;

function iterateLoop(bool) {
    iterate = bool;
}

async function getCandleData() {
    //var counter = 10000;
    var prevPrice;
    var prevHigh;
    var prevLow;
    var prevClose;

    var currentTime = Math.floor(Date.now() / 1000);
    //var startTime = Math.floor((new Date()).getTime()/1000);
    var prevUNIXtimestamp = Math.floor(Date.now() / 1000);
    //log(prevUNIXtimestamp);
    var UNIXtimestamp = Math.floor(Date.now() / 1000);
    //log(UNIXtimestamp);
    var oneMinuteLater = Math.floor((new Date()).getTime()/1000+60);
    //log(oneMinuteLater);
    // var blockRangeStart = blockNoByTimestamp;
    // log(blockRangeStart);
    // var blockRangeEnd = blockNoByTimestamp + 20;
    // log(blockRangeEnd);

    const iterateOverTime = async() => {
        for (let i = 0; iterate == true; i++) {
            while (currentTime < oneMinuteLater) {
                await timer(1000); // 1000 ms = 1s
                currentTime = Math.floor(Date.now() / 1000);
                //log(currentTime);
                continue;
            } if (currentTime >= oneMinuteLater) {
                currentTime = Math.floor(Date.now() / 1000);
                //log(currentTime);
                UNIXtimestamp = Math.floor(Date.now() / 1000);
                log(UNIXtimestamp);
                oneMinuteLater = Math.floor((new Date()).getTime()/1000+60);
                log(oneMinuteLater);
                // blockRangeEnd = await blockNoByTimestamp;
                // log(blockRangeEnd);
            }
        }
    }
    iterateOverTime();

    for (let i = 0; iterate == true; i++) {
        await timer(10000); // 10000ms = 10s
        // wait for the promise to resolve before advancing the for loop
        // https://api-sepolia.etherscan.io/api?module=stats&action=tokensupply&contractaddress=${TOKEN_CONTRACT_ADDRESS}&apikey=${API_KEY}
        let token1ReserveBalance = fetch(`http://127.0.0.1:9665/fetchAPI?endpoint=https://api-sepolia.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${TOKEN_CONTRACT_ADDRESS}&address=${PAIR_CONTRACT_ADDRESS}&tag=latest&apikey=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
        const dataLogSupply = data.result;
        return dataLogSupply;
        })
        // https://api-sepolia.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${RESERVE_CONTRACT_ADDRESS}&address=${PAIR_CONTRACT_ADDRESS}&tag=latest&apikey=${API_KEY}
        let token0ReserveBalance = fetch(`http://127.0.0.1:9665/fetchAPI?endpoint=https://api-sepolia.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${RESERVE_CONTRACT_ADDRESS}&address=${PAIR_CONTRACT_ADDRESS}&tag=latest&apikey=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
        const dataLogBalance = data.result;
        return dataLogBalance;
        })

        // https://api-sepolia.etherscan.io/api?module=stats&action=ethprice&apikey=YourApiKeyToken
        let currentETHPrice = fetch(`https://api-sepolia.etherscan.io/api?module=stats&action=ethprice&apikey=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
        const fetchedETHPrice = parseFloat(data.result.ethusd);
        //log(fetchedETHPrice);
        return fetchedETHPrice;
        })

        // let blockNoByTimestamp = fetch(`https://api.bscscan.com/api?module=block&action=getblocknobytime&timestamp=${currentTime}&closest=before&apikey=${API_KEY}`)
        //     .then(res => res.json())
        //     .then(data => {
        // const currentBlock = parseFloat(data.result);
        // return currentBlock;
        // })

        // let tokenTransferEvents = fetch(`https://api.bscscan.com/api
        // ?module=account
        // &action=tokentx
        // &contractaddress=${PAIR_CONTRACT_ADDRESS}
        // &address=${RESERVE_CONTRACT_ADDRESS}
        // &page=1
        // &offset=5
        // &startblock=${blockRangeStart}
        // &endblock=${blockRangeEnd}
        // &sort=asc
        // &apikey=${API_KEY}`)
        //     .then(res => res.json())
        //     .then(data => {
        // const BEP20TransferEvents = parseFloat(data.result.value);
        // return BEP20TransferEvents;
        // })

        let price = (await token0ReserveBalance / await token1ReserveBalance);
        let marketCap = (await price) * (await token1ReserveBalance);

        if (price == prevPrice) {
            continue;
        } else if (price != prevPrice) {
        log(i);
        //log(price);

        var open;
        var high;
        var low;
        var close;
        
        if (i == 0) {
            open = price;
            high = price;
            low = price;
            close = price;
            prevHigh = price;
            prevLow = price;
            prevClose = price;           
        } else if (UNIXtimestamp == prevUNIXtimestamp) {
            open = prevClose;
            if (price > high) {
                high = price;
            }
            if (price < low) {
                low = price;
            }
            close = price;
        } else if (UNIXtimestamp > prevUNIXtimestamp) {
            prevHigh = high;
            prevLow = low;
            prevClose = close;
            open = prevClose;
            if (price > open) {
                high = price;
            } else {
                high = open;
            }
            if (price < open) {
                low = price;
            } else {
                low = open;
            }
            close = price;
            prevUNIXtimestamp = UNIXtimestamp;
        }
          

        var array1 = [];
        array1[0] = UNIXtimestamp
        array1[1] = toSigned(open)
        array1[2] = toSigned(high)
        array1[3] = toSigned(low)
        array1[4] = toSigned(close)
        // array1[5] = blockNoByTimestamp
        // array1[6] = toSigned(tokenTransferEvents)
        //log(array1)

        candleStore.push([UNIXtimestamp, toSigned(open), toSigned(high), toSigned(low), toSigned(close)]);
        log(candleStore);

        var candleData = {
            time: array1[0],
            open: array1[1],
            high: array1[2],
            low: array1[3],
            close: array1[4]
        }

        var lineData = {
            time: array1[0],
            value: toSigned((parseFloat(array1[4]) + parseFloat(array1[1])) / 2),
        };

        // var volumeData = {
        //     time: array1[0],
        //     value: array1[6]
        // }
        
        areaSeries.update(lineData);
        candleSeries.update(candleData);
        log(candleData);
        log(lineData);
        
        var updateReserveBalance    = RESERVE_CONTRACT_ADDRESS == 0xcB2e6325DeAc7CD59ccE10fF90bfbe227d6D20Fc 
                                    ? toSigned(await token0ReserveBalance * await currentETHPrice / 1000000000000000000) 
                                    : toSigned(await token0ReserveBalance / 1000000000000000000);
        var updateMarketCap         = RESERVE_CONTRACT_ADDRESS == 0xcB2e6325DeAc7CD59ccE10fF90bfbe227d6D20Fc 
                                    ? toSigned(marketCap * await currentETHPrice / 1000000000000000000) 
                                    : toSigned(marketCap / 1000000000000000000);
        var updatePriceImpact       = price > prevPrice ? toSigned(((price - prevPrice) / prevPrice) * 100) : toSigned(((prevPrice - price) / prevPrice) * -100);

        resBal.innerHTML = "Reserve Balance: " + "<br>" + "<span style='color: green;'>$</span>" + "<span style='color: green;'>" + updateReserveBalance.toFixed(2) + "</span>";
        mCap.innerHTML = "Market Cap: " + "<br>" + "<span style='color: green;'>$</span>" + "<span style='color: green;'>" + updateMarketCap.toFixed(2) + "</span>";
        priceImpact.innerHTML = "Price Impact: " + "<br>" + "<span style='color: green;'>" + updatePriceImpact.toFixed(2) + "</span>" + "<span style='color: green;'>%</span>";

        prevPrice = price;
        }
    }
}
//getCandleData();

// class CandleData {
//     constructor(time, open, high, low, close) {
//         this.time = time
//         this.open = open
//         this.high = high
//         this.low = low
//         this.close = close
//     }
// }

// const testUpdate = async() => {

//     for (i = 0; i<10; i++) {
//         updatePrice()
//         // .then(
//         //     setTimeout(i, 5000)
//         //     );
//         // candleSeries.update(candleData);
//         // log(candleData);
//     }

//     // const UNIXtimestamp = Math.floor(Date.now() / 1000);
//     // var d = await tokenPrice();
//     // var updateCandleData = new CandleData(UNIXtimestamp, d, d, d, d);
//     // candleSeries.update(updateCandleData);
// }
//testUpdate();

function toSigned(x) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split('e-')[1]);
      if (e) {
          x *= Math.pow(10,e-1);
          x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
          e -= 20;
          x /= Math.pow(10,e);
          x += (new Array(e+1)).join('0');
      }
    }
    return x;
}

function setDecimals(number, decimals){
    number = number.toString();
    let numberAbs = number.split('.')[0]
    let numberDecimals = number.split('.')[1] ? number.split('.')[1] : '';
    while(numberDecimals.length < decimals){
        numberDecimals += "0";
    }
    return numberAbs;
}

function loopn(n, fn, delay)
{
    if (n > 0) {
        //updatePrice();
        if (n > 1) {
            setTimeout(function() {
                loopn(n - 1, fn, delay);
            }, delay);
        }
    }
}

loopn(10, function() {
    console.log('hello there');
}, 10000);

// The object
var obj = {
    a: 5,
    b: function (param) {
        return param;
    }
};

// Convert to JSON using a replacer function to output
// the string version of a function with /Function(
// in front and )/ at the end.
var json = JSON.stringify(obj, function(key, value) {
  if (typeof value === "function") {
    return "/Function(" + value.toString() + ")/";
  }
  return value;
});

// if(isNaN(price)) {
//     log("price NaN");
// } else {
//     log("Is a Number");
// }