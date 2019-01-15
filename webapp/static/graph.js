var ctxw = document.getElementById("line-chart-water").getContext('2d');
var water_chart = new Chart(ctxw, {
  type: 'line',
  scaleSteps : 10,
  scaleStepWidth : 50,
  scaleStartValue : 0,
  data: {
    labels: [],
    datasets: [{ 
        data: [],
        label: "Soil Moisture",
        borderColor: "#3e95cd",
        fillColor : 'rgba(62, 149, 205, 0.5)'
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      yAxes: [{
              display: true,
              ticks: {
                  beginAtZero: true,
                  steps: 1,
                  stepValue: 1,
                  max: 1
              }
          }]
    },
  }
});

var ctxl = document.getElementById("line-chart-light").getContext('2d');
var light_chart = new Chart(ctxl, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{ 
        data: [],
        label: "sensor 1",
        borderColor: "#ffcc00",
        fillColor : 'rgba(62, 149, 205, 0.5)'
      },
      { 
        data: [],
        label: "sensor 2",
        borderColor: "#FFA500",
        fillColor : 'rgba(62, 149, 205, 0.5)'
      }
    ]
  },
  options: {
  }
});

var ctxg = document.getElementById("line-chart-gaz").getContext('2d');
var temperature_chart = new Chart(ctxg, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{ 
        data: [],
        label: "Africa",
        borderColor: "#A30000",
        fill: false
      }
    ]
  },
  options: {
  }
});

var ctxt = document.getElementById("line-chart-temperature").getContext('2d');
var gaz_chart = new Chart(ctxt, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{ 
        data: [],
        label: "Africa",
        borderColor: "#00B259",
        fill: false
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      yAxes: [{
              display: true,
              ticks: {
                  beginAtZero: true,
                  steps: 1,
                  stepValue: 1,
                  max: 1
              }
          }]
    },
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
  client.subscribe("/home/plant1/sensor/luminosity1");
  client.subscribe("/home/plant1/sensor/luminosity2");
  client.subscribe("/home/plant1/sensor/temperature");
  client.subscribe("/home/plant1/sensor/carbon_monoxyde");
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

var xVal = 0;
var yVal = 100; 
var dataLength = 50; // number of dataPoints visible at any point

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
  console.log("onMessageArrived:"+message.destinationName);

  if (message.destinationName == "/home/plant1/sensor/moisture" ){
    water_chart.data.datasets[0].data.push(parseFloat(message.payloadString));
    water_chart.data.labels.push(xVal)
    xVal++;
    if (water_chart.data.labels.length > dataLength) {
      water_chart.data.labels.shift()
      water_chart.data.datasets[0].data.shift();
    }
    water_chart.update();
  }

  else if (message.destinationName == "/home/plant1/sensor/luminosity1" ){
    light_chart.data.datasets[0].data.push(parseFloat(message.payloadString));
    light_chart.data.labels.push(xVal)
    //xVal++;
    if (light_chart.data.labels.length > dataLength) {
      light_chart.data.labels.shift()
      light_chart.data.datasets[0].data.shift();
    }
    light_chart.update();
  }

  else if (message.destinationName == "/home/plant1/sensor/luminosity2" ){
    light_chart.data.datasets[1].data.push(parseFloat(message.payloadString));
    //water_chart.data.labels.push(xVal)
    //xVal++;
    if (light_chart.data.datasets[1].data.length > dataLength) {
      //light_chart.data.labels.shift()
      light_chart.data.datasets[1].data.shift();
    }
    light_chart.update();
  }

  else if (message.destinationName == "/home/plant1/sensor/temperature" ){
    temperature_chart.data.datasets[0].data.push(parseFloat(message.payloadString));
    temperature_chart.data.labels.push(xVal)
    //xVal++;
    if (temperature_chart.data.datasets[0].data.length > dataLength) {
      temperature_chart.data.labels.shift()
      temperature_chart.data.datasets[0].data.shift();
    }
    temperature_chart.update();
  }

  else if (message.destinationName == "/home/plant1/sensor/carbon_monoxyde" ){
    gaz_chart.data.datasets[0].data.push(parseFloat(message.payloadString));
    gaz_chart.data.labels.push(xVal)
    //xVal++;
    if (gaz_chart.data.datasets[0].data.length > dataLength) {
      gaz_chart.data.labels.shift()
      gaz_chart.data.datasets[0].data.shift();
    }
    gaz_chart.update();
  }
}