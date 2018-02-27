import React from 'react';

const VariationTab = (props) =>{
  return(
    <div id={props.id} onClick={props.onClick} className={ props.isSelected ? "tab selected" : "tab"}>
      {props.title}
    </div>
  );
}
export default VariationTab;
