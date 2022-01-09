import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

function BasicEditBox() {
    let navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const listParam = searchParams.get('list')
    const idParam = searchParams.get('id')


    return (
        <div>
            <p> Wo Bin ich: {location.pathname}  </p>
            <p> Liste: {listParam}  </p>
            <p> ID: {idParam}  </p>
        </div>
    )
}

export default BasicEditBox
