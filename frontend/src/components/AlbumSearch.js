import React from "react"
//import PropTypes from "prop-types"
//import classNames from "classnames"
//import "../scss/album_search.scss"
import {
  //AppBar,
  Button,
  //CameraIcon,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  //FormGroup,
  //FormControl,
  Grid,
  //InputLabel,
  //Input,
  //Toolbar,
  Typography,
  //styles,
} from "@material-ui/core"

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const AlbumSearch = () => {
  //function AlbumSearch(props) {
  //const { classes } = props

  return (
    <React.Fragment>
      <CssBaseline />

      <div className="classes.heroUnit">
        <div className="classes.heroContent">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Album layout
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            paragraph
          >
            Something short and leading about the collection below—its contents,
            the creator, etc. Make it short and sweet, but not too short so
            folks don&apos;t simply skip over it entirely.
          </Typography>
          <div className="classes.heroButtons">
            <Grid container spacing={16} justify="center">
              <Grid item>
                <Button variant="contained" color="primary">
                  Main call to action
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary">
                  Secondary action
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      <div className="classNames(classes.layout, classes.cardGrid)">
        {/* End hero unit */}
        <Grid container spacing="40">
          {cards.map(card => (
            <Grid item key="card" sm="6" md="4" lg="3">
              <Card className="classes.card">
                <CardMedia
                  className="classes.cardMedia"
                  image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                  title="Image title"
                />
                <CardContent className="classes.cardContent">
                  <Typography gutterBottom variant="h5" component="h2">
                    Heading {card}
                  </Typography>
                  <Typography>
                    This is a media card. You can use this section to describe
                    the content.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View
                  </Button>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      {/* End footer */}
      <footer className="classes.footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </footer>
    </React.Fragment>
  )
}

export default AlbumSearch
