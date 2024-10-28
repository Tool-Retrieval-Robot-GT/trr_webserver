import './ToolDesc.css';
import hammer from './hammer.jpg'

function ToolDesc() {
    return (
        <div className="card-container">
          <div className="card-header">
            <img src={hammer} width={150}></img>
          </div>
          <div className="card-content">
            <table>
              <tbody>
                <tr><td>Tool:</td><td>Hammer</td></tr>
                <tr><td>Size:</td><td>Small</td></tr>
                <tr><td>Available:</td>Yes</tr>
              </tbody>
            </table>
          </div>
          <div className="card-footer">
            <button className="footer-button">Request</button>
          </div>
        </div>
    );
}

export default ToolDesc;