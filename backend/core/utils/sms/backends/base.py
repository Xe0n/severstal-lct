class BaseSmsBackend:
    """
    Base class for sms backend implementations.
    Subclasses must at least overwrite send_sms()
    """

    def send_sms(self, sms, phone_number):
        """
        Sends sms to the provided phone_number
        """
        raise NotImplementedError
