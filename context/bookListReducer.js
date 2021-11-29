const bookListReducer = (state, action) => {
    
    const list = state.slice()
    const index = list.findIndex((item) => item.id == action.id)
    
    const changeDb = (columnName, val, id) => {
        action.database.transaction(tx => {
            tx.executeSql(
                `UPDATE bookList SET ` + columnName + `=? where id=?`,
                [val, id],
                () => console.log('changedatabase'),
                () => console.log('error')
                
            )
        })
    }


    switch (action.type) {
        case ('fetchdata'):
            return(action.data)
        case ('add_book'):
            console.log(action.database)
            action.database.transaction(tx => {
                tx.executeSql(
                    `insert into bookList (id, title, img, read, done) values(?,?,?,?,?)`,
                    [action.book.id,action.book.title, action.book.img, action.book.read, action.book.done]
                )
            })
            return [...state, action.book]
        case ('add_read'):
            list[index].read++
            changeDb('read', list[index].read, index)
            return list
        case ('dec_read'):
            if(list[index].read > 1){
                list[index].read--
                changeDb('read', list[index].read, index)
            }
            return list
        case ('changeImage'):
            list[index].img = action.img
            changeDb('img', list[index].img, index)
            return list
        case ('done'):
            list[index].done = true
            changeDb('done', list[index].done, index)
            return list
        default:
            return state
    }
}

export default bookListReducer