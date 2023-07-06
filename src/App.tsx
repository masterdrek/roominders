import { useEffect, useState } from "react";
import "./App.css"
import ItemCards from "./components/ItemCards"
import ViewRoomates from "./components/ViewRoomates"
import { Roomate } from "./model";
import Auth from "./components/auth";
import { set } from "firebase/database";
import { auth, db } from "./config/firebase";
import {getDocs, collection} from "firebase/firestore"
import firebase from "firebase/compat/app";
import { signOut } from "firebase/auth";


export default function App(){
  const [currentRoomate, setCurrentRoomate] = useState<string>("");
  const [roomates, setRoomates] = useState<Roomate[]>([]);
  const [user, setUser] = useState<string>("")
  const [userList, setUserList] = useState<{ id: string; }[]>([]);
  
  const userCollectionRef = collection(db, "users");
  useEffect(() => {
    
    const getUserList = async() => {
      await signOut(auth)
      setUser("")
      setRoomates([])
      try{
        const data = await getDocs(userCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(filteredData)
        setUserList(filteredData)
      }catch (err) {
        console.error(err)
      }
    }
    getUserList();
  }, []);

  const getUserList = async() => {
    try{
      const data = await getDocs(userCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData)
      setUserList(filteredData)
    }catch (err) {
      console.error(err)
    }
  }
  return(
    <div className="App">
      <h1>Roominders</h1>
      <Auth getUserList={getUserList} setUser={setUser} user={user} roomates={roomates} setRoomates={setRoomates} userList={userList} setUserList={setUserList}></Auth>
      {user != "" && <p style={{color:"black"}}>logged in as {auth?.currentUser?.email}</p>}
      {user != "" && <ViewRoomates currentRoomate={currentRoomate} roomates={roomates} setCurrentRoomate={setCurrentRoomate} setRoomates={setRoomates}></ViewRoomates>}
      {currentRoomate != "" && user != "" && <ItemCards user= {user} currentRoomate={currentRoomate} roomates={roomates} setRoomates={setRoomates}></ItemCards>}
    </div>
  )
}