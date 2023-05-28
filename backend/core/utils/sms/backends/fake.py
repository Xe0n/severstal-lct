class Fake:
    """
    Prints the security code and phone number to the console.
    """
    def send_sms(self, phone_number, security_code):
        return f'Fake SMS to {phone_number} security_code={security_code}'