import { useEffect, useRef, useState } from "react"

const useSpeekToText = (options) => {
    const [isListening, setIsListening] = useState(false)
    const [transcript, setTranscript] = useState("")
    const recognitionRef = useRef(null)

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window)) {
            console.error("Browser doesn't support speech recognition")
            return;
        }

        recognitionRef.current = new window.webkitSpeechRecognition()
        const recognition = recognitionRef.current

        recognition.interimResults = options.interimResults || false
        recognition.lang = options.lang || "es-AR"
        recognition.continuous = options.continuous || false

        if ("webkitSpeechGrammarList" in window) {
            const grammar =
                "#JSGF V1.0; grammar punctuation; public <punc> = . | , | ; | ? | ! | ¿ | ¡ | : | - | ( | ) | [ | ] | { | } | \" | ' | < | > | / | \\ | _ | ~ | $ | % | ^ | & | * | + | = | @ | # | "

            const speechRecognitionList = new window.webkitSpeechGrammarList()
            speechRecognitionList.addFromString(grammar, 1)
            recognition.grammars = speechRecognitionList

            recognition.onresult = (event) => {
                let interimTranscript = Array.from(event.results)
                    .map((result) => result[0].transcript)
                    .join("");

                interimTranscript = interimTranscript
                    .replace(/punto y coma/gi, ";")
                    .replace(/punto/gi, ".")
                    .replace(/coma/gi, ",")
                    .replace(/salto de línea/gi, "\n")
                    .replace(/barra/gi, "/");



                // Poner en mayuscula la primer letra antes de los signos indicados...
                interimTranscript = interimTranscript
                    .toLowerCase()
                    .replace(/(^\w)|(\.|\;|\n)\s*\w/g, (match) => {
                        return match.toUpperCase();
                    });

                // Borrar espacios antes de la puntuacion && antes y despues de saltos de lineas
                interimTranscript = interimTranscript
                    .replace(/\s+([.,;?!])/g, '$1')
                    .replace(/\n+\s/g, '\n')
                    .replace(/\s+\n/g, '\n');

                setTranscript(interimTranscript);
            };

        }

        recognition.oneerror = (event) => {
            console.error("Speech recognition error: ", event.error)
        }

        recognition.onend = () => {
            setIsListening(false)
            setTranscript("")
        }

        return () => {
            recognition.stop()
        }
    }, [])

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            recognitionRef.current.start()
            setIsListening(true)
        }
    }


    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop()
            setIsListening(false)
        }

    }

    return {
        isListening,
        transcript,
        startListening,
        stopListening
    }
}

export default useSpeekToText