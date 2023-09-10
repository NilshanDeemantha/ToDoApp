import ListHeader from "./components/ListHeader"
import ListItem from "./components/ListItem"
import Auth from "./components/Auth"
import { useEffect, useState} from 'react'
import { useCookies } from 'react-cookie'

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const userEmail = cookies.Email
  const [tasks, setTaska] = useState(null)
  const authToken = cookies.AuthToken
  // Get  from database
  const getData = async () =>{
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`)
      const json = await response.json()
      setTaska(json)

    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if(authToken){
      getData()
    }}
  ,[])
  console.log(tasks)

  // sort dates

  const srotedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="app">
      { !authToken && <Auth/>} 
      { authToken && 
      <>
        <ListHeader listName = {" Holiday Tick List"} getData={getData} />
        <p className="user-email" >Welcome back {userEmail}</p>
        {srotedTasks?.map( (task) => <ListItem key={task.id} task={task} getData={getData} />)}
      </>}
    </div>
  )
}

export default App
