import { TextField } from "@mui/material";
import { FormEventHandler } from "react";
import { Roomate } from "../model";

interface AddProps{
    roomates: Roomate[];
    setRoomates: React.Dispatch<React.SetStateAction<Roomate[]>>;
    setAddCheck: React.Dispatch<React.SetStateAction<boolean>>;

}

export default function AddRoomate(props: AddProps){
    let newName:string = "";
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        props.setAddCheck(false);
        console.log({newName});
        props.setRoomates([...props.roomates,{name:newName, rules: "", reminders: "", tasks: ""}])

      };
    return(
        <div>
            <form onSubmit={handleSubmit}>
            <TextField
                id="outlined-basic"
                placeholder="enter name..."
                onChange={(e) =>{newName = e.target.value}}
            >
            
                
            </TextField>
            </form>
            
        </div>
    )
}