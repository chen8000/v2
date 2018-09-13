

// 获取当前年月日
export const getDate = () => {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    return { year, month, day }
}

// 获取当前月的总天数  total(2018, 9)
export const total = (y, m) => {
    return new Date(y,m,0).getDate()
}




