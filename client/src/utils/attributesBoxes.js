export default function attributesBoxes(item) {
 return (
  <>
   {Object.entries(item.decisions).map(([key, value]) => {
    return (
     <div
      key={Math.random()}
      className='cartoverlay-item-info-decisions-box-subwrapper'>
      <p className='cartoverlay-item-info-decisions-box-text'>{key}</p>
      <div className='cartoverlay-item-info-decisions-box-result'>{value}</div>
     </div>
    )
   })}
  </>
 )
}
