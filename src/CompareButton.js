import React from 'react'
//<button onClick={handleCompare}>Compare</button>
function CompareButton({onClickCompare}) {
  return (
    <div>
<button onClick={typeof onClickCompare =="function" ? () => onClickCompare():null}>Compare</button>
    </div>
  )
}

export default CompareButton