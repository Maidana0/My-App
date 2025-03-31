import { useState } from "react";
import data from "./data";
import { today } from "../../utils/utils";
import styles from "@/styles/Schedules.module.css"
import { amatic } from "@/lib/fonts";

const ResponsiveTable = ({ days, hours }) => {
  const [scheduleUser, setScheduleUser] = useState(data);

  return (
    <div className={styles.table_contain}>
      {days.map((day, indexD) => {
        return (<table key={indexD} className={`${styles.table} ${styles.table_responsive}`}>
          <thead>
            <tr className={amatic.className}>
              <th>Hora</th>
              <th >{day}</th>
            </tr>
          </thead>

          <tbody>
            {
              hours.map((hour, i) => {

                return (
                  <tr className={styles.tr} key={i}>
                    <td className={styles.hour}>{hour}</td>
                    <td className={indexD == today ? styles.today : ''} >
                      <span className={styles.table_item_name}>
                        {scheduleUser[day] && scheduleUser[day][hour] ?
                          `${scheduleUser[day][hour].name}` : ''}
                      </span>
                      <br />
                      <span className={styles.info}>
                        {scheduleUser[day][hour] && scheduleUser[day][hour].info
                          ? ` ${scheduleUser[day][hour].info}` : ''}
                      </span>
                    </td>
                  </tr>
                )
              })
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





