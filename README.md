\# CareConnect – Healthcare Appointment Management Platform



\## Project Description



CareConnect is a full-stack Healthcare Appointment Management Platform developed to simplify doctor appointment booking and management.



The application allows patients to register, log in, view doctors, book appointments, manage their appointments, update their profiles, and change passwords.



It also provides an Admin Module to manage doctors, view registered users, and manage patient appointments.



\## Technologies Used



\### Frontend

\- React.js

\- JavaScript

\- HTML5

\- CSS3

\- Bootstrap

\- Axios

\- React Router DOM

\- Redux Toolkit



\### Backend

\- Java

\- Spring Boot

\- Spring Data JPA

\- Spring Security

\- Thymeleaf

\- Maven



\### Database

\- MySQL



\## Page Overview



\### Patient Pages

1\. Home Page

2\. Register Page

3\. Login Page

4\. Doctors List Page

5\. Doctor Details Page

6\. Book Appointment Page

7\. My Appointments Page

8\. My Profile Page

9\. Change Password Page



\### Admin Pages

1\. Admin Login Page

2\. Admin Dashboard

3\. Doctor Management

4\. Appointment Management

5\. Registered Users

6\. User Appointment History



\## Main Features



\### Patient Module

\- Patient Registration

\- Patient Login

\- View Doctor List and Details

\- Book Doctor Appointments

\- View Upcoming and Past Appointments

\- Cancel Appointments

\- View and Update Profile

\- Change Password

\- Protected Patient Pages



\### Admin Module

\- Admin Login

\- Admin Dashboard

\- View Today's Appointments

\- Filter Appointments by Date

\- Add, Update and Delete Doctors

\- View Registered Users

\- View User Appointment History



\### Appointment Management

\- Select a Doctor

\- Choose Appointment Date

\- Book Appointments

\- View Appointment Details

\- Cancel Appointments

\- Manage Upcoming and Past Appointments



\## User Details



\### Sample Patient Account



| Field | Details |

|---|---|

| Name | Arun Kumar |

| Email | arun.kumar11@gmail.com |

| Password | Use the locally configured test password |



\### Admin Account



| Field | Details |

|---|---|

| Admin Name | CareConnect Admin |

| Email | admin@careconnect.com |

| Password | Use the locally configured admin password |

| Admin Login URL | http://localhost:8080/admin/login |



\*\*Note:\*\* Do not publish actual passwords or database credentials in a public repository.



\## Application URLs



\### Frontend



| Page | URL |

|---|---|

| Home | http://localhost:3000/ |

| Register | http://localhost:3000/register |

| Login | http://localhost:3000/login |

| Doctors | http://localhost:3000/doctors |

| My Appointments | http://localhost:3000/my-appointments |

| Book Appointment | http://localhost:3000/appointments/book |

| My Profile | http://localhost:3000/profile |

| Change Password | http://localhost:3000/change-password |



\### Admin



| Page | URL |

|---|---|

| Admin Login | http://localhost:8080/admin/login |



\## Database Configuration



\*\*Database Name:\*\* `careconnect\_db`



Configure database credentials using environment variables:



\- `DB\_USERNAME`

\- `DB\_PASSWORD`



Database configuration is maintained in `application.properties`.



\## How to Run the Project



\### Backend Setup



Open CMD and navigate to the backend folder:



```cmd

cd /d D:\\Eclipse-SpringBoot\\CareConnect\\careconnect-backend

```



Run the Spring Boot application:



```cmd

"C:\\Program Files\\Apache\\Maven\\apache-maven-3.10.0\\bin\\mvn.cmd" spring-boot:run

```



\*\*Backend URL:\*\* http://localhost:8080



\### Frontend Setup



Open another CMD window:



```cmd

cd /d D:\\Eclipse-SpringBoot\\CareConnect\\careconnect-frontend

```



Install dependencies:



```cmd

npm.cmd install

```



Start the React application:



```cmd

npm.cmd start

```



\*\*Frontend URL:\*\* http://localhost:3000



\## Non-Functional Requirements



\- User-friendly interface

\- Responsive design

\- Secure authentication

\- Efficient appointment management

\- Reliable database operations

\- Maintainable application structure



\## Future Enhancements



\- Monthly Most Viewed Doctors Report

\- Appointment Reminder Notifications

\- Online Payment Integration

\- Improved Reporting and Analytics



\---



\## Author



\*\*NAHAZ NAZAR\*\*

