import { useMemo, useState } from "react";
import data from "./data";
import styles from "@/styles/Schedules.module.css"
import { today } from "../../utils/utils";
import { amatic } from "@/lib/fonts";

const Table = ({ days, hours }) => {
  // Estado para almacenar información adicional para un día específico
  const [scheduleUser, setScheduleUser] = useState(data);

  const rowSpanMap = useMemo(() => {
    const map = {};

    hours.forEach((hour, indexHour) => {
      days.forEach((day) => {
        if (!scheduleUser[day] || !scheduleUser[day][hour]) return;

        const currentActivity = scheduleUser[day][hour]?.activity;
        if (map[`${day}-${hour}`]) return;

        let rowSpan = 1;
        for (let i = indexHour + 1; i < hours.length; i++) {
          const nextHour = hours[i];
          if (scheduleUser[day][nextHour]?.activity === currentActivity) {
            rowSpan++;
            map[`${day}-${nextHour}`] = -1;
          } else break;
        }

        map[`${day}-${hour}`] = rowSpan;
      });
    });

    return map;
  }, [scheduleUser, hours, days]);

  return (
    <div className={`${styles.table_contain}`}>
      <table className={styles.table}>
        <thead>
          <tr className={amatic.className}>
            <th>Hora</th>
            {days.map((dayWeek, i) => (
              <th key={i}>{dayWeek}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {
            hours.map((hour, indexHour) => {

              return (
                <tr key={indexHour}>
                  <td className={styles.hour}>{hour}</td>
                  {
                    days.map((day, indexDay) => {

                      const schedule = scheduleUser[day]?.[hour];
                      const rowspan = rowSpanMap[`${day}-${hour}`];

                      return rowspan === -1
                        ? null
                        : (
                          <td
                            key={indexDay}
                            rowSpan={rowspan > 1 ? rowspan : 1}
                            className={
                              `${indexDay === today && styles.today} ${schedule && styles.activity}`
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
                        )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
};



export default Table;