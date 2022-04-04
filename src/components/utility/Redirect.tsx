import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface IRedirectParams {
    pathname: string
}

const Redirect = ({ pathname }: IRedirectParams) => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(pathname, { replace: true })
    });
    return <></>;
}

export default Redirect;