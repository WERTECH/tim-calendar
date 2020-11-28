# Tim's Calendar

Client can login
Client can see Tim's daily calendar (available time slot per day and hour)
Client can book consulting appointments with Tim.
Client edit and delete appointment

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
  
  ReservedTime
    appointmentDate
    appointMentTime
