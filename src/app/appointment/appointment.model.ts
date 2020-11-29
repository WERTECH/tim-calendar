export class Appointment {
  id: string;
  constructor(
    public name: string ='',
    public phoneNumber: string ='',
    public email: string ='',
    public company: string ='',
    public town: string ='',
    public appointmentDate: string = '',
    public appointMentTime: string = ''
  ){}

}
