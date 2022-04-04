"""
Django settings for languageacademy project.

Generated by 'django-admin startproject' using Django 3.2.8.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from distutils.log import debug
from pathlib import Path
import os
from dotenv import load_dotenv
load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = str(os.getenv('SECRET_KEY'))

SESSION_COOKIE_SECURE = bool(os.getenv('SESSION_COOKIE_SECURE'))
CSRF_COOKIE_SECURE = bool(os.getenv('CSRF_COOKIE_SECURE'))
SECURE_HSTS_SECONDS = int(os.getenv('SECURE_HSTS_SECONDS'))
SECURE_HSTS_INCLUDE_SUBDOMAINS = bool(os.getenv('SECURE_HSTS_INCLUDE_SUBDOMAINS'))
SECURE_HSTS_PRELOAD = bool(os.getenv('SECURE_HSTS_PRELOAD'))
SECURE_SSL_REDIRECT = bool(os.getenv('SECURE_SSL_REDIRECT'))


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = bool(os.getenv('DEBUG'))

if not DEBUG:
    ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS") #.split(' ')

DEFAULT_DOMAIN = str(os.getenv('DEFAULT_DOMAIN'))

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'whitenoise.runserver_nostatic', #new
    'django.contrib.staticfiles',

    #custom appps
    'profiles',
    'lessons',
    'schedules',
    'accounts',
    'backgrounds.apps.BackgroundsConfig',
    'multiselectfield',
    'import_export',
    'django_crontab',
    'dbbackup' , # django-dbbackup
]

DBBACKUP_STORAGE = 'django.core.files.storage.FileSystemStorage'
DBBACKUP_STORAGE_OPTIONS = { 'location' : BASE_DIR / 'backup'}

CRONJOBS = {
    ('0 4 * * *', 'languageacademy.cron.my_backup')    #backup at 4am every day
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    "whitenoise.middleware.WhiteNoiseMiddleware", #new
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'languageacademy.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'languageacademy.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'OPTIONS': {
            'sql_mode': 'STRICT_TRANS_TABLES',
        },
        'HOST': 'localhost',
        'PORT': '2083',
        'NAME': 'amrqcieq_djlanguageacademy',
        'USER': 'amrqcieq_djlanguageacademyuser',
        'PASSWORD': 'YD60($p=vId1'
    },    
}



# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

AUTH_USER_MODEL = 'accounts.User'

# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/Bogota'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# AUTH
LOGIN_URL = '/login/'


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

# STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR / 'static'
]
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage' # new

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# E-mail
if DEBUG:
    EMAIL_BACKEND = "django.core.mail.backends.filebased.EmailBackend"
    EMAIL_FILE_PATH = BASE_DIR / "sent_emails"
else:
    # Set up real email production
    EMAIL_BACKEND = str(os.getenv('EMAIL_BACKEND'))
    EMAIL_HOST = str(os.getenv('EMAIL_HOST'))  
    EMAIL_USE_SSL = bool(os.getenv('EMAIL_USE_SSL'))
    EMAIL_PORT = int(os.getenv('EMAIL_PORT')) 
    EMAIL_HOST_USER = str(os.getenv('EMAIL_HOST_USER')) 
    EMAIL_HOST_PASSWORD = str(os.getenv('EMAIL_HOST_PASSWORD'))
