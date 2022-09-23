import { Spinner } from "react-bootstrap";
import './Loading.scss';


// This component is used to display the loader on screen to show user that his request is being processed

const Loading = ({ size = 100 }) => {
    return (
        <div className="loader">
            <Spinner
                style={{
                    width: size,
                    height: size
                }}
                animation="border"
            />
        </div>
    )
}
export default Loading;