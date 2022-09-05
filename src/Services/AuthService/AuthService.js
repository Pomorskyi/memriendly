import { useNavigate } from 'react-router-dom';
import { LOGIN_PATH } from '../constants/constants'

const CheckAuth = ( model, defaultPath = LOGIN_PATH ) => {
  let navigate = useNavigate();

  if(model.isUserAuthenticated){
    navigate(`/${defaultPath}`);
  } else {
    navigate(`/login`);
  }
}

export default{
  CheckAuth
}