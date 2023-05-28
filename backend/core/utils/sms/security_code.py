from django.conf import settings as django_settings
from django.utils import timezone
from django.utils.crypto import get_random_string

from core.models import SMSVerification
from .backends.fake import Fake


class SecurityCodeService:
    SECURITY_CODE_VALID = 0
    SECURITY_CODE_INVALID = 1
    SECURITY_CODE_EXPIRED = 2
    SECURITY_CODE_VERIFIED = 3

    def __init__(self, backend=None):
        self.backend = backend or Fake()

    def send_verification(self, number, security_code):
        """
        Send a verification text to the given number to verify.
        :param number: the phone number of recipient.
        """
        self.backend.send_sms(number, security_code)

    def _generate_security_code(self, default_token_length=6):
        """
        Returns a unique random `security_code` for given `TOKEN_LENGTH` in the settings.
        """
        token_length = django_settings.PHONE_VERIFICATION.get(
            "TOKEN_LENGTH", default_token_length
        )
        return get_random_string(token_length, allowed_chars="0123456789")

    def check_security_code_expiry(self, stored_verification):
        """
        Returns True if the `security_code` for the `stored_verification` is expired.
        """
        time_difference = timezone.now() - stored_verification.created_at
        if time_difference.seconds > django_settings.PHONE_VERIFICATION.get(
                "SECURITY_CODE_EXPIRATION_TIME"
        ):
            return True
        return False

    def check_security_code_timeout(self, stored_verification):
        """
        Returns True if the `security_code` for the `stored_verification` didn't time out.
        """
        if not stored_verification:
            return None
        time_difference = timezone.now() - stored_verification.created_at
        if time_difference.seconds < django_settings.PHONE_VERIFICATION.get(
                "SECURITY_CODE_TIMEOUT_TIME"
        ):
            return True
        return False

    def create_security_code(self, phone_number, security_code=None):
        if not security_code:
            # Default security_code generated of 4 digits
            security_code = self._generate_security_code()

        stored_verification = SMSVerification.objects.filter(phone_number=phone_number).first()

        if self.check_security_code_timeout(stored_verification):
            raise Exception("Security code wait time didn't pass")

        # Delete old security_code(s) for phone_number exists
        SMSVerification.objects.filter(phone_number=phone_number).delete()

        SMSVerification.objects.create(
            phone_number=phone_number,
            security_code=security_code,
        )
        return security_code

    def validate_security_code(self, security_code, phone_number):
        stored_verification = SMSVerification.objects.filter(
            security_code=security_code, phone_number=phone_number
        ).first()

        # check security_code exists
        if stored_verification is None:
            return stored_verification, self.SECURITY_CODE_INVALID

        # check security_code is not expired
        if self.check_security_code_expiry(stored_verification):
            return stored_verification, self.SECURITY_CODE_EXPIRED

        # check security_code is not verified
        if stored_verification.is_verified and django_settings.PHONE_VERIFICATION.get(
                "VERIFY_SECURITY_CODE_ONLY_ONCE"
        ):
            return stored_verification, self.SECURITY_CODE_VERIFIED

        # mark security_code as verified
        stored_verification = SMSVerification.objects.filter(
            security_code=security_code,
            phone_number=phone_number,
        ).update(is_verified=True)

        return stored_verification, self.SECURITY_CODE_VALID
