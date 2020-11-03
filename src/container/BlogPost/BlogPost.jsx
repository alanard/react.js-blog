import React, { Component } from 'react'
import Post from '../../component/Post/Post'
import './BlogPost.css'
import axios from 'axios'

export default class BlogPost extends Component {
  state = {
    post: [],
    formInput: {
      userId : 1,
      id : 1,
      title : '',
      body : ''
    },
    // ? state ini berfungsi untuk menginisialisasi, apakah update yang akan dilakukan atau add
    isUpdate: false
  }
  
  // TODO GET
  // ? Mengget data menggunakan axios
  getPostApi = () => {
    // ? query untuk sort dan order di json server _sort=(by)&_order=(by)
    axios.get('http://localhost:3004/posts?_sort=id&_order=desc')
      .then((res) => {
        // console.log(res.data)
        this.setState({
          // ? Mengisi nilai di post yang kosong dengan data dari api
          post: res.data
        })
      }).catch((err) => {
        console.log(err)

      })
  }

  // TODO POST
  // ! Cara untuk mendapatkan dan merubah state dengan value dari form yang kita kirimkan 
  handleFormChange = (event) => {
    // ? Inisialisasi dengan menduplikat state yang ingin dirubah menggunakan spread operator
    let formInputNew = {...this.state.formInput}
    // ? Membuat angka acak, digunakan untuk id agar random
    let timestamp = new Date().getTime();
    if (!this.state.isUpdate) {
      formInputNew['id'] = timestamp
    }
    // ? Kemudian menargetkan sesuai dengan nama dari form input dan state harus sama
    formInputNew[event.target.name] = event.target.value
    // ? Barulah dilakukan perubahan state dimana state lama di isi dengan nilai state baru yang mengambil data dari value yang diinputkan melalui form
    this.setState({
      formInput : formInputNew
    },()=> {
      // Callback untuk mengecek perubahan state secara live
      // console.log('value obj formInput', this.state.formInput);
    })
  }
  postDataToApi = () => {
    axios.post('http://localhost:3004/posts', this.state.formInput).then((res) => {
      console.log(res);
      // ? memanggil method getPostApi() agar data baru dapat dirender langsung
      this.getPostApi()
      this.setState({
        formInput: {
          userId : 1,
          id : 1,
          title : '',
          body : ''
        }
      })
    },(err)=>{
      console.log(err);
    })
  }

  // TODO Update
  handleUpdate = (data) => {
    console.log(data);
    this.setState({
      formInput : data
    })
  }
  putDataToApi = () => {
    // Menambahkan parameter state yang sudah kita rubah
    axios.put('http://localhost:3004/posts/' + this.state.formInput.id, this.state.formInput).then((res)=> {
      console.log(res);
      // Memanggil agar di render secara realtime
      this.getPostApi()
      this.setState({
        isUpdate : false,
        formInput: {
          userId : 1,
          id : 1,
          title : '',
          body : ''
        }
      })
    },(err) => {
      console.log(err);
    })
  }

  // TODO DELETE
  handleRemove = (data) => {
    console.log(data)
    axios.delete('http://localhost:3004/posts/' + data)
      .then((res) => {
        // console.log(res)

        // Setelah data dihapus page akan mereload dan mengget data terbaru dari api
        this.getPostApi()

      }).catch((err) => {
        console.log(err)
      })
  }

  // TODO HANDLE SUBMIT memiliki dua fungsi yaitu add data dan update data
  handleSubmit = () => {
    if (this.state.isUpdate) {
      this.putDataToApi()
    } else {
      this.postDataToApi()
    }
  }

  // TODO Mounting data
  componentDidMount() {
    this.getPostApi()

  }
  render() {
    return (
      <div>
        {/* This is a title */}
        <h1 className="text-center mt-4 mb-4">Blog Post</h1>
        <div className="row">
          <div className="col-md-5 m-auto">
            <div className="card shadow">
              <div className="text-title"><h4>Title</h4></div>
              {/* Default value nya diisi dengan menggunakan state yang nantinya berfungsi ketika update, maka value nya akan muncul */}
              <input type="text" name="title" value={this.state.formInput.title} className="input-title form-control p-3" placeholder="add Title" onChange={this.handleFormChange}/>
              <div className="text-title"><h4>Body Content</h4></div>
              <textarea name="body" value={this.state.formInput.body} className="input-desc p-3" placeholder="Add Body Content" onChange={this.handleFormChange}></textarea>
              <button className="btn btn-success m-4" onClick={this.handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
        {/* This is a content */}
        {
          this.state.post.map(post => {
            return <Post key={post.id} data={post} remove={this.handleRemove} update={this.handleUpdate} />
          })
        }
      </div>
    )
  }
}
