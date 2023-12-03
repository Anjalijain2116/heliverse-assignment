import {Link} from "react-router-dom"

const Render =()=>{
    return (
        <div className="render">
          <h2 >Welcome To the Site</h2>
          <div className="render_btns">
             <Link to='/user'>
             <button className="render_btn btn1">Users</button>
             </Link>
             
             <Link to='/createteam'>
             <button className="render_btn">Create team</button>
             </Link>
             
          </div>
          
        </div>
    )
}

export default Render;