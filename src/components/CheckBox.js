import React from "react";

export default function CheckBox(){
    let checked = false;
    return (    
      <>
        <input
          type="checkbox"
          onClick={() => checked = !checked}
          checked={checked}
        />
        <label> Toggle sound</label>
      </>
    );
}