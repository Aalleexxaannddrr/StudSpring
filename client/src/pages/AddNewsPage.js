import React, { useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useHistory } from 'react-router-dom'
import { Loader } from '../components/Loader'

export const AddNewsPage = () => {

    const history = useHistory()
    const [title, setTitle] = useState('')
    const [img, setImg] = useState('')
    const [content, setContent] = useState('')
    const { loading, request } = useHttp()

    const pressHandler = async () => {
        try {
            const date = new Date()
            console.log(title, date, content, img)
            await request('/api/news/add', 'POST', { title: title, img: img, date: date, content: content})
            history.push('/news')
        } catch (e) { }
    }
    
    if (loading) {
        return <Loader />
    }

    const enableCheck = (title, img, content) => {
        if (title && img && content && !loading) {
            return (false)
        } else {
            return (true)
        }
    }

    const selectFile = (e) => {
        var file = e.target.files[0]
        var reader = new FileReader()
        reader.onloadend = function () {
            setImg(reader.result)
        }
        reader.readAsDataURL(file)
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
                <div className="register-input-field">
                    <h4>Добавление новости</h4>
                    <b>Заголовок</b>
                    <input
                        placeholder="Заголовок"
                        id="name"
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <p>Изображение к новости</p>
                    <input
                        id="file"
                        type="file"
                        onChange={selectFile}
                        accept=".jpg, .png"
                    />
                    <p></p>
                    {img && <img className="news-image" src={img} alt="pricol"/>}
                    <p>Описание</p>
                    <textarea
                        placeholder="Описание"
                        id="textarea1"
                        className="materialize-textarea"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                </div>
                <button className="waves-effect waves-light btn" onClick={pressHandler} disabled={enableCheck(title, img, content)}>Опубликовать</button>
            </div>
        </div>
    )
}