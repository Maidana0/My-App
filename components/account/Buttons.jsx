import { FcGoogle } from "react-icons/fc";
import { RiFacebookFill } from "react-icons/ri";

const Buttons = ({ styles, button }) => {
    const { handleClickModal, text, className } = button

    const authApi = async (e) => window.location.href = `${process.env.MY_API_URL}/api/user/${e.target.name}`;



    return (
        <>
            <div className={`d-flex ${styles.buttons_contain}`}>
                <button type="button" onClick={authApi} name="facebook" >

                    <div className={`d-flex ${styles.facebook}`}>
                        < RiFacebookFill color="white" />
                    </div>
                    Facebook
                </button>

                <button type="button" name="google" onClick={authApi}>
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