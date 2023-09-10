import { useState } from "react"
import { useCookies } from "react-cookie"

const Modal = ({mode, setShowModal, getData, task}) => {

  const [cookies, setCookie, removeCookie] = useCookies(null)
  const editMode = mode === 'edit' ? true:false

  const [data, setData] = useState({
    user_email : editMode? task.user_email : cookies.Email,
    title : editMode? task.title : "",
    progress : editMode ? task.progress : 50,
    date : editMode? task.date : new Date() 
  })

  const postData = async(e)=> {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/todos',{
        method : "POST",
        headers : { 'Content-Type' : 'application/json'},
        body : JSON.stringify(data)
      })
      console.log(response)
      if(response.status === 200){
        console.log(response)
        setShowModal(false)
        getData()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const editData = async(e)=> {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:8000/todos/${task.id}`,{
        method : "PUT",
        headers : { 'Content-Type' : 'application/json'},
        body : JSON.stringify(data)
      })
      console.log(response)
      if(response.status === 200){
        console.log(response)
        setShowModal(false)
        getData()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handelChange = (e)=>{
    console.log("Changing!",e)
    const {name,value} = e.target

    setData(data => ({
      ...data,
      [name] : value
    }))
  }

    return (
      <div className="overlay">
        <div className="modal">
          <div className="form-title-container">
            <h3>Let's {mode} your task</h3>
            <button onClick= {() => setShowModal(false)} >X</button>
          </div>
          <div>
            <form>
              <input
                required
                maxLength = {30}
                placeholder="Your task goes here"
                name="title"
                value={data.title}
                onChange={handelChange}
              />
              <br/>
              <label htmlFor="range">Drag to select your currnete progress</label>
              <input
                type="range"
                id="range"  
                required
                max={"100"}
                min={"0"}
                name="progress"
                value={data.progress}
                onChange={handelChange}
              />
              <input className={mode} type="submit" onClick = {editMode ? editData : postData}/>
            </form>
          </div>
        </div>
      </div>
    )
  }
  
  export default Modal