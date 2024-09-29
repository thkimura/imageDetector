// Set the  number of tags to display per page
const tagsPerPage = 20

//Event listener for the upload button
document.getElementById('uploaldButton').addEventListener('click', async() => {

  //Elements  and file handling
  const fileInput = document.getElementById('imageInput')
  const file = fileInput = fileInput.files[0]
  const imagePreview = document.getElementById('imagePreview')
  const uploadModal = document.getElementById('uploadModal')
  const uploadProgress = document.getElementById('uploadProgress')

  //If no file is selected, show a toast message
  if(!file) return showToast('Please select an image file first.')

  //Preview the selected image 
  const reader = new FileReader()
  reader.onload = e => imagePreview.src = e.target.result
  reader.readAsDataURL(file)

  //Imagga API credencials
  const apiKey = ''
  const apiSecret = ''
  const authHeader = 'Basic ' + btoa(`${apiKey}:${apiSecret}`)

  //Prepare data for upload
  const formData = new FormData()
  formData.append('image', file)

  try {
    //Show upload modal and reset  progress bar
    uploadModal.style.display = 'block'
    uploadProgress.style.width = '0%'

    //Upload image to Imagga
    const uploadResponse = await fetch('https://api.imagga.com/v2/uploads', {
      method: 'POST',
      headers: { 'Authorization': authHeader},
      body: formData,
    })

    if(!uploadResponse.ok)throw new Error ('Upload failed.')
    
    // Track upload progress
    const contentLength = +uploadResponse.headers.get('Content-Length')
    const reader = uploadResponse.body.getReader()
    let receivedLength = 0 
    let chunks = []

    //Read response stream adn update progress
    while(true) {
      const {done, value} = await reader.read()
      if(done) break
      chunks.push(value)
      receivedLength += value.length
      uploadProgress.style.width = `${(receivedLength / contentLength) * 100}%`
    }

    //Decade and parse upload response 
    const responseArray = new Uint8Array(receivedLength)
    let position = 0;
    for (const chunk of chunks){
      responseArray.set(chunk)
    }
    const text = new TextDEcoder('utf-8').decode(responseArray)
    const {result}
  }

})
