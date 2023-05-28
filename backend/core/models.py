from django.contrib.gis.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
from django.utils.translation import ugettext_lazy as _

from core.enums import UserRole
from core.user_manager import UserManager


class Image(models.Model):
    name = models.JSONField(blank=True, null=True, verbose_name=_('name'))
    url = models.FileField(upload_to='images')

    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('created_at'))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_('updated_at'))

    def __str__(self):
        return f"{type(self).__name__}: {self.name}"


class Address(models.Model):

    flat = models.CharField(max_length=32, blank=True, null=True, verbose_name=_('flat'))
    house = models.CharField(max_length=32, blank=True, null=True, verbose_name=_('house'))
    block = models.CharField(max_length=32, verbose_name=_('block'), blank=True, null=True)
    street = models.CharField(max_length=256, verbose_name=_('street'))
    district = models.CharField(max_length=256, blank=True, null=True, verbose_name=_('district'))
    city = models.CharField(max_length=256, blank=True, null=True, verbose_name=_('city'))
    full_address = models.CharField(max_length=500, null=True, blank=True, verbose_name=_('full_address'))
    location = models.PointField(null=True, blank=False, verbose_name=_('location'))

    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('created_at'))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_('updated_at'))

    def __str__(self):
        return f"{type(self).__name__}: {self.full_address}"


class User(AbstractUser):

    email = models.EmailField(unique=True, blank=False)
    phone = PhoneNumberField(unique=False, blank=False)

    first_name = models.CharField(max_length=254, blank=True, verbose_name=_('first_name'))
    second_name = models.CharField(max_length=254, blank=True, verbose_name=_('second_name'))
    third_name = models.CharField(max_length=254, blank=True, verbose_name=_('third_name'))

    role = models.PositiveSmallIntegerField(choices=UserRole.choices(), default=UserRole.client.value, verbose_name=_('role'))

    avatar = models.ForeignKey(Image, on_delete=models.SET_NULL, null=True, verbose_name=_('avatar'))
    address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True, blank=True, verbose_name=_('address'))

    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('created_at'))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_('updated_at'))

    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return f"{type(self).__name__}: {self.email} {self.second_name} {self.first_name} {self.third_name} {self.phone}"


class Message(models.Model):
    title = models.CharField(max_length=256, blank=True, verbose_name=_('title'))
    text = models.CharField(max_length=1000, blank=True, verbose_name=_('text'))

    author = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name=_('author'))

    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('created_at'))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_('updated_at'))

    def __str__(self):
        return f"{type(self).__name__}: {self.title} {self.author}"


class SMSVerification(models.Model):
    security_code = models.CharField(verbose_name=_('security code'), max_length=120)
    phone_number = PhoneNumberField(verbose_name=_('phone number'))
    is_verified = models.BooleanField(verbose_name=_('security code verified'), default=False)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('created at'))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_('updated at'))

    def __str__(self):
        return f"{type(self).__name__}: {self.phone_number} {self.security_code} {self.is_verified}"
