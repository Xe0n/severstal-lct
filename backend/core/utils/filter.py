from functools import reduce

from django.db.models import Q
import django_filters


def create_model_filter(cls):
    class Filter(django_filters.FilterSet):
        if cls._meta.search_fields:
            search = django_filters.CharFilter(method='filter_search')

            def filter_search(self, queryset, name, value):
                Qs = [{f'{field}__icontains': value} for field in cls._meta.search_fields]
                Q_all = reduce(lambda q_all, q: q_all | Q(**q), Qs, Q())
                return queryset.filter(Q_all)

            if cls.order_fields:
                order_by = django_filters.OrderingFilter(fields=cls.order_fields)

    return Filter
