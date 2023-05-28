from django.contrib.auth import get_user_model

User = get_user_model()


def create_user(phone_number, email):
    password = User.objects.make_random_password()
    user = User.objects.create_user(
        email=email, phone=phone_number, password=password
    )
    return user
