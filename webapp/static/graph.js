var ctxw = document.getElementById("line-chart-water").getContext('2d');
var water_chart = new Chart(ctxw, {
  type: 'line',
  data: {
    labels: [...Array(30).keys()],
    datasets: [{ 
        data: [],
        label: "Soil Moisture (%)",
        borderColor: "#3e95cd",
        backgroundColor : "rgba(62, 149, 205, 0.2)",
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
          }],
      xAxes: [{
        display: false,
    }]
    },
  }
});

var ctxl = document.getElementById("line-chart-light").getContext('2d');
var light_chart = new Chart(ctxl, {
  type: 'line',
  data: {
    labels: [...Array(30).keys()],
    datasets: [{ 
        data: [],
        label: "Light (lx) from sensor 1",
        borderColor: "#ffcc00",
        backgroundColor : 'rgba(255, 204, 0, 0.2)'
      },
      { 
        data: [],
        label: "Light (lx) from sensor 2",
        borderColor: "#FFA500",
        backgroundColor : 'rgba(255, 165, 0, 0.2)'
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      xAxes: [{
        display: false,
      }]
    },
  }
});

var ctxg = document.getElementById("line-chart-gaz").getContext('2d');
var temperature_chart = new Chart(ctxg, {
  type: 'line',
  data: {
    labels: [...Array(30).keys()],
    datasets: [{ 
        data: [],
        label: "Temperature (C°)",
        borderColor: "#A30000",
        backgroundColor: "rgba(163, 0, 0, 0.2)"
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      yAxes: [{
              display: true,
              ticks: {
                  min: -5,
                  steps: 1,
                  stepValue: 1,
                  max: 25
              }
      }],
      xAxes: [{
        display: false,
      }]
    },
  }
});

var ctxt = document.getElementById("line-chart-temperature").getContext('2d');
var gaz_chart = new Chart(ctxt, {
  type: 'line',
  data: {
    labels: [...Array(30).keys()],
    datasets: [{ 
        data: [],
        label: "Carbon Monoxyde (%)",
        borderColor: "#00B259",
        backgroundColor: "rgba(0, 178, 89, 0.2)"
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
          }],
      xAxes: [{
        display: false,
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

var dataLength = 30; // number of dataPoints visible at any point

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
  console.log("onMessageArrived:"+message.destinationName);

  if (message.destinationName == "/home/plant1/sensor/moisture" ){
    document.getElementById("moisture-value").innerHTML = (parseFloat(message.payloadString)*100).toFixed(2) + "%";
    water_chart.data.datasets[0].data.push(parseFloat(message.payloadString));
    if (water_chart.data.datasets[0].data.length > dataLength) {
      water_chart.data.datasets[0].data.shift();
    }
    water_chart.update();
  }

  else if (message.destinationName == "/home/plant1/sensor/luminosity1" ){
    light_chart.data.datasets[0].data.push(parseFloat(message.payloadString));
    if (light_chart.data.datasets[0].data.length > dataLength) {
      light_chart.data.datasets[0].data.shift();
    }
    light_chart.update();
  }

  else if (message.destinationName == "/home/plant1/sensor/luminosity2" ){
    light_chart.data.datasets[1].data.push(parseFloat(message.payloadString));
    if (light_chart.data.datasets[1].data.length > dataLength) {
      light_chart.data.datasets[1].data.shift();
    }
    document.getElementById("light-value").innerHTML =  ((light_chart.data.datasets[0].data[light_chart.data.datasets[0].data.length-1] + light_chart.data.datasets[1].data[light_chart.data.datasets[1].data.length-1])/2).toFixed(2) + "lx";
    light_chart.update();
  }

  else if (message.destinationName == "/home/plant1/sensor/temperature" ){
    document.getElementById("temp-value").innerHTML = parseFloat(message.payloadString).toFixed(2) + "°";
    temperature_chart.data.datasets[0].data.push(parseFloat(message.payloadString));
    if (temperature_chart.data.datasets[0].data.length > dataLength) {
      temperature_chart.data.datasets[0].data.shift();
    }
    temperature_chart.update();
  }

  else if (message.destinationName == "/home/plant1/sensor/carbon_monoxyde" ){
    document.getElementById("carbon-value").innerHTML = (parseFloat(message.payloadString)*100).toFixed(2) + "%";
    gaz_chart.data.datasets[0].data.push(parseFloat(message.payloadString));
    if (gaz_chart.data.datasets[0].data.length > dataLength) {
      gaz_chart.data.datasets[0].data.shift();
    }
    gaz_chart.update();
  }
}