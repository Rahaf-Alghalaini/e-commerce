import { Link } from 'react-router-dom';
import'./403.css';
export default  function Err403({role }){
    return(
        <div className="text-wrapper">
            <div className="title" data-content={404}>
                403-ACCESS DENIED
            </div>
            <div className="subtitle">
                Oops,you dont have permission  to access the page.
                <Link className='d-block text-center btn btn-primary'
                to={role === '1996'? "/dashboard/writer":'/'}>{role === '1996 '? 'Go To Writer Page':'Go To Home Page'}</Link>
            </div>
        </div>
    );
}