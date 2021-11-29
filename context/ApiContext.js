import React, { createContext, useState, useEffect,useReducer } from 'react'
import axios from 'axios'
import { googleApiKey, googleCx } from '@env';
import bookListReducer from './bookListReducer'
import { Interstitial } from "../components/adsFunc"
import  * as SQLite from 'expo-sqlite'

export const ApiContext = createContext()

const ApiContextProvider = (props) => {
    
    const [searchWord, setSearchword] = useState("");
    const [bookList, setBookList] = useState([])
    const [newBookList, bookListDispatch] = useReducer(bookListReducer,bookList)
    const [bookResult, setBookResult] = useState()
    const [bookResultScreen, setBookResultScreen] = useState("none")
    const [showIntroModel, setShowIntroModel] = useState()
    const [database, setDatabase] = useState(SQLite.openDatabase('db'))

    useEffect(() => {
        database.transaction(tx => {
          tx.executeSql(
              `select showIntroModel from user`,
              [],
              (_, { rows }) => {
                  if (typeof rows._array[0].showIntroModel !== 'undefined') {
                    setShowIntroModel(rows._array[0].showIntroModel)
                  } else {
                    setShowIntroModel(1)
                  }
                  console.log(rows._array[0].showIntroModel)

              },
              () => {
                setShowIntroModel(1)
                console.log('showIntroModel from table is not exist')
              }
          )
          tx.executeSql(
            `select * from bookList`,
            [],
            (_, { rows }) => {
                const data = rows._array
                setBookList(data)
                    bookListDispatch({ type: 'fetchdata', data: data })
                
            },
            () => {
                tx.executeSql(
                `create table if not exists bookList (id integer primary key not null, title text, img text, read int, done bit)`,
                    [],
                    () => {
                        console.log('database create success')
                            setBookList([])
                        
                    },
                    () => { console.log('database create missed') }
                )
            }
        )
        })
      },[])

    const initDatabase = () => {
        database.transaction(tx => {
            tx.executeSql(
                `delete from bookList`,
                [],
                setBookList([]),
                () => {
                    console.log('initdatabase bookList failed')
                }
            )
        })
        console.log('initdatabase')
        database.transaction(tx => {
            tx.executeSql(
                `delete from user`,
                [],
                setShowIntroModel(true),
                () => {
                    console.log('initdatabase user failed')
                }
            )
        })
        
    }

    const finIntroModal = () => {
        database.transaction(tx => {
            tx.executeSql(
            `create table if not exists user (showIntroModel bit)`,
                [],
                () => {
                    console.log('database create success')
                    setShowIntroModel(0)
                    tx.executeSql(
                        `insert into user (showIntroModel) values (0)`,
                        [],
                        () => { console.log('showintromodel insert') },
                        () => { console.log('showintromodel insert failed')},
                    )
                },
                () => { console.log('database create missed') }
            )
            
        })
    }



    const getBookImage = async (word, num) => {
        await Interstitial()
        const url = "https://www.googleapis.com/customsearch/v1"
        const params = {
            key: googleApiKey,
            cx: googleCx,
            imgColorType: 'color',
            searchType: 'image',
            num: 1,
            exactTerms: word + "+" + num + '巻',
            q: word + '+' + num + '巻' + '+漫画+表紙' + '+site:amazon.co.jp',
        }
        const li = await axios.get(url, { params: params }).then(res => {
            return({img: res.data.items[0].link, noimage: false })
        }).catch((e) => {
            return({img: "https://1.bp.blogspot.com/-7DsADfq2BX4/Xlyf7aSybcI/AAAAAAABXq8/ut72jfLtCuo8ZvRGp1kqCYEbeQ0dOR8pgCNcBGAsYHQ/s400/no_image_tate.jpg", noimage: true })
        })
        return(li)
    }

    const getBookData = async () => {
        await getBookImage(searchWord, 1).then(result => {
            const img = result.img
            const id = bookList.length
            setBookResult(prevState => {
                return ({ ...prevState, id: id, title: searchWord, img: img, read: 1, done: false })
            })
            setBookResultScreen("result")
        })
    }


    const addBook = () => {
        bookListDispatch({ type: 'add_book', book: bookResult, database: database })
        setBookResultScreen("none")
    }

    return (
        <ApiContext.Provider value={{
            searchWord,
            setSearchword,
            bookList,
            getBookData,
            bookResult,
            bookResultScreen,
            addBook,
            getBookImage,
            setBookList,
            newBookList,
            bookListDispatch,
            showIntroModel,
            setShowIntroModel,
            setBookResultScreen,
            database,
            finIntroModal,
            initDatabase
        }}>
            {props.children}
        </ApiContext.Provider>
    )
}

export default ApiContextProvider