import { LoaderCircle } from "lucide-react"
import style from './Loading.module.css'

const Loading = props => {
  return (
    <div className={`${style.backdrop} ${props.loading && style.backdropShow}`}>
      <span className={style.spinner}>
        <LoaderCircle />
      </span>
    </div>
  )
}

export default Loading
