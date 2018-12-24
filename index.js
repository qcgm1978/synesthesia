$(() => {
    $.getJSON('./color.json', data => {
        $('button').on('click', () => {
            const textarea = $('textarea')
            const text = textarea.val()
            const arr = text.split('')
            const newStr = arr.reduce((accumulator, item) => {
                if (/\w/.test(item)) {
                    const probability = getProbability()
                    const colorArr = getColor({ data, item })
                    const color = colorArr.find((item, index) => {
                        return probability >= item.val && probability <= colorArr[index + 1].val
                    }).prop
                    return accumulator + `<span class='${color}'>${item}</span>`
                } else {
                    return accumulator + item
                }
            }, '')
            $('p').html(newStr)
        })
    })
    const getColor = ({ data, item }) => {
        return data[item.toUpperCase()].split(',').map(item => ({ prop: item.split('=')[0].trim(), val: +item.split('=')[1].trim() })).sort((a, b) => a.val - b.val)
    }
    const getRandomLast = () => +Math.random().toString().slice(-1)
    const getProbability = () => {
        let obj = {}, n = 0
        for (let i = 0; i < 10; i++) {
            const last = getRandomLast()
            if (obj[last]) {
                obj[last]++
                if (obj[last] > n) {
                    n = obj[last]
                }
            } else {
                obj[last] = 1
            }
        }
        return 0.1 / n * 100
    }


})