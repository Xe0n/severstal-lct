from wear.models import SensorData, Statistics, Exhauster
from wear.types import SensorDataSerializer

import re
import datetime
import random
import json

import csv

def DateFilterSensorData(startDate, endDate):
    data = SensorData.objects.filter(date__range=(startDate, endDate))
    return SensorDataSerializer(data, many = True).data


def random_breaking():
    return random.choices([1, 3], weights=[0.65, 0.35])[0]


def generate_statistics(start_date, num_entries=500, interval_minutes=5):
    statistics = []
    print()
    exc = Exhauster.objects.first()
    Statistics.objects.all().delete()
    for i in range(num_entries):
        statistic = Statistics()
        a = statistic._meta.fields
        statistic.date = start_date + datetime.timedelta(minutes=interval_minutes * i)
        statistic.exhauster = exc

        for attr in a:
            attr_name = attr.name
            value = getattr(statistic, attr_name)
            if value=='' and attr.max_length == 200:
                print(attr_name)
                data = {
                    "value": random_breaking()
                }
                json_data = json.dumps(data)
                setattr(statistic, attr_name, str(json_data))

        statistics.append(statistic)
    Statistics.objects.bulk_create(statistics)
    print(len(statistics))


def set_field_value_by_verbose_name(model_class, verbose_name, value):
    fields = model_class._meta.get_fields()
    for field in fields:
        if field.verbose_name.lower() == verbose_name.lower():
            setattr(model_class, field.name, value)
            return
    print( '\033[93m Warning: NOT FOUND FIELD: ' + verbose_name + '\033[0m')
#
#
# def parse_string(string):
#     exhauster_match = re.search(r'No(\d+)', string)
#     if exhauster_match:
#         s = string.split('_')
#         item = s[2]
#         exhauster = int(exhauster_match.group(1))
#
#         name_match = get_only_detail_name(item)
#
#         return {'exhauster': exhauster, 'name': name_match}
#     return None



def get_only_detail_name(name):
    name = re.sub(r'No\d+', '', name)
    name = re.sub(r'№\d+', '', name)
    return re.sub(r'ЭКСГ\d+', '', name).replace('  ', ' ').rstrip()


def round_average_date(date1, date2):
    average_date = (date1 + (date2 - date1) / 2)

    minute = (average_date.minute // 5) * 5  # Определяем ближайшую 5-минутную гранулярность
    rounded_date = average_date.replace(minute=minute, second=0, microsecond=0)
    return rounded_date


def parse_subm():
    Statistics.objects.all().delete()
    file_errors_location = '/web/wear/submission_1.csv'

    result = list()

    with open(file_errors_location, encoding='windows-1251', newline='') as csvfile:
        spamreader = csv.reader(csvfile, delimiter=';', quotechar='|')
        for row in spamreader:
            if row[4] != "" and row[1]!="start":
                print(row)
                d1 = datetime.datetime.strptime(row[1], "%Y-%m-%d %H:%M:%S")
                d2 = datetime.datetime.strptime(row[2], "%Y-%m-%d %H:%M:%S")
                result.append({
                    "exhauster":row[3][-1],
                    "detail": get_only_detail_name(row[4]),
                    "date":round_average_date(d1, d2),
                    "status":random_breaking()#row[5]
                })

    for i in result:
        exh = Exhauster.objects.get_or_create(name=i["exhauster"])[0]
        exh.save()
        statistic = Statistics.objects.get_or_create(exhauster_id=exh.id, date=i["date"])[0]
        set_field_value_by_verbose_name(statistic, i["detail"], {"status":i["status"]})
        statistic.save()
    return result




