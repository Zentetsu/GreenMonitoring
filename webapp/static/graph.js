var ctxw = document.getElementById("line-chart-water").getContext('2d');
var water_dataa = [];
var water_chart = new Chart(ctxw, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{ 
        data: water_dataa,
        label: "Africa",
        borderColor: "#3e95cd",
        fillColor : 'rgba(62, 149, 205, 0.5)'
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'World population per region (in millions)'
    }
  }
});

var ctxl = document.getElementById("line-chart-light").getContext('2d');
var water_data = [86,114,106,106,107,111,133,221,783,2478];
var myChart = new Chart(ctxl, {
  type: 'line',
  data: {
    labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
    datasets: [{ 
        data: water_data,
        label: "Africa",
        borderColor: "#3e95cd",
        fillColor : 'rgba(62, 149, 205, 0.5)'
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'World population per region (in millions)'
    }
  }
});

var ctxg = document.getElementById("line-chart-gaz").getContext('2d');
var water_data = [86,114,106,106,107,111,133,221,783,2478];
var myChart = new Chart(ctxg, {
  type: 'line',
  data: {
    labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
    datasets: [{ 
        data: water_data,
        label: "Africa",
        borderColor: "#3e95cd",
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'World population per region (in millions)'
    }
  }
});

var ctxt = document.getElementById("line-chart-temperature").getContext('2d');
var water_data = [86,114,106,106,107,111,133,221,783,2478];
var myChart = new Chart(ctxt, {
  type: 'line',
  data: {
    labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
    datasets: [{ 
        data: water_data,
        label: "Africa",
        borderColor: "#3e95cd",
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'World population per region (in millions)'
    }
  }
});


client = new Paho.MQTT.Client("ws://iot.eclipse.org:80/ws", "javascript-client");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("/home/plant1/sensor/moisture");
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

var xVal = 0;
var yVal = 100; 
var updateInterval = 1000;
var dataLength = 50; // number of dataPoints visible at any point

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
  yVal = parseFloat(message.payloadString);
  water_dataa.push(yVal);
  water_chart.data.labels.push(xVal)
  xVal++;
  console.log(water_dataa);

	if (water_dataa.length > dataLength) {
    water_chart.data.labels.shift()
		water_dataa.shift();
	}

	water_chart.update();
}