import { useAppSelector } from "../services/store/store";

export function useAuth(){
  const {email, id, token} = useAppSelector(store => store.UserSlice.user)
  return{
    isAuth: !!email,
    email,
    id,
    token
  }
}