import { useRouteError } from "react-router-dom";
import icon from  'bootstrap-icons/icons/0-circle-fill.svg'
export default function ErrorPage() {
    let error = useRouteError();

    return (
        <div id="error-page">
            <h1>ErrorPage -4 {error.status} <img src={icon} alt="img" /> 4</h1>
        </div>
    );
}