from django.urls import path
from .views import (list_appointments, show_appointment,
                    list_technicians, show_technician)

urlpatterns = [
    path("appointments/", list_appointments, name="list_appointments"),
    path("appointments/<str:vin>/", list_appointments,
         name="list_appointments_by_vin"),
    path("appointments/detail/<int:pk>/", show_appointment, name="show_appointment"),
    path("technicians/", list_technicians, name="list_technicians"),
    path("technicians/<int:pk>/", show_technician, name="show_technician")


]
