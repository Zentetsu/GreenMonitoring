/*
  AnalogReadSerial
  Reads an analog input on pin 0, prints the result to the serial monitor.
  Attach the center pin of a potentiometer to pin A0, and the outside pins to +5V and ground.
 
 This example code is in the public domain.
 */

// the setup routine runs once when you press reset:
void setup() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
}

// the loop routine runs over and over again forever:
void loop() {
  
  // luminosity
  // read the input on analog pin 0:
  int sensorValue = analogRead(A0);
  // print out the value you read:
  Serial.print("A0: ");
  Serial.println(sensorValue);
  sensorValue = analogRead(A1);
  Serial.print("A1: ");
  Serial.println(sensorValue);
  
  // gaz
  sensorValue = analogRead(A2);
  Serial.print("A2: ");
  Serial.println(sensorValue);
  
  // moisture
  sensorValue = analogRead(A3);
  Serial.print("A3: ");
  Serial.println(sensorValue);
  
  // temp
  //getting the voltage reading from the temperature sensor
  int reading = analogRead(A4);  
   
  // converting that reading to voltage, for 3.3v arduino use 3.3
  float voltage = reading * 5.0;
  voltage /= 1024.0; 
   
  // print out the voltage
  //Serial.print(voltage); Serial.println(" volts");
   
  // now print out the temperature
  float temperatureC = (voltage - 0.5) * 100 ;
  Serial.print("A4: ");
  Serial.println(temperatureC);
  
  delay(30000);        // delay in between reads for stability
}
