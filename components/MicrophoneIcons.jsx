import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

const MicrophoneIcons = ({ isListening, handleListening }) => {
    return isListening
        ?
        <FaMicrophoneSlash fontSize={"1.9em"} title="Detener" style={{cursor:"pointer"}} onClick={handleListening} />
        :
        <FaMicrophone fontSize={"1.5em"} title="Grabar" style={{cursor:"pointer"}} onClick={handleListening} />
}

export default MicrophoneIcons