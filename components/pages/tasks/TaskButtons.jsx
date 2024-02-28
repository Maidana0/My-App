import {
    MdDeleteForever,
    MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank, MdPlayArrow,
    MdModeEdit, MdOutlineSaveAs, MdStop,
}
    from 'react-icons/md';

export function DeleteTask({ id, changes }) {
    async function handleClick() {
        const res = await fetch('/api/tasks/' + id, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } })
        const data = await res.json()

        if (data.sucess) {
            changes.setChanges(!changes.changes)
        }
    }

    return <MdDeleteForever fontSize={'1.7em'} title='Borrar' onClick={handleClick} />
}



// STATUS ICON
export async function UpdateTask(id, taskStatus, toStatus, textTask) {
    const updatedStatus = taskStatus ? taskStatus == 'pending' ? 'in-progress' : taskStatus == 'done' ? 'pending' : 'done' : toStatus
    const updatedTask = updatedStatus ? { status: updatedStatus } : { task: textTask }

    const res = await fetch('/api/tasks/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask)
    })

    const data = await res.json()
    return data
}


export const TaskPending = ({ handleClick }) => <MdPlayArrow title="Empezar tarea" onClick={handleClick} />
export const TaskDone = ({ handleClick }) => <MdOutlineCheckBox title="Deshacer" onClick={handleClick} />
export const TaskInProgress = ({ handleClick }) => <MdOutlineCheckBoxOutlineBlank title="Realizada" onClick={handleClick} />

export const TaskStop = ({ handleClick }) => <MdStop title="Dejar de hacer" onClick={handleClick} />

export const SetTask = ({ handleClick }) => <MdModeEdit title="Editar" onClick={handleClick} />
export const SaveTask = ({ handleClick }) => <MdOutlineSaveAs title="Guardar" onClick={handleClick} />