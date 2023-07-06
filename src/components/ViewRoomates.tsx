import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Roomate } from "../model";
import { useState } from "react";
import AddRoomate from "./AddRoomate";

interface viewProps{
    currentRoomate: string;
    roomates: Roomate[];
    setCurrentRoomate: React.Dispatch<React.SetStateAction<string>>;
    setRoomates: React.Dispatch<React.SetStateAction<Roomate[]>>
}
export default function ViewRoomates(props:viewProps){
    const [addCheck, setAddCheck] = useState<boolean>(false);

    const handleChange = (event: SelectChangeEvent) => {
        props.setCurrentRoomate(event.target.value as string);
    };

    const handleAddClick = () =>{
        setAddCheck(true);
    }
    return (
        <div className="select-for">
            <FormControl fullWidth>
                <InputLabel id="select-view-for">for...</InputLabel>
                <Select
                    labelId="select-view-for"
                    value={props.currentRoomate}
                    label="for..."
                    onChange={handleChange}
                >
                {/* <MenuItem value= "All">All</MenuItem> */}
                {props.roomates.map(person =>
                    <MenuItem value={person.name}>{person.name}</MenuItem>
                )}
                </Select>
            </FormControl>
            {addCheck === false && <Button onClick={handleAddClick}>+</Button>}
            {addCheck === true && <AddRoomate roomates={props.roomates} setRoomates={props.setRoomates} setAddCheck={setAddCheck}></AddRoomate>}
        </div>
    )
}