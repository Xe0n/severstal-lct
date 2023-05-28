from enum import Enum


class UserRole(Enum):
    client = 0
    admin = 1
    bot = 2

    @classmethod
    def choices(cls):
        return [(tag.value, tag.name) for tag in cls]
