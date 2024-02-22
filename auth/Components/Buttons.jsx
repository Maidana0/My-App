import { FcGoogle } from "react-icons/fc";
import { RiFacebookFill } from "react-icons/ri";

const Buttons = ({ styles, button }) => {
    const { handleClickModal, text, className } = button

    return (
        <>
            <div className={`d-flex ${styles.buttons_contain}`}>
                <button type="button">

                    <div className={`d-flex ${styles.facebook}`}>
                        < RiFacebookFill color="white"/>
                    </div>
                    Facebook
                </button>

                <button type="button">
                    < FcGoogle />
                    Google
                </button>
            </div>
            <button className={className && className}
                onClick={handleClickModal}>
                {text}
            </button>
        </>
    )
}

export default Buttons