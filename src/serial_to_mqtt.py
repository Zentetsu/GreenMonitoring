import serial
import paho.mqtt.client as mqtt
import time
from math import pow
from collections import deque


def convert_temperature(analog_value):
    v = (5.0/1023) * analog_value
    temp = (v - 0.5)*100
    print(temp)
    return temp

def convert_light(analog_value):
    v = (5.0/1023) * analog_value
    res = (5 - v)/v * 100
    lux = 25000*pow(res, -1.405)
    print(lux)
    return lux

'''
ser=serial.Serial('/dev/ttyACM0', 9600)
client = mqtt.Client('raspy_home')
client.connect('iot.eclipse.org')

temp_buffer1 = deque(maxlen=100)
temp_buffer1 = deque(maxlen=100)
temp_buffer1 = deque(maxlen=100)

while True:
    if(ser.in_waiting>0):
        line=ser.readline()
        analog_values=line.split(':')
        if len(analog_values) == 5:
            client.publish('/home/plant1/sensor/moisture', '0.5')
            client.publish('/home/plant1/sensor/temperature', convert_temperature(int(analog_values[4])))
            client.publish('/home/plant1/sensor/luminosity1', convert_light(int(analog_values[0])))
            client.publish('/home/plant1/sensor/luminosity2', convert_light(int(analog_values[1])))
            client.publish('/home/plant1/sensor/carbon_monoxyde', '0.5')
    time.sleep(.5)

'''

client = mqtt.Client('raspy_home')
client.connect('iot.eclipse.org')
while True:
    client.publish('/home/plant1/sensor/moisture', '0.5')
    client.publish('/home/plant1/sensor/temperature', '0.5')
    client.publish('/home/plant1/sensor/luminosity1', '0.5')
    client.publish('/home/plant1/sensor/luminosity2', '0.5')
    client.publish('/home/plant1/sensor/carbon_monoxyde', '0.5')
    time.sleep(.5)