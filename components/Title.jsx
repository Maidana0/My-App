import { amatic } from "@/app/layout"

const Title = ({ title }) => (
    <div className='title-contain'>
        <h1 className={`title ${amatic.className}`}>{title}</h1>
    </div>)


export default Title