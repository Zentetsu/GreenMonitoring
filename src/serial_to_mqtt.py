import serial
import paho.mqtt.client as mqtt
import time
from math import pow
from collections import deque
from random import random
import numpy as np


def convert_temperature(analog_value):
    v = (5.0/1023) * analog_value
    temp = (v - 0.5)*100
    return temp

def convert_light(analog_value):
    v = (5.0/1023) * analog_value
    res = (5 - v)/v * 100
    lux = 25000*pow(res, -1.405) + 50
    return lux

def convert_gas(analog_value):
    return analog_value/1023.0

def convert_moisture(analog_value):
    return analog_value/1023.0

def get_mean_deque(buffer):
    return np.mean((list(buffer)))



buffer_temperature = deque(maxlen=10)

buffer_light_1 = deque(maxlen=10)
buffer_light_2 = deque(maxlen=10)

buffer_gas = deque(maxlen=10)

buffer_moisture = deque(maxlen=10)

ser=serial.Serial('/dev/ttyACM0', 9600)
client = mqtt.Client('raspy_home')
client.connect('iot.eclipse.org')

buffer_temperature = deque(maxlen=10)

buffer_light_1 = deque(maxlen=10)
buffer_light_2 = deque(maxlen=10)

buffer_gas = deque(maxlen=10)

buffer_moisture = deque(maxlen=10)

while True:
    if(ser.in_waiting>0):
        line=ser.readline()
        analog_values=line.split(':')
        if len(analog_values) == 5:
            buffer_light_1.append(int(analog_values[0]))
            buffer_light_2.append(int(analog_values[1]))
            buffer_gas.append(int(analog_values[2]))
            buffer_moisture.append(int(analog_values[3]))
            buffer_temperature.append(int(analog_values[4]))

            client.publish('/home/plant1/sensor/moisture', convert_moisture(get_mean_deque(buffer_moisture)))
            client.publish('/home/plant1/sensor/temperature', convert_temperature(get_mean_deque(buffer_temperature)))
            client.publish('/home/plant1/sensor/luminosity1', convert_temperature(get_mean_deque(buffer_light_1)))
            client.publish('/home/plant1/sensor/luminosity2', convert_temperature(get_mean_deque(buffer_light_2)))
            client.publish('/home/plant1/sensor/carbon_monoxyde', convert_gas(get_mean_deque(buffer_gas)))

    time.sleep(.5)
'''


client = mqtt.Client('raspy_home')
client.connect('iot.eclipse.org')
while True:
    buffer_light_1.append(450 + 10*random())
    buffer_light_2.append(400 + 10*random())
    buffer_gas.append(50 + 50*random())
    buffer_moisture.append(600 + 5*random())
    buffer_temperature.append(120 + 15*random())

    client.publish('/home/plant1/sensor/moisture', convert_moisture(get_mean_deque(buffer_moisture)))
    client.publish('/home/plant1/sensor/temperature', convert_temperature(get_mean_deque(buffer_temperature)))
    client.publish('/home/plant1/sensor/luminosity1', convert_temperature(get_mean_deque(buffer_light_1)))
    client.publish('/home/plant1/sensor/luminosity2', convert_temperature(get_mean_deque(buffer_light_2)))
    client.publish('/home/plant1/sensor/carbon_monoxyde', convert_gas(get_mean_deque(buffer_gas)))
    time.sleep(1)
'''
