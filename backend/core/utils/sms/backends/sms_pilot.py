import requests
from django.conf import settings as django_settings

from .base import BaseSmsBackend


class SmsPilotBackend(BaseSmsBackend):
    API_KEY = django_settings.SMS_BACKENDS.get('SMS_PILOT').get('API_KEY')
    SENDER = django_settings.SMS_BACKENDS.get('SMS_PILOT').get('SENDER')

    def send_sms(self, phone_number, sms):
        self._send(phone_number, sms)

    def _send(self, phone_number, sms):
        url = f'http://smspilot.ru/api.php?send={sms}&to={phone_number}&from={self.SENDER}&apikey={self.API_KEY}&format=json'
        try:
            response = requests.get(url)
        except Exception as e:
            raise e('SMS_SERVICE_FAILURE')

