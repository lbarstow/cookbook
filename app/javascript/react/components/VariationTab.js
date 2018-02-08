import React from 'react';

const VariationTab = (props) =>{
  // need to put in  a better way to format my body

  return(
    <div id={props.id} onClick={props.onClick} className={ props.isSelected ? "tab selected" : "tab"}>
      {props.title}
    </div>
  );
}
export default VariationTab;
