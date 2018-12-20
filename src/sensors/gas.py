import RPi.GPIO as GPIO, time

class Gas(object):

    def __init__(self, channel):
        print('Gas initialization.')
        self.channel = channel
        GPIO.setmode(GPIO.BOARD)
        GPIO.setup(self.channel, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

    def start(self):
        print('Start gas detection.')
        GPIO.add_event_detect(self.channel, GPIO.RISING)
        GPIO.add_event_callback(self.channel, self.callback)

    def callback(self, channel):
        print('Sensor detected action!')