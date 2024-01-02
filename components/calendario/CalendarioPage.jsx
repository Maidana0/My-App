"use client"
import Header from "../Header"


import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import listPlugin from '@fullcalendar/list';
import interactionPluggin from '@fullcalendar/interaction'

import { Suspense, useState } from "react";
import Modal from "./Modal";


const events = {
    events: [
        {
            title: 'Ahora',
            start: Date.now()
        },
        {
            title: 'Event2',
            start: '2023-12-21'
        }
    ],
    color: 'yellow',   // an option!
    textColor: 'black' // an option!
}
const googleEvents = [
    {
        googleCalendarId: "es.ar#holiday@group.v.calendar.google.com",
        className: 'google-events',
        color: 'red', textColor: 'white'
    },
    {
        googleCalendarId: 'woldehtes@gmail.com',
        className: 'personal-events',
        color: "green"
    }
]
export function DemoApp({ dateStr, modal }) {
    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, googleCalendarPlugin, listPlugin, interactionPluggin]}
                googleCalendarApiKey='AIzaSyAfCyf5hHNbYKuy3BBqcJpEJj144JGVlrY'


                initialView='dayGridMonth'
                buttonText={{ month: 'Fechas', listMonth: 'Eventos' }}
                footerToolbar={{
                    start: 'prevYear,prev',
                    center: 'dayGridMonth,listMonth', end: 'next,nextYear'
                }}

                height={'780px'}
                aspectRatio={'2'}
                weekends={true}
                events={events}
                eventSources={googleEvents}
                eventContent={renderEventContent}
                locale={esLocale}
                fixedWeekCount={false}

                editable={true}
                droppable={true}
                selectable={true}



                dateClick={(e) => {
                    dateStr.setDate(e.dateStr)
                    modal.setModal(!modal.modal)
                    console.log(e)
                }}

                dayCellClassNames={'day-empty'}
                eventClassNames={'event-contain'}
            />
        </div>
    )
}

// a custom render function
function renderEventContent(eventInfo) {
    return (

        <div className='event-text-contain' title={`${eventInfo.timeText ? eventInfo.timeText : 'Todo el dia'} - ${eventInfo.event.title}`}>
            {eventInfo.timeText ?
                <b className='event-text-time'>
                    {eventInfo.timeText}
                </b>
                : ''}
            <i className={'event-text-title'}>
                {eventInfo.event.title}</i>
        </div>
    )
}






import { FaRegCalendarPlus } from "react-icons/fa6";


const CalendarioPage = () => {
    const [modal, setModal] = useState(false)
    const [date, setDate] = useState(false)
    return (
        <>
            <Header title='Mi Calendario'>
                <button className={`btn-calender btn-icon`}
                    onClick={() => setModal(!modal)}>
                    <FaRegCalendarPlus title="Agregar Evento" />
                </button>
            </Header>
            <Suspense fallback={<p>Cargando...</p>}>
                <DemoApp
                    dateStr={{ date, setDate }}
                    modal={{ modal, setModal }}
                />
            </Suspense>


            {
                modal ?
                    <Modal
                        dateStr={date} modal={{ modal, setModal }} />
                    : ''
            }
        </>
    )
}

export default CalendarioPage