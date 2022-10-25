from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import AutomobileVO, SalesPerson, Customer, SalesRecord

# Create your views here.


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "import_href"]


class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name",
        "employee_number",
        "id",
        ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "address",
        "phone_number",
        "id",
        ]


class SalesRecordEncoder(ModelEncoder):
    model = SalesRecord
    properties = [
        "automobile",
        "sales_person",
        "customer",
        "price",
        "id"
    ]
    encoders = {
        "sales_person": SalesPersonEncoder(),
        "customer": CustomerEncoder(),
        "automobile": AutomobileVOEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_sales_people(request):
    if request.method == "GET":
        sales_people = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_people": sales_people},
            encoder=SalesPersonEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            sales_person = SalesPerson.objects.create(**content)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except:
            return JsonResponse(
                {"message": "Could not create sales person"},
                status=400,
            )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_sales_person(request, pk):
    if request.method == "GET":
        try:
            sales_person = SalesPerson.objects.get(id=pk)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Sales person does not exist"},
                status=404,
            )
    elif request.method == "DELETE":
        try:
            sales_person = SalesPerson.objects.get(id=pk)
            sales_person.delete()
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Sales person does not exist"}
            )
    else:
        try:
            content = json.loads(request.body)
            SalesPerson.objects.filter(id=pk).update(**content)
            sales_person = SalesPerson.objects.get(id=pk)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Sales person does not exist"},
                status=404,
            )


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except:
            return JsonResponse(
                {"message": "Could not create customer"},
                status=400,
            )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_customer(request, pk):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=pk)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status=404,
            )
    elif request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=pk)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"}
            )
    else:
        try:
            content = json.loads(request.body)
            Customer.objects.filter(id=pk).update(**content)
            customer = Customer.objects.get(id=pk)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status=404,
            )


@require_http_methods(["GET", "POST"])
def api_list_sales_records(request, employee_id=None):
    if request.method == "GET":
        if employee_id == None:
            sales_records = SalesRecord.objects.all()
        else:
            sales_records = SalesRecord.objects.filter(sales_person=employee_id)
        return JsonResponse(
            {"sales_records": sales_records},
            encoder=SalesRecordEncoder
        )
    else:
        try:
            content = json.loads(request.body)

            auto_vin = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=auto_vin)
            content["automobile"] = automobile
            print("automobile here")

            employee_id = content["sales_person"]
            sales_person = SalesPerson.objects.get(id=employee_id)
            content["sales_person"] = sales_person
            print("sales_person here")

            customer_id = content["customer"]
            customer = Customer.objects.get(id=customer_id)
            content["customer"] = customer
            print("customer here")

            sales_record = SalesRecord.objects.create(**content)
            print(sales_record)
            automobile.has_sold = True
            automobile.save()
            return JsonResponse(
                sales_record,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except:
            return JsonResponse(
                {"message": "Could not create sales record"},
                status=400,
            )


@require_http_methods(["DELETE", "GET"])
def api_show_sales_record(request, pk):
    if request.method == "GET":
        try:
            sales_record = SalesRecord.objects.get(id=pk)
            return JsonResponse(
                sales_record,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except SalesRecord.DoesNotExist:
            return JsonResponse(
                {"message": "Sales record does not exist"},
                status=404,
            )
    else:
        try:
            sales_record = SalesRecord.objects.get(id=pk)
            sales_record.delete()
            return JsonResponse(
                sales_record,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except SalesRecord.DoesNotExist:
            return JsonResponse(
                {"message": "Sales record does not exist"}
            )


@require_http_methods(["GET"])
def api_list_automobiles(request):
    if request.method == "GET":
        automobiles = AutomobileVO.objects.filter(has_sold=False)
        return JsonResponse(
            {"automobiles": automobiles},
            encoder=AutomobileVOEncoder,
        )
