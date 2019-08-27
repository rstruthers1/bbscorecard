import React, { Component } from 'react';
import axios from 'axios';

class Uploader extends Component {

  handleUploadFile = (e) => {
    const files = Array.from(e.target.files);
    if (!files || files.length === 0) {
      alert("No files!");
      return;
    }
    const formData = new FormData();
    formData.append('foo', files[0]);
    axios.post('/api/csv', formData).then((response) => {
      console.log("uploaded")
    })
  }

  render() {
    return(
        <div>
          <h1>Upload a file</h1>
          <div>
            <input type="file" onChange={this.handleUploadFile} />
          </div>
        </div>
    )
  }
}

export default Uploader
