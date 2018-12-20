import RPi.GPIO as GPIO, time

class SoilMoisture(object):

    def __init__(self, channel):
        print('Soil moisture initialization.')
        self.channel = channel
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(self.channel, GPIO.IN)

    def start(self):
        print('Start soil moisture detection.')
        GPIO.add_event_detect(self.channel, GPIO.BOTH, bouncetime=300)
        GPIO.add_event_callback(self.channel, self.callback)

    def callback(self, channel):
        print(GPIO.input(self.channel))
        if GPIO.input(channel) == 1:
            print('No water detected.')
        else:
            print('Water detected.')
