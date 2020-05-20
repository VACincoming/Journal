import axios from 'axios'

const url = `${process.env.REACT_APP_URL_API}`
export default class JournalService{
  header = {
    "Authorization": ''
  }

  wrapperGetRequest(url:string){
    if(localStorage.getItem("Token")){
      this.header.Authorization = localStorage.getItem("Token")!.toString();
    }
      return axios({
        method: 'get',
        url,
        headers: this.header
      }).catch((err:any) => {
        throw new Error(err.response.data.message)
      })
  }
  getSchedule(weekType:string, currentLanguage:string){
    return this.wrapperGetRequest(`${url}schedule?week_type=${weekType}&lang=${currentLanguage}`)
      .then((res:any) => res.data.data)
      .catch((err:any) => console.log(err))
  }
  getScheduleTime(){
    return this.wrapperGetRequest(`${url}schedule/time`)
      .then((res:any) => res.data.data)
  }
  getUser(currentLanguage:string){
    return this.wrapperGetRequest(`${url}users/current?lang=${currentLanguage}`)
    .then((user:any) => user.data.data)
    .catch((err) => {
      if(err.toString().includes('401')){
        localStorage.removeItem("Token")
      }
    })
  }
  getAllUsers(currentLanguage:string){
    this.header.Authorization = localStorage.getItem("Token")!.toString();
    return axios({
      method: 'get',
      url: `${url}users?lang=${currentLanguage}`,
      headers: this.header
    }).then((users:any) => {return users.data.data})
      .catch((err) => {return err})
  }

  signIn(username:string, password:string){
    const data = {username, password}
    return axios({
      method: 'post',
      url: `${url}login`,
      data: data
    }).then((res:any) => {
      const data = res.data.data;
      localStorage.setItem("Token", data.token)
      this.header.Authorization = data.token
      return data
    }).catch((err:any) => {
        throw new Error(err.response.data.message)
    })
  }
  signUp(data:any){
    return axios({
      method: 'post',
      url: `${url}registration`,
      headers: this.header,
      data: data
    }).catch((err:any) => {
      throw new Error(err.response.data.error)
    })
  }
  exportToExcel(dateFrom:any, dateTo:any, currentLanguage:string){
    const data = {dateFrom, dateTo}
    return axios({
      method: 'post',
      url: `${url}registry/report?lang=${currentLanguage}`,
      headers: this.header,
      responseType: 'blob',
      data
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${dateFrom} - ${dateTo}.xls`); //or any other extension
      document.body.appendChild(link);
      link.click();
    }).catch((err:any) => {
      console.log(err)
    })
  }
  changeRole(id:number, role:string, email:string, username:string){
    this.header.Authorization = localStorage.getItem("Token")!.toString();
    if(role === 'STUDENT') role="MONITOR"
    else if(role === 'MONITOR') role="STUDENT"
    return axios({
      method: 'post',
      url: `${url}users/${id}`,
      headers: this.header,
      data: {email, role, username},
    })
  }
  getRegistry(date:any, currentLanguage:string){
    this.header.Authorization = localStorage.getItem("Token")!.toString();
    return axios({
      method: 'get',
      url: `${url}registry?date=${date}&lang=${currentLanguage}`,
      headers: this.header
    }).then((res:any) => res.data.data)
  }
  setRegistry(data:any){
    this.header.Authorization = localStorage.getItem("Token")!.toString();
    return axios({
      method: 'post',
      url: `${url}registry`,
      headers: this.header,
      data: data
    }) 
  }
  getUserAbsent(dateFrom:any, dateTo:any, userId:any, currentLanguage:string){
    this.header.Authorization = localStorage.getItem("Token")!.toString();
    return axios({
      method: 'post',
      url: `${url}registry/user?lang=${currentLanguage}`,
      data: {
        "from": dateFrom,
        "to": dateTo,
        "userId": userId, 
      }
    })
  }
  getSubjects(currentLanguage: string){
    this.header.Authorization = localStorage.getItem("Token")!.toString();
    return axios({
      method: 'get',
      url: `${url}subjects?${currentLanguage}`,
      headers: this.header
    }).then((res:any) => res.data.data)
  }
}
