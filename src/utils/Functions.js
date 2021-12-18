export const dateConverter = (format) => {
    if (!format) return "";

    let monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    let result = new Date(format)
    let year = result.getFullYear()
    let month = result.getMonth()
    let date = result.getDate()

    let hour = result.getHours()
    let min = result.getMinutes()


    return `${date} ${monthArray[month]}, ${year}`
}