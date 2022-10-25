from django.urls import path

from .views import (
    api_list_sales_people,
    api_show_sales_person,
    api_list_customers,
    api_show_customer,
    api_list_sales_records,
    api_show_sales_record,
    api_list_automobiles,
)

urlpatterns = [
    path("salespeople/", api_list_sales_people, name="api_sales_people"),
    path("salespeople/<int:pk>/", api_show_sales_person, name="api_show_sales_person"),
    path("salespeople/<int:employee_id>/salesrecords/", api_list_sales_records, name="api_sales_person_sales_records"),
    path("customers/", api_list_customers, name="api_customers"),
    path("customers/<int:pk>/", api_show_customer, name="api_show_customer"),
    path("salesrecords/", api_list_sales_records, name="api_sales_records"),
    path("salesrecords/<int:pk>/", api_show_sales_record, name="api_show_sales_record"),
    path("automobiles/", api_list_automobiles, name="api_automobiles"),
]
