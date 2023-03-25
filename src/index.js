import React, { useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import Cropper from 'react-easy-crop'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import getCroppedImg from './cropImage'
import { styles } from './styles'

const dogImg =
  'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000'

const Demo = ({ classes }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)



  const [uploadImg, setUploadImg] = useState([]);

  const HandlesetUploadImg = (e) => {
   
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0])
    reader.onloadend = () => { 
      setUploadImg(reader.result)
    }
  }

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        uploadImg,
        croppedAreaPixels,
      )
      console.log('donee', { croppedImage })
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels])

  const onClose = useCallback(() => {
    setCroppedImage(null)
  }, [])

  return (
    <div>
      <input type="file" onChange={HandlesetUploadImg} />
      <div className={classes.cropContainer}  >
        
        <Cropper
          image={uploadImg}
          crop={crop}
          aspect={16 / 9}
          onCropChange={setCrop}
          
          onCropComplete={onCropComplete}
        />
      </div>
      <div className={classes.controls}>
        <Button
          onClick={showCroppedImage}
          variant="contained"
          color="primary"
          classes={{ root: classes.cropButton }}
        >
          Show Result
        </Button>
      </div>
      <img src={croppedImage} onClose={onClose}  style={{width:'400px', height:'225px'}}/>
    </div>
  )
}

const StyledDemo = withStyles(styles)(Demo)

const rootElement = document.getElementById('root')
ReactDOM.render(<StyledDemo />, rootElement)
