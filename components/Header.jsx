import { amatic } from "@/app/layout"

const Header = ({ title, children }) => (
    <div className="d-flex header">
        <div className='title-contain'>
            <h1 className={amatic.className}>{title}</h1>
        </div>
        {children}
    </div>
)


export default Header
