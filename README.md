# Tim's Calendar

Client can login
Client can see Tim's daily calendar (available time slot per day and hour)
Client can book consulting appointments with Tim.
Client edit and delete appointment
Additon: Tim can view list of appointment schedules

### View Demo [here](https://tim-calendar-fbe2b.web.app) 
https://tim-calendar-fbe2b.web.app

### Test login
email: test@gmail.com
password: testpass@
email: tim@gmail.com
password: timpass#

### Installation
Clone or download the repo
Run `npm install` to install denpendencies

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.


### Components
  Shared
    AppContainer

  User

  Apointment
    AppointmentDetail
    AppointmentList

### Models
  User
    name
    email
    phoneNumber
    company
    town
    role

  Apointment
    user
    appointmentDate
    appointMentTime
    brief


## boblittle's review 
1. Hosted project might be different from the current one on github because the css files fails to load from localhost
2. Nice UI/UX choice , nice and simple material design implementation 
3. No logout option when user logins for the first time, had to force reload the page again 
4. Menu links are quite misleading, eg. login suppose to render a login page, however, remains on same screen 
but shows the form for registration 
5. Nice User experience on main dashboard page implemented by the use of calendar icon, which has icons, and the forms' simplicity 
6. Show required field field when booking 

7. Name and phoneNumber field render in active if booking a second appointment 
8. Didn't see a way of editing and deleting appointment 

## security 
9. Security best practices implemented. Saw the implementation of AuthGuards or 2 routes 

## Code techniques 
10. Good naming conventions and techniques. Methods and names matches their actions 
11. Wrote tests, good practices
12. Application and folder structure matches angular specification,
13. Implemented code and component reusability techniques, good practice 
14. good commenting throughout codebase, good practice 

## Overall feedback 
Applicant didn't complete the overall solution, in respect to editing and deleting appointment. 
However, Applicant used and observed good coding techniques and best practices. Applicant made use of other technologies 
to implemented his solution, which is very good. Although, Applicant didn't finish the work in general, he has the overall 
signs of a good developer from his code base and practices. Applicant is good and can occupy the required position. 

