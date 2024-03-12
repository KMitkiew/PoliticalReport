import React from "react";
import AddEventForm from "./AddEventForm";
import SearchNewEventData from "./SearchNewEventData"
import '../../css/AddEvent.css'

export default function AddEvent(){
    return(
        <div className="add-event">
          <AddEventForm />
          <SearchNewEventData />
        </div>
    )
}