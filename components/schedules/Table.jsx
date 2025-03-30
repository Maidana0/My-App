import { useState } from "react";
import data from "./data";
import styles from "@/styles/Schedules.module.css"
import { today } from "../../utils/utils";
import { amatic } from "@/lib/fonts";

const Table = ({ days, hours }) => {
    // Estado para almacenar información adicional para un día específico
    const [scheduleUser, setScheduleUser] = useState(data);
    return (
        <div className={`${styles.table_contain}`}>
            <table className={styles.table}>
                <thead>
                    {/* Mostrar los días como una fila en el encabezado */}
                    <tr>
                        <th></th>
                        {days.map((dayWeek, i) => (
                            <th key={i} className={amatic.className}>{dayWeek}</th>
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





