from sensors.soil_moisture import SoilMoisture
from sensors.gas import Gas
from time import sleep

if __name__ == "__main__":
    soil_moisture = SoilMoisture(21)
    gas = Gas(11)

    soil_moisture.start()
    gas.start()

    for i in range(10):
        sleep(1)