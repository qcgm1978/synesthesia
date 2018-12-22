$(() => {
    $.getJSON('./color.json', data => {
        $('button').on('click', () => {
            const textarea = $('textarea')
            const text = textarea.val()
            const arr = text.split('')
            const newStr = arr.reduce((accumulator, item) => {
                if (/\w/.test(item)) {
                    const color = data[item.toUpperCase()].split(',').reduce((accu, it) => {
                        const arr = it.split('=')
                        accu[arr[0].trim()] = arr[1].trim()
                        return accu
                    }, {})
                    const rgb = `${color['red']}%,${color['green']}%,${color['blue']}%`
                    return accumulator + `<span style='color:rgb(${rgb});'>${item}</span>`
                } else {
                    return accumulator + item
                }
            }, '')
            $('p').html(newStr)
        })
    })


})