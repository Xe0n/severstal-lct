from core import queries
from core.utils import extract_queries


class CoreAppQuery(*extract_queries(queries)):
    pass
