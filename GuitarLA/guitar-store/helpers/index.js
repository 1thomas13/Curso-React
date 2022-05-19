
export const dateFormat = (date) =>{
    const newDate = new Date(date)

    const options = {
        year:'numeric',
        month:'long',
        date: '2-digit'
    }

    return newDate.toDateString('es-ES', options)
}