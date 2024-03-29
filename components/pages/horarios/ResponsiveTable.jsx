"use client"
import { useState } from "react";
import data from "./data";
import { today } from "../../../utils/utils";

const ResponsiveTable = (props) => {
    const [scheduleUser, setScheduleUser] = useState(data);
    const { font, styles, days, hours } = props
    
    return (
        <div className={styles.table_contain}>
            {days.map((dia, indexD) => {
                return (<table key={indexD} className={`${styles.table} ${styles.table_responsive}`}>
                    <thead className={font}>
                        <tr>
                            <th></th>
                            <th>{dia}</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            hours.map((hora, i) => (
                                <tr className={styles.tr} key={i}>
                                    <td className={styles.hour}>{hora}</td>
                                    <td className={indexD == today ? styles.today_responsive : ''}>
                                        <span className={styles.table_item_name}>
                                            {scheduleUser[dia] && scheduleUser[dia][hora] ?
                                                `${scheduleUser[dia][hora].name}` : ''}
                                        </span>
                                        <br />
                                        <span className={styles.info}>
                                            {scheduleUser[dia][hora] && scheduleUser[dia][hora].info
                                                ? ` ${scheduleUser[dia][hora].info}` : ''}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                )
            })
            }
        </div>
    );
};





export default ResponsiveTable;





