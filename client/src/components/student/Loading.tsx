import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PropagateLoader } from 'react-spinners'

const Loading = () => {
    const { path } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (path) {
            const timer = setTimeout(() => {
                navigate(`/${path}`)
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [path, navigate])

    return (
        <div className='min-h-screen flex items-center justify-center bg-white'>
            <PropagateLoader color="#37AFE1" size={10} speedMultiplier={1} />
        </div>
    )
}

export default Loading
