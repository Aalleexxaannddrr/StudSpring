import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Link } from 'react-router-dom'
import { Loader } from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import Moment from 'moment'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

export const ChangeNewsPage = () => {
     
  const { request } = useHttp()
  const id = useParams().id
  const [news, setNews] = useState('')
  const [title, setTitle] = useState('')
  const [img, setImg] = useState('')
  const [content, setContent] = useState('')

  const getNews = useCallback(async () => {
    try {
      const fetched = await request(`/api/news/${id}`, 'GET', null)
      setNews(fetched)
      setTitle(news.title)
      setImg(news.img)
      setContent(news.content)
    } catch (e) { }
  }, [id, request])

  useEffect(() => {
    getNews()
  }, [getNews])

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
              <h4>Изменение новости</h4>
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
          {/* <button className="waves-effect waves-light btn" onClick={pressHandler} disabled={enableCheck(title, img, content)}>Опубликовать</button> */}
      </div>
    </div>
  )
}