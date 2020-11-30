export class Appointment {
  id: string;
  constructor(
    public name: string ='',
    public phoneNumber: string ='',
    public email: string ='',
    public company: string ='',
    public brief: string ='',
    public town: string ='',
    public appointmentDate: string = '',
    public appointmentTime: string = ''
  ){}

}
