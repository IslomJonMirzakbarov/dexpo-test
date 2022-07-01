import { customAPI } from '../services/api'
import { useMutation } from 'react-query'
import { useDispatch } from 'react-redux'
import { setToken } from '../store/auth/auth.slice'

const getToken = (data) => customAPI.post(`/api/user/verifySignature`, data)

const useVerifySign = () => {
    const dispatch = useDispatch()
    const mutation = useMutation((payload) => getToken(payload),{
        onSuccess: (event) => {
            if(!event?.data?.data?.token) return

            dispatch(setToken(event?.data?.data?.token))
        }
    })

    return { mutation }
}

export default useVerifySign