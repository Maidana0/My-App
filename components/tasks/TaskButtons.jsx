import fetchData from '@/utils/fetch';
import {
    MdDeleteForever,
    MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank, MdPlayArrow,
    MdModeEdit, MdOutlineSaveAs, MdStop,
}
    from 'react-icons/md';

export async function deleteTask(id,) {
    const path = "tasks/" + id
    const data = await fetchData(path, { method: "DELETE", isLocalReq: true })
    return data
}



// STATUS ICON
export async function updateTask(id, taskStatus, toStatus, textTask) {
    const updatedStatus = taskStatus ? taskStatus == 'pending' ? 'in-progress' : taskStatus == 'done' ? 'pending' : 'done' : toStatus
    const updatedTask = updatedStatus ? { status: updatedStatus } : { task: textTask }

    const path = "tasks/" + id
    const data = await fetchData(path, { method: "PUT", isLocalReq: true, body: updatedTask })
    return data
}


export const TaskPending = ({ handleClick }) => <MdPlayArrow title="Empezar tarea" onClick={handleClick} />
export const TaskDone = ({ handleClick }) => <MdOutlineCheckBox title="Deshacer" onClick={handleClick} />
export const TaskInProgress = ({ handleClick }) => <MdOutlineCheckBoxOutlineBlank title="Realizada" onClick={handleClick} />

export const TaskStop = ({ handleClick }) => <MdStop title="Dejar de hacer" onClick={handleClick} />

export const SetTask = ({ handleClick }) => <MdModeEdit title="Editar" onClick={handleClick} />
export const SaveTask = ({ handleClick }) => <MdOutlineSaveAs title="Guardar" onClick={handleClick} />

export const DeleteTaskIcon = ({ handleClick }) => <MdDeleteForever fontSize={'1.7em'} title='Borrar' onClick={handleClick} />