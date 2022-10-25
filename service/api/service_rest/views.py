from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .encoders import (AppointmentEncoder, TechnicianEncoder)
from .models import AutomobileVO, Technician, Appointment


@require_http_methods(["GET", "POST"])
def list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.filter(finished=False)
        # get all the appointment objects
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder
        )
    else:  # POST
        content = json.loads(request.body)
        try:
            tech_id = content["technician_id"]
            tech = Technician.objects.get(id=tech_id)
            content["technician"] = tech

        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician id"}
            )

        if AutomobileVO.objects.filter(vin=content["vin"]).exists():
            content["vip"] = True
        else:
            content["vip"] = False

        appointment = Appointment.objects.create(**content)

        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def show_appointment(request, pk):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does note exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            appointment = Appointment.objects.get(id=pk)
            appointment.delete()
            return JsonResponse(
                {"message": "Appointment deleted"}
            )
            # return JsonResponse(
            #     appointment,
            #     encoder=AppointmentEncoder,
            #     safe=False,
            # )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does note exist"})
            response.status_code = 404
            return response
    else:  # PUT
        content = json.loads(request.body)
        Appointment.objects.filter(id=pk).update(**content)
        appointment = Appointment.objects.get(id=pk)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False
        )


@require_http_methods(["GET", "POST"])
def list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        # get all the appointment objects
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder
        )
    else:  # POST
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)

        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def show_technician(request, pk):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=pk)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Technician does note exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            technician = Technician.objects.get(id=pk)
            technician.delete()
            return JsonResponse(
                {"message": "Technician deleted"}
            )
            # return JsonResponse(
            #     appointment,
            #     encoder=AppointmentEncoder,
            #     safe=False,
            # )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Technician does note exist"})
            response.status_code = 404
            return response
    else:  # PUT
        content = json.loads(request.body)
        Technician.objects.filter(id=pk).update(**content)
        technician = Technician.objects.get(id=pk)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False
        )


@require_http_methods(["GET"])
def show_service_history(request, pk):
    try:
        appointments = Appointment.objects.filter(vin=pk)
        return JsonResponse(
            appointments,
            encoder=AppointmentEncoder,
            safe=False
        )
    except Appointment.DoesNotExist:
        response = JsonResponse({"message": "Appointment does note exist"})
        response.status_code = 404
        return response
