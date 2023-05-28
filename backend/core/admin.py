from django.contrib import admin
from django.contrib.admin import ModelAdmin
from django.contrib.auth.admin import UserAdmin
from django.utils.html import format_html

from app import settings
from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import User, SMSVerification, Image, Address


class CustomUserAdmin(UserAdmin):

    fieldsets = ((None, {'fields': ('email', 'password', 'phone')}),
                 (None, {'fields': ('is_active', 'is_staff', 'is_superuser', 'role')}))
    add_fieldsets = [(None, {'fields': ('email', 'password1', 'password2', 'is_staff', 'is_superuser', 'is_active', 'role')})]
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = ['email', 'phone', 'date_joined']
    ordering = ['date_joined']
    exclude = ('username',)


class CustomImageAdmin(ModelAdmin):
    def image_tag(self, image):
        return format_html('<img src="{}{}"/>'.format(settings.MEDIA_URL, image.url))

    image_tag.short_description = 'Preview'
    readonly_fields = ['image_tag']


admin.site.register(User, CustomUserAdmin)
admin.site.register(Image, CustomImageAdmin)
admin.site.register(SMSVerification)
admin.site.register(Address)
