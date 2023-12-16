"use client"
import { useState } from "react";
import data from "./data";
import { today } from "./data";

const Table = (props) => {
    // Estado para almacenar información adicional para un día específico
    const [scheduleUser, setScheduleUser] = useState(data);
    const {font, styles, days, hours} = props
    return (
        <div className={`${styles.table_contain}`}>
            <table className={styles.table}>
                <thead className={font}>
                    {/* Mostrar los días como una fila en el encabezado */}
                    <tr>
                        <th></th>
                        {days.map((dayWeek, i) => (
                            <th key={i}>{dayWeek}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {/* Mostrar los horarios como filas */}
                    {hours.map((hour, indexHour) => (
                        <tr key={indexHour}>
                            {/* Mostrar la hora en la primera celda */}
                            <td className={styles.hour}>{hour}</td>
                            {/* Mostrar la información para cada día en cada fila */}
                            {days.map((day, indexDay) => (
                                <td key={indexDay} className={`${indexDay === today && scheduleUser[day][hour]
                                    ? styles.today : ''} ${scheduleUser[day] && scheduleUser[day][hour]
                                        ? styles.activity : ''}`}
                                >
                                    {scheduleUser[day] && scheduleUser[day][hour] ?
                                        `${scheduleUser[day][hour].name}` : ''}
                                    <br />
                                    <span className={styles.info}>
                                        {scheduleUser[day][hour] && scheduleUser[day][hour].info
                                            ? ` ${scheduleUser[day][hour].info}` : ''}
                                    </span>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};




export default Table;





