const ProgressBar = ({progress}) => {

  const colors = [
    'rgb(255,214,161)',
    'rgb(255,175,163)',
    'rgb(108,115,148)',
    'rgb(141,181,145)',
    'rgb(120,161,145)',
    'rgb(55,181,200)',
    'rgb(89,181,120)',
    'rgb(112,181,112)',
    'rgb(141,75,145)',
    'rgb(80,120,210)'
  ]
  
  const randomColor =colors[Math.floor(Math.random()*colors.length)]
    return (
      <div className="outer-bar" >
        <div 
          className="inner-bar" 
          style={{width : `${progress}%`, backgroundColor: randomColor }}
        >

        </div>
      </div>
    )
  }
  
  export default ProgressBar