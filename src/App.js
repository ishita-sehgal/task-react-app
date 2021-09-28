import Header from './components/Header.js'
import Tasks from './components/Tasks.js'
import Footer from './components/Footer.js'
import About from './components/About.js'
import { BrowserRouter as Router,Route } from 'react-router-dom'
import {useState,useEffect} from 'react'
import AddTask from './components/AddTask.js'

function App() {
  //state data using hook useState
  const [tasks,setTasks]= useState([]);
    //showAddTask 
    const [showAddTask,setShowAddTask]=useState(false);

    useEffect(()=>{
 const getTasks= async ()=>{
const getServerData=await fetchTasks();
      setTasks(getServerData);
 }
     getTasks();
    },[])
//Fetch tasks
const fetchTasks=async ()=>{
  const res=await fetch('http://localhost:5000/tasks');
  const data = await res.json();
  console.log(data)
return data;

}
//Fetch a single task
const fetchTask=async (id)=>{
  const res=await fetch(`http://localhost:5000/tasks/${id}`);
  const data = await res.json();
  console.log(data)
return data;

}

    //add tasks function
const addTask=async (task)=>{
// const id=Math.floor(Math.random()*10000) +1;
// const newTask={id,...task};

// setTasks([...tasks,newTask]);

const res =await fetch('http://localhost:5000/tasks',{
  method:'POST',
  headers:{
    'Content-type':'application/json',
  },
  body:JSON.stringify(task)
});
const data=await res.json();
setTasks([...tasks,data]);





}

    //delete tasks function
    const deleteTask=async (id)=>{
await fetch(`http://localhost:5000/tasks/${id}`,{method:'DELETE'})
setTasks(tasks.filter((task)=>task.id!==id))
    }
    //toggle reminder function
   const  toggleReminder=async (id)=>{
const tasktoggled=await fetchTask(id)

const updatedToggle={...tasktoggled,reminder:!tasktoggled.reminder}
await fetch(`http://localhost:5000/tasks/${id}`,{
  method:'PUT',
  headers:{
    'Content-type':'application/json',
  },
  body:JSON.stringify(updatedToggle)
});
const res=await fetch('http://localhost:5000/tasks');
const data= await res.json();
     setTasks(tasks.map((task)=>task.id===id?{...task,reminder:!data.reminder}:task))}

   //return part
  return (
    <Router>
    <div className="container">
    <Header onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
<Route path='/' exact render={(props)=>(
  <>
   
   {showAddTask && <AddTask onAdd={addTask}/>}
    {tasks.length>0?<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>:'nothing to display'}
  </>
)} />
<Route path='/about' component={About}/>
<Footer />
    </div>
    </Router>
  );
}

export default App;
