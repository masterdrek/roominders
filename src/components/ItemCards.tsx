import { Card, CardContent, CardHeader, TextField } from "@mui/material";
import "./styles.css"
import { Roomate } from "../model";
import { ChangeEvent } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

interface ItemProps{
    currentRoomate: string;
    user: string;
    roomates: Roomate[];
    setRoomates: React.Dispatch<React.SetStateAction<Roomate[]>>;
}
export default function ItemCards(props: ItemProps){

    const handleChange = (property:string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const { roomates, currentRoomate } = props;
      
        const updatedRoomates = roomates.map((roomate) => {
          if (roomate.name === currentRoomate) {
            return { ...roomate, [property]: value };
          }
          return roomate;
        });
      
        props.setRoomates(updatedRoomates);
    };

    const saveData = async () => {
        const userDoc = doc(db, "users", props.user)
        const tempRoomate: { [key: string]: any } = {};
        props.roomates.map(r => {
            if(r.name === props.currentRoomate){
                tempRoomate[props.currentRoomate] = [r.name,r.rules,r.reminders,r.tasks];
            }
        })
        updateDoc(userDoc, tempRoomate)
    }
    const handleRulesChange = handleChange('rules');
    const handleRemindersChange = handleChange('reminders');
    const handleTasksChange = handleChange('tasks');

    return(
        <div className="cards">
            {props.roomates.map(roomate=>
            roomate.name === props.currentRoomate &&
                <div className="cards">
                    <Card className="card">
                        <CardHeader title="Rules"/>
                        <CardContent>
                            <TextField
                            id="filled-multiline-static"
                            multiline
                            defaultValue={roomate.rules}
                            placeholder="No rules"
                            variant="standard"
                            fullWidth
                            onChange={handleRulesChange}
                            />
                        </CardContent>
                    </Card>
                    <Card className="card">
                        <CardHeader title="Reminders"/>
                        <CardContent>
                            <TextField
                            id="filled-multiline-static"
                            multiline
                            defaultValue={roomate.reminders}
                            placeholder="No reminders"
                            variant="standard"
                            fullWidth
                            onChange={handleRemindersChange}
                            />
                        </CardContent>
                    </Card>
                    <Card className="card">
                        <CardHeader title="Tasks"/>
                        <CardContent>
                            <TextField
                            id="filled-multiline-static"
                            multiline
                            defaultValue={roomate.tasks}
                            placeholder="No tasks"
                            variant="standard"
                            fullWidth
                            onChange={handleTasksChange}
                            />
                        </CardContent>
                    
                    </Card>
                </div>  
                
            )}
            <button onClick={ () => saveData()}>save</button>
           
        </div>
        
    )
}