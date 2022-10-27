from django.db import models


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length= 200, unique=True)
    has_sold = models.BooleanField(default=False)


class SalesPerson(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.PositiveSmallIntegerField()

    def __str__(self):
        return self.name


class Customer(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=20)

    def __str__(self):
        return self.name


class SalesRecord(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name = "sales_record",
        on_delete = models.CASCADE,
    )

    sales_person = models.ForeignKey(
        SalesPerson,
        related_name = "sales_record",
        on_delete = models.CASCADE,
    )

    customer = models.ForeignKey(
        Customer,
        related_name = "sales_record",
        on_delete = models.CASCADE,
    )

    price = models.PositiveIntegerField()
