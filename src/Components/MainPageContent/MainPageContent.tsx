import React from 'react'
import './mainPageContent.css'
import Grid from '@material-ui/core/Grid';
import img from '../../assets/img/mainPageImg.jpg'
import img1 from '../../assets/img/MainPageImg1.jpg'
import img2 from '../../assets/img/MainPageImg2.jpg'
import img3 from '../../assets/img/mainPageImg3.jpg'


function MainPageContent(props:any){
  const {text, mainTitle} = props
  return(
      <Grid container className='mainPageContent-wrapper'>
        <Grid item xs={4}>
          <Grid item xs={12}>
            <div className='wrapperImg'>
              <img src={img} alt='img'/>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className='wrapperImg'>
              <img src={img1} alt='img'/>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <h2 style={{textAlign: 'center', marginTop: 0}}>{mainTitle}</h2>
          {text}
        </Grid>
        <Grid item xs={4}>
          <Grid item xs={12}>
            <div className='wrapperImg'>
              <img src={img2} alt='img'/>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className='wrapperImg'>
              <img src={img3} alt='img'/>
            </div>
          </Grid>
        </Grid>
      </Grid>
  )
}

export default MainPageContent;