from django.urls import path
from .views import (list_appointments, show_appointment,
                    list_technicians, show_technician, show_service_history)

urlpatterns = [
    path("appointments/", list_appointments, name="list_appointments"),
    path("appointments/<int:pk>/", show_appointment, name="show_appointment"),
    path("appointments/<str:pk>/", show_service_history,
         name="show_service_history"),
    path("technicians/", list_technicians, name="list_technicians"),
    path("technicians/<int:pk>/", show_technician, name="show_technician")


]
