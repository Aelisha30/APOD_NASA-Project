import { useState ,useEffect } from "react";
import Footer from "./components/Footer";
import Main from "./components/Main";
import SideBar from "./components/SideBar";

function App (){
  const[data,setData]=useState(null);
  const[loading,setLoading]=useState(false);
  const[showModal,setShowModal]=useState(false);
  function handleToggleModal(){
    setShowModal(!showModal)
  }
  useEffect(()=>{
    async function fetchAPIData(){
      //const DEMO_KEY=import.meta.env.DEMO_KEY;
      const url ='https://api.nasa.gov/planetary/apod?api_key=hYpoZaezypHvswdmecqopRGUnWJUgKgRGvx7GsfY'
      //caching the data
      const today=(new Date()).toDateString()
      const localKey=`NASA-${today}`
      if(localStorage.getItem(localKey)){
        const apiData=JSON.parse(localStorage.getItem(localKey))
        setData(apiData)
        return
      }
      localStorage.clear()

      try{
        const res = await fetch(url)
        const apiData=await res.json()
        localStorage.setItem(localKey,JSON.stringify(apiData))
        setData(apiData)
        console.log('Fetched from API today',apiData)
      }catch(err){
        console.log(err.message)
      }
    }
    fetchAPIData()
  },[])
  return(
  <>
  {data?(<Main data={data}/>):(
    <div className="loadingState">
      <i className="fa-solid fa-gear"></i>
    </div>
  )}
  {showModal && (<SideBar data={data} handleToggleModal={handleToggleModal}/>)}
  {data && (<Footer data={data} handleToggleModal={handleToggleModal}/>)}
  </>
  )
}
export default App;