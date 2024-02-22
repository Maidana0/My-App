import fetchData from "@/utils/fetch.js";
import { createDate } from "@/utils/utils";

//CUSTOM FUNCTIONS FOR REQUESTS
// window.location.href = "/";
// SI ME DA UN ERROR PUEDO USAR ESTO PARA REDIGIRLO
// AUNQUE LO MEJOR SERIA REDIRIGIRLO Y EXPLICARLE EL ERROR...
// MANEJAR EL ERROR EN List.jsx - EN PROCESO...

export async function createTask(task, { changes, setChanges }) {
  const data = await fetchData("tasks", "POST", { task, date: createDate() })
  await setChanges(!changes)

  return data
}


export async function getTasks(list, textTask, setTaskList, listContain) {
  let sucess = list == "realizadas" ? "true" : "false"
  let task = textTask ? textTask : ""
  const data = await fetchData(`tasks?sucess=${sucess}&task=${task}`)

  if (!data.error) await setTaskList(data)
  if (listContain) listContain.scrollTo({ top: 9999, behavior: 'smooth' });
  //ESTO ES POSICIONAR EL SCROLL EN EL COMPONENTE / USALO PARA NOTES
  //listContain.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });

  return data
}




export async function updateTask(task) {
  let newTask = {}
  //CODIGO PARA CAMBIAR EL TEXTO DE UNA TAREA
}

export async function updateTaskState({ sucess, date }, { changes, setChanges }) {
  let taskState = {
    sucess: !sucess,
    completeAt: sucess ? "incomplete" : createDate()
  }

  const data = await fetchData(`tasks/${date}`, 'PUT', taskState)
  await setChanges(!changes)
  return data
}

export async function deleteTask(taskDate, { changes, setChanges }) {
  const data = await fetchData(`tasks/${taskDate}`, 'DELETE')
  await setChanges(!changes)
  return data
}