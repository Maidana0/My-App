import { useState } from "react";
import data from "./data";
import { today } from "../../utils/utils";
import styles from "@/styles/Schedules.module.css"
import { amatic } from "@/lib/fonts";

const ResponsiveTable = ({ days, hours }) => {
  const [scheduleUser, setScheduleUser] = useState(data);

  return (
    <div className={styles.table_contain}>
      {days.map((day, indexD) => (
        <table key={indexD} className={`${styles.table} ${styles.table_responsive}`}>
          <thead>
            <tr className={amatic.className}>
              <th>Hora</th>
              <th >{day}</th>
            </tr>
          </thead>

          <tbody>
            {
              hours.map((hour, i) => {
                const schedule = scheduleUser[day]?.[hour];

                return (
                  <tr key={i}>
                    <td className={styles.hour}>{hour}</td>
                    <td
                      className={
                        `${indexD === today && styles.today} ${schedule && styles.activity}`
                      }
                      style={{ color: schedule?.color ?? "" }}
                    >
                      {
                        schedule && (<>
                          {schedule.activity}
                          <br />
                          <span className={styles.info}>
                            {schedule.info ?? ""}
                          </span>
                        </>)
                      }
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      ))}
    </div>
  );
};


export default ResponsiveTable;