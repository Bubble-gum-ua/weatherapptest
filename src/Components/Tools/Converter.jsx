


export const convertTime = (hourUnix) => {
    let date = new Date(hourUnix * 1000)
    let hour = date.getHours()
    let minutes = date.getMinutes()
    return hour < 10
        ? minutes < 10
            ? `0${hour}:0${minutes}`
            : `0${hour}:${minutes}`
        : `${hour}:00`
}