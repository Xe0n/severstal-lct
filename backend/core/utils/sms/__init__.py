from core.utils.sms.security_code import SecurityCodeService
from core.utils.sms.backends.sms_pilot import SmsPilotBackend
from app.settings import DEBUG, PHONE_VERIFICATION

BACKEND = SmsPilotBackend()
SERVICE = SecurityCodeService(BACKEND)

AUTH_EXEMPTION = PHONE_VERIFICATION['AUTH_EXEMPT_CREDENTIALS']


def send_security_code(phone_number):
    if DEBUG and phone_number in AUTH_EXEMPTION['AUTH_EXEMPT_PHONES']:
        return
    security_code = SERVICE.create_security_code(phone_number)
    verification = SERVICE.send_verification(phone_number, security_code)


def validate_security_code(phone_number, security_code):
    if DEBUG and phone_number in AUTH_EXEMPTION['AUTH_EXEMPT_PHONES'] \
             and security_code == AUTH_EXEMPTION['AUTH_EXEMPT_CODE']:
        return

    verification, token_validation = SERVICE.validate_security_code(
        phone_number=phone_number,
        security_code=security_code
    )
    if verification is None:
        raise Exception("Security code is not valid")
    elif token_validation == SERVICE.SECURITY_CODE_EXPIRED:
        raise Exception("Security code has expired")
    elif token_validation == SERVICE.SECURITY_CODE_VERIFIED:
        raise Exception("Security code is already verified")
