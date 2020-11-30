# Tim's Calendar

Client can login
Client can see Tim's daily calendar (available time slot per day and hour)
Client can book consulting appointments with Tim.
Client edit and delete appointment

### View Demo [here](https://tim-calendar-fbe2b.web.app) 
https://tim-calendar-fbe2b.web.app

### Test login
email: test@gmail.com
password: testpass@

### Installation
Clone or download the repo
Run `npm intall` to install denpendencies

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
