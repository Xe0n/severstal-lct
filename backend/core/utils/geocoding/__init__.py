from core.utils.geocoding.backends.yandex import geocode, get_address_suggestions


class Geocoder:

    def geocode(self, lat, lon):
        return geocode(lat, lon)

    def get_address_suggestions(self, address_str):
        return get_address_suggestions(address_str)


geocoder = Geocoder()
