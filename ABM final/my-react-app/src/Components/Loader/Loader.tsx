import { Spinner } from "react-bootstrap"


export const Loader = () => {
  return (
    <div className= "loader">
    <Spinner animation="border" variant="info" className="loader-spinner" role="status">
    
  </Spinner>
  </div>
  )
}
