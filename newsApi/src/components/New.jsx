import React from 'react'
import {Card,CardActions,CardContent,CardMedia,Link,Typography,Grid} from '@mui/material'

export const New = ({aNew}) => {

    const {urlToImage, url, title, description, source} = aNew

  return (
    <Grid item md={6} lg={4}>
        <Card>
            {urlToImage && (<CardMedia height={'250'} component={'img'} alt={'imgNew ${title}'} image={urlToImage}/>)}
            <CardContent>
                <Typography variant='body1' color='error'>
                    {source.name}
                </Typography>

                <Typography variant='h5' component='div'>
                    {title}
                </Typography>

                <Typography variant='body2'>
                    {description}
                </Typography>
            </CardContent>

            <CardActions>
                <Link href={url} variant='button' width={'100%'} textAlign='center' target='_blank'>Leer Noticia</Link>
            </CardActions>
        </Card>
    </Grid>
  )
}
