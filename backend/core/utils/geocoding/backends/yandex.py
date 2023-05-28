import requests
from django.contrib.gis.geos import Point

from core.utils.geocoding.models.address_suggestion_result import AddressSuggestionResult
from app import settings

from core.models import Address

_base_url = f'https://geocode-maps.yandex.ru/1.x/?apikey={settings.YANDEX_GEOCODING["API_KEY"]}&'

DEFAULT_ADDRESS_SUGGESTION_COUNT = 5


def _get_address_data(feature_member):

    address_details = feature_member['GeoObject']['metaDataProperty']['GeocoderMetaData']['AddressDetails'][
        'Country']

    try:
        full_address = address_details['AddressLine']
    except KeyError as e:
        full_address = None

    try:
        locality = address_details['AdministrativeArea']['SubAdministrativeArea']['Locality']
    except KeyError as e:
        locality = {}

    try:
        city = locality['LocalityName']
    except KeyError:
        city = 'Unknown'

    try:
        street = locality['Thoroughfare']['ThoroughfareName']
    except KeyError as e:
        street = None

    try:
        house = locality['Thoroughfare']['Premise']['PremiseNumber']
    except KeyError as e:
        house = None

    try:
        coord_str = feature_member['GeoObject']['Point']['pos']
        lat_lon = [float(coord) for coord in coord_str.split()]
    except KeyError as e:
        lat_lon = None
    except ValueError as e:
        lat_lon = None

    return {
        "house": house,
        "street": street,
        "city": city,
        "full_address": full_address,
        "location": Point(lat_lon)
    }


def _get_or_create_address(feature_member, lat_lon=None):
    try:
        address_data = _get_address_data(feature_member)
        address, _ = Address.objects.get_or_create(**address_data, defaults={"location": Point(lat_lon)})
        return address

    except Exception as e:
        return None


def _is_valid_address_suggestion(address_suggestion):
    return 'full_address' in address_suggestion and 'location' in address_suggestion


def geocode(lon, lat, count=1, kind='house'):
    coords = f'{lon}, {lat}'

    url = f'{_base_url}geocode={coords}&lang=ru&format=json&results={count}&kind={kind}'
    try:
        response = requests.get(url)
        feature_member = response.json()['response']['GeoObjectCollection']['featureMember'][0]
        return _get_or_create_address(feature_member, [lat, lon])

    except Exception as ex:
        raise ex


def get_address_suggestions(address_str, count=DEFAULT_ADDRESS_SUGGESTION_COUNT):
    url = f'{_base_url}geocode={address_str}&lang=ru&format=json&results={count}'

    try:
        response = requests.get(url)
        feature_members = response.json()['response']['GeoObjectCollection']['featureMember']
        addresses_data = [_get_address_data(feature_member) for feature_member in feature_members]

        valid_address_suggestions = [address_data for address_data in addresses_data
                                     if _is_valid_address_suggestion(address_data)]

        address_suggestions = [AddressSuggestionResult(address_data['full_address'], address_data['location'])
                               for address_data in valid_address_suggestions]

        return address_suggestions

    except Exception as ex:
        raise ex
