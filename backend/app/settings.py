"""
Django settings for the project.
"""

import os
from datetime import timedelta

from django.core.exceptions import ImproperlyConfigured


# Get the environment variables from .env file
def get_env_variable(name, optional=False):
    """Get the environment variable or return exception"""
    try:
        return os.environ[name]
    except KeyError:
        if optional:
            return None
        raise ImproperlyConfigured(f'Set the {name} environment variable')


# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = get_env_variable('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = get_env_variable('DEBUG_MODE') == 'True'
ALLOWED_HOSTS = ['*']

# CORS settings
CORS_ORIGIN_ALLOW_ALL = True

# Push notification settings

PUSH_NOTIFICATIONS_SETTINGS = {
    'FCM_API_KEY': get_env_variable('FCM_API_KEY'),
    'UPDATE_ON_DUPLICATE_REG_ID': True
}

# # Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = 'app/static'
#
# STATIC_URL = '/static/'
# STATICFILES_DIRS = [
#     'app/static'
# ]
# STATIC_ROOT = os.path.join(BASE_DIR, 'static')
# STATICFILES_FINDERS = [
#     'django.contrib.staticfiles.finders.FileSystemFinder',
#     'django.contrib.staticfiles.finders.AppDirectoriesFinder',
# ]

# Application definition
PROJECT_APPS = [
    'core.apps.CoreConfig',
    'wear',
]

DEPENDENCIES = [
    'corsheaders',
    'phonenumber_field',
    'rest_framework',
    'rest_framework_swagger',
]

INSTALLED_APPS = [
                     'django.contrib.admin',
                     'django.contrib.auth',
                     'rest_framework_simplejwt',
                     'django.contrib.contenttypes',
                     'django.contrib.sessions',
                     'django.contrib.messages',
                     'django.contrib.staticfiles',
                     'django.contrib.gis',
                 ] + DEPENDENCIES + PROJECT_APPS

if DEBUG:
    CORS_ORIGIN_WHITELIST = [
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ]


AUTH_USER_MODEL = 'core.User'

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
]


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'app.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
            'libraries': {
                'staticfiles': 'django.templatetags.static',
            },
        },
    },
]

WSGI_APPLICATION = 'app.wsgi.application'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': get_env_variable('POSTGRES_DB'),
        'USER': get_env_variable('POSTGRES_USER'),
        'PASSWORD': get_env_variable('POSTGRES_PASSWORD'),
        'HOST': get_env_variable('DB_HOST'),
        'PORT': get_env_variable('DB_PORT'),
        'OPTIONS': {
            'sslmode': get_env_variable('SSL_VERIFY'),
        },
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator', },
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', },
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator', },
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator', },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Email Settings
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.yandex.ru'
EMAIL_USE_SSL = True
EMAIL_PORT = 465
EMAIL_HOST_USER = get_env_variable('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = get_env_variable('EMAIL_HOST_PASSWORD')

# Email admins settings
ADMINS = [('HUM Developers', 'damian@HUM.dev')]
SERVER_EMAIL = 'support.bapp@HUM.dev'

# ObjectStorage settings
if not DEBUG:
    AWS_ACCESS_KEY_ID = get_env_variable('AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = get_env_variable('AWS_SECRET_ACCESS_KEY')
    AWS_STORAGE_BUCKET_NAME = get_env_variable('AWS_BUCKET_NAME')
    AWS_S3_ENDPOINT_URL = get_env_variable('AWS_ENDPOINT_URL')
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    AWS_S3_FILE_OVERWRITE = False
    AWS_QUERYSTRING_AUTH = False
    AWS_DEFAULT_ACL = 'public-read'
    MEDIA_URL = f'{AWS_S3_ENDPOINT_URL}/{AWS_STORAGE_BUCKET_NAME}/'
else:
    MEDIA_ROOT = 'app/media'
    MEDIA_URL = '/media/'

# Phone number field settings
PHONENUMBER_DB_FORMAT = 'NATIONAL'
PHONENUMBER_DEFAULT_REGION = 'RU'

# Auth exemption
if DEBUG:
    exempt_phones_str = get_env_variable('AUTH_EXEMPT_PHONES', optional=True)
    exempt_phones = exempt_phones_str.split(',') if exempt_phones_str else []
    AUTH_EXEMPT_CREDENTIALS = {
        'AUTH_EXEMPT_PHONES': exempt_phones,
        'AUTH_EXEMPT_CODE': get_env_variable('AUTH_EXEMPT_CODE', optional=True)
    }
else:
    AUTH_EXEMPT_CREDENTIALS = {}

# Sms auth settings
PHONE_VERIFICATION = {
    'TOKEN_LENGTH': 4,
    'SECURITY_CODE_EXPIRATION_TIME': 3600,
    'SECURITY_CODE_TIMEOUT_TIME': 10,
    'VERIFY_SECURITY_CODE_ONLY_ONCE': True,
    'AUTH_EXEMPT_CREDENTIALS': AUTH_EXEMPT_CREDENTIALS
}

# Sms backends
SMS_BACKENDS = {
    'SMS_PILOT': {
        'SENDER': 'INFORM',
        'API_KEY': get_env_variable('SMSPILOT_API_KEY'),
    }
}

# Logging

if not DEBUG:
    LOGGING = {
        "version": 1,
        "disable_existing_loggers": False,
        "handlers": {
            "console": {
                "class": "logging.StreamHandler",
            },
        },
        "loggers": {
            "django": {"handlers": ["console"], "level": "INFO"},
        },
    }


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema'
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=20),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=50),
    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": False,
    "UPDATE_LAST_LOGIN": False,

    "ALGORITHM": "HS256",
    "SIGNING_KEY": get_env_variable('SECRET_KEY'),
    "VERIFYING_KEY": "",
    "AUDIENCE": None,
    "ISSUER": None,
    "JSON_ENCODER": None,
    "JWK_URL": None,
    "LEEWAY": 0,

    "AUTH_HEADER_TYPES": ("Bearer",),
    "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
    "USER_AUTHENTICATION_RULE": "rest_framework_simplejwt.authentication.default_user_authentication_rule",

    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "TOKEN_TYPE_CLAIM": "token_type",
    "TOKEN_USER_CLASS": "rest_framework_simplejwt.models.TokenUser",

    "JTI_CLAIM": "jti",

    "SLIDING_TOKEN_REFRESH_EXP_CLAIM": "refresh_exp",
    "SLIDING_TOKEN_LIFETIME": timedelta(days=20),
    "SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=50),

    "TOKEN_OBTAIN_SERIALIZER": "rest_framework_simplejwt.serializers.TokenObtainPairSerializer",
    "TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSerializer",
    "TOKEN_VERIFY_SERIALIZER": "rest_framework_simplejwt.serializers.TokenVerifySerializer",
    "TOKEN_BLACKLIST_SERIALIZER": "rest_framework_simplejwt.serializers.TokenBlacklistSerializer",
    "SLIDING_TOKEN_OBTAIN_SERIALIZER": "rest_framework_simplejwt.serializers.TokenObtainSlidingSerializer",
    "SLIDING_TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSlidingSerializer",
}

# CORS_REPLACE_HTTPS_REFERER = True
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGIN_REGEXES = [
    r"^null$",
    r"^http://localhost:[0-9]+$",
    r"^http://127\\.0\\.0\\.1:[0-9]+$",
    r"^https://localhost:[0-9]+$",
    r"^https://127\\.0\\.0\\.1:[0-9]+$",
]
