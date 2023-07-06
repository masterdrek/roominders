import { useEffect, useState } from "react"
import {auth, db} from "../config/firebase"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth"
import { setUserId } from "firebase/analytics";
import { Roomate } from "../model";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";

interface AuthProps{
    user: string;
    setUser: React.Dispatch<React.SetStateAction<string>>;
    roomates: Roomate[];
    setRoomates: React.Dispatch<React.SetStateAction<Roomate[]>>
    userList: { id: string; }[];
    setUserList: React.Dispatch<React.SetStateAction<{id: string;}[]>>;
    getUserList: () => Promise<void>;
}
export default function Auth(props:AuthProps){
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    console.log("current user: " + auth?.currentUser?.uid)

    useEffect(() => {
        console.log("hereee" + JSON.stringify(props.userList))
        checkUser(auth?.currentUser?.uid ?? "")
    },[props.userList] || [])
    
    const logIn = async () => {
        try{
            await signInWithEmailAndPassword(auth, email, password)
            console.log("logged in")

            props.getUserList;
            props.setUser(auth?.currentUser?.uid ?? "")
            
        } catch(err) {
            console.error(err);
        }
        await props.getUserList()
        // checkUser(auth?.currentUser?.uid ?? "")
    }
    const createAccount = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password)
            console.log("created account")
            props.setUser(auth?.currentUser?.uid ?? "")
            
        } catch(err) {
            console.error(err);
        }
        await createUser(auth?.currentUser?.uid ?? "")
        await props.getUserList()
        // checkUser(auth?.currentUser?.uid ?? "")
    }
    const logOut = async () => {
        try{
            await signOut(auth)
            props.setUser("")
            props.setRoomates([])
        } catch(err) {
            console.error(err);
        }
    }
    const checkUser = (currentUserId:string)  => {
        let inCheck = false;
        props.userList.map(u => {
            console.log(u.id, currentUserId)
            if(u.id === currentUserId){
                console.log("found!")
                inCheck = true;
                let tempRoomates:Roomate[] = [];
                Object.entries(u).forEach(([fieldName, fieldValue]) => {
                    console.log(fieldName);
                    console.log(fieldValue)
                    if(fieldName != "id"){
                        tempRoomates = ([...tempRoomates, {name: fieldValue[0], rules: fieldValue[1], reminders: fieldValue[2], tasks: fieldValue[3]}])
                    }
                    
                })
                console.log("HERE: " + JSON.stringify(tempRoomates))
                props.setRoomates(tempRoomates)
            }
        })
    }
    
    const createUser = async(currentUserId:string)  => {
        console.log("created user: " + currentUserId)
        const userDoc = doc(db, "users", "testnewdoc")
        let tempRoomate= { ["All"]: ["All", "", "", ""] };
        await setDoc(doc(db, "users", currentUserId), {
            All: ["All","","",""]
        })
        
    }
    return(
        <div>
            <input 
                placeholder="room" 
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                placeholder="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            {props.user === "" && <button onClick={logIn}>sign in</button> }
            {props.user === "" && <button onClick={createAccount}>create</button>}
            {props.user != "" && <button onClick={logOut}>sign out</button>}
        </div>
    )
}