
export default function ProductCard({title}) {
  return (
    <div className="card" >
      <img src="jeans3.jpg" alt={`${title}`} style={{width: "100%", backgroundColor: "yellow", margin: "5px"}}/>
      <h2 >{title}</h2>
    </div>  
  );
}
