export interface IUsers{
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  role: string
}

export interface IUser{
  firstName: string,
  lastName: string,
  email: string,
  role: string
}

export interface ISubject{
  index: number,
  subject: string
}
export interface ISchedule{
  dayOfWeek: string,
  subjects: ISubject
}

export interface IScheduleTime{
  id: number,
  beginning: string,
  end: string
}

export interface IRegistry{
  date: string,
  subjects: ISubject
}

export interface ISubjects{
  id: number,
  name: string
}