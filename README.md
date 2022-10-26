# CarCar

Team:

* Person 1 (Nicolette) - Automobile services
* Person 2 (Cindy) - Auto Sales

## Design

CarCar is an application for managing aspects of an automobile dealership, specifically for its inventory, service center, and sales.

The application was designed with three microservices: the inventory, automobile services, and auto sales. Below is a diagram that further details the relationships between these services with the frontend. The backend of the application was developed with a Django framework and Python. The frontend of the application was developed with React.

<img src="./document/CarCarDesign.png" />

Within the repository, you'll find ghi, inventory, sales, and service directories.
- ghi contains the frontend React files.
-inventory contains the backend api for managing the models, views, and urls of manufacturers, vehicle models, and automobiles.
- sales contains the backend api for managing the models, views, and urls of employees, customers, sales records, and employee sales history. It also contains the poller to pull automobile data from the inventory api.
- service contains the backend api for managing the models, views, and urls of appointments and technicians. It also contains the poller to pull automobile data from the inventory api.

## Getting Started

Please note the following directions to start the application:
- Upon opening the repository, please click on the clone button and select "Clone with HTTPS". Open a terminal and navigate to the directory this application will be stored. Then execute the comand `git clone` and paste the copied repository link. Then enter `code .` to open the application in Visual Studio Code.
- This application will require the use of Docker and executing the following commands:

        docker volume create beta-data
        docker-compose build
        docker-compose up

- When you run `docker-compose up` and if you're on macOS, you will see a warning about an environment variable named OS being missing. You can safely ignore this.
- To view the application, go to http://localhost:3000.


## Service microservice

On the services microservice you can:

- Create a technician by providing a name and employee number
- Create an appointment by providing a VIN number, owner name, date and time of appointment, selecting a technician, and the reason for the service appointment
- View a list of appointments that have not been finished and view the VIP status of each vehicle
- View the service appointment history (both finished and unfinished) of a specific vehicle by searching the VIN number

The Services Microservices is in charge of service appointments and technicians. With appointments you are able to create an appointment, view a list of active appointments, and view a vehicle’s appointment history (both finished and unfinished appointments) by searching the VIN number. You are also able to create a technician within the services microservice, which then can be utilized when creating an appointment to select a specific technician.

The services microservice poller gets data from the inventory microservice - more specifically from its automobile API. The data we are extracting is the VIN information from the inventory. We can use this information to crosscheck if a VIN entered into an appointment form has previously been in the Automobile inventory. If so, this notifies the concierge to give the customer “VIP” treatment.

The Service Microservice Endpoints include:

| Action | Method | URL |
| --- | :---: | --- |
|List appointments | GET | `http://localhost:8080/api/appointments/`
|Create appointment | POST | `http://localhost:8080/api/appointments/`
|Get a specific appointment | GET | `http://localhost:8080/api/appointments/<int:pk>/`
|Delete a specific appointment | DELETE | `http://localhost:8080/api/appointments/<int:pk>/`
|Get a specific service history | GET | `http://localhost:8080/api/appointments/<str:pk>/`
|List technicians | GET | `http://localhost:8080/api/technicians/`
|Create technician | POST | `http://localhost:8080/api/technicians/`
|Get a specific technician * | GET | `http://localhost:8080/api/technicians/<int:pk>/`
|Delete a specific technician * | DELETE | `http://localhost:8080/api/technicians/<int:pk>/`

// Note: endpoints with an asterisk(*) were created on the backend, but not utilized on the frontend. These can be used for further development of the application.

## Sales microservice

The Auto Sales Microservice was developed with RESTful methods to provide frontend capabilities of managing employees, customers, sales records, and employee sales history of a automobile dealership. Additionally, the sales microservice only allows sales of automobiles within the inventory that have not yet been sold.

The sales microservice Endpoints include:

| Action | Method | URL |
| --- | :---: | --- |
|List sales employees	| GET |	`http://localhost:8090/api/salespeople/`
|Create sales employee	|POST | `http://localhost:8090/api/salespeople/`
|Get a specific employee *| GET|`http://localhost:8090/api/salespeople/<int:pk>/`
| Delete a specific employee *| DELETE | `http://localhost:8090/api/salespeople/<int:pk>/`
| Get a specific employee sales history | GET | `http://localhost:8090/api/salespeople/<int:employee_id>/salesrecords/`
| List customers | GET | `http://localhost:8090/api/customers/`
| Create customer | POST | `http://localhost:8090/api/customers/`
| Get a specific customer *| GET | `http://localhost:8090/api/customers/<int:pk>/`
| Delete a specific customer *| DELETE | `http://localhost:8090/api/customers/<int:pk>/`
| List sales records | GET | `http://localhost:8090/api/salesrecords/`
| Create sales record | POST | `http://localhost:8090/api/salesrecords/`
| Get a specific sales record *| GET | `http://localhost:8090/api/salesrecords/<int:pk>/`
| Delete a specific sales record *| DELETE | `http://localhost:8090/api/salesrecords/<int:pk>/`
| List unsold automobiles | GET | `http://localhost:8090/api/automobiles/`

// Note: endpoints with an asterisk(*) were created on the backend, but not utilized on the frontend. These can be used for further development of the application.

The models within the sales microservice manage:
- creating a sales employee with a name and employee number
- creating a customer with a name, address, and phone number
- creating and viewing a sales record with references to a sales person, automobile, and customer as well as a price.
- view sales history of a specific employee

The sales microservice poller gets data from the inventory microservice by way of the automobile API endpoints. The poller provides the VIN property, which is used to determine what automobiles are available to be sold.
