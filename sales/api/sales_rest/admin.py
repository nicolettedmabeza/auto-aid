from django.contrib import admin
from sales_rest.models import AutomobileVO, SalesPerson, Customer, SalesRecord

# Register your models here.


admin.site.register(SalesPerson)
admin.site.register(Customer)
admin.site.register(SalesRecord)
admin.site.register(AutomobileVO)
