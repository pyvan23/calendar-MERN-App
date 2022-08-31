import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi";
import { onChecking } from "../store/auth/authSlice";


export const useAuthStore = () => {

    const { status, user, errorMessage, } = useSelector(state => state.auth)

    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {

        dispatch(onChecking())
        
        try {
            const resp = await calendarApi.post('/auth/login', { email , password })

            console.log({resp});
        } catch (error) {
            console.log({error});
            
            
        }
    }


    return {
        //properties
        status,
        user,
        errorMessage,

        //methods
        startLogin

    }
}