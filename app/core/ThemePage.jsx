import React, { memo, useState, useEffect, useCallback } from 'react';

import { 
  Card, 
  CardActions, 
  CardText,
  CardTitle,
  Tab,
  Tabs,
  FlatButton,
  FontIcon,
  RaisedButton,
  TextField,
  Grid, 
  Divider, 
  Paper
} from '@material-ui/core';
import { get, has } from 'lodash';

import { Col, Row } from 'react-bootstrap';

import { Image } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

// import OpacitySlider from '/imports/ui/components/OpacitySlider';


import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';

import { withStyles } from '@material-ui/core/styles';

let defaultState = { index: 0 };
Session.setDefault('themePageState', defaultState);


const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    display: 'flex',
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});


export class ThemePageOld extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      state: defaultState,
      colors: {
        colorA: '',
        colorB: '',
        colorC: '',
        colorD: '',
        colorE: '',
        colorF: ''
      }
    };

    if (Session.get('themePageState')) {
      data.state = Session.get('themePageState');
    }

    return data;
  }
  resetTheme(){
    console.log('reset theme...')
    var resetString = '';
    if(has(Meteor.settings, 'public.theme.backgroundImagePath')){
      resetString = get(Meteor.settings, 'public.theme.backgroundImagePath'); 
    }
    Meteor.users.update({_id: Meteor.userId()}, {$set: {
      'profile.theme.backgroundImagePath': resetString
    }});
  }
  render(){
    var backgroundThumbnail = {
      width: '100%',
      display: 'inline-block',
      marginRight: '0px',
      marginBottom: '0px',
      height: '115px',
      objectFit: 'cover'      
    };

    // deep clone
    var redTile = JSON.parse(JSON.stringify(backgroundThumbnail));
    redTile.background = '#A64C4C';

    var blueTile = JSON.parse(JSON.stringify(backgroundThumbnail));
    blueTile.background = '#89cff0';

    var grayTile = JSON.parse(JSON.stringify(backgroundThumbnail));
    grayTile.background = '#999999';

    var greenTile = JSON.parse(JSON.stringify(backgroundThumbnail));
    greenTile.background = '#AEC9A8';

    var purpleTile = JSON.parse(JSON.stringify(backgroundThumbnail));
    purpleTile.background = 'lavender';

    var orangeTile = JSON.parse(JSON.stringify(backgroundThumbnail));
    orangeTile.background = 'peachpuff';

    var goldenrodTile = JSON.parse(JSON.stringify(backgroundThumbnail));
    goldenrodTile.background = 'goldenrod';


    var blackTile = JSON.parse(JSON.stringify(backgroundThumbnail));
    blackTile.background = '#000000';

    var charcoalTile = JSON.parse(JSON.stringify(backgroundThumbnail));
    charcoalTile.background = '#222222';

    var grayTile = JSON.parse(JSON.stringify(backgroundThumbnail));
    grayTile.background = '#999999';

    var smokeTile = JSON.parse(JSON.stringify(backgroundThumbnail));
    smokeTile.background = '#dddddd';


    var eggshellTile = JSON.parse(JSON.stringify(backgroundThumbnail));
    eggshellTile.background = '#eeeeee';



    var whiteTile = JSON.parse(JSON.stringify(backgroundThumbnail));
    whiteTile.background = '#FFFFFF';


    // Pick up any dynamic routes that are specified in packages, and include them
    var themingAssets = [];
    Object.keys(Package).forEach(function(packageName){
      if(Package[packageName].ThemingAssets){
        // we try to build up a route from what's specified in the package
        
        Package[packageName].ThemingAssets.forEach(function(asset){
          
          themingAssets.push(asset);      
        });    
      }
    });

    var controlPaneStyle = {}
    if(['iPhone'].includes(window.navigator.platform)){
      controlPaneStyle.display = 'none';
    }     

    return(
      <div id='aboutPage'>
        <div>
          <Row>
            <Col md={3} style={controlPaneStyle}>
              <Card>
                <CardTitle
                  title='Theme'
                  subtitle='Pick a background and color!'
                />                
                <CardText>
                  <TextField
                    ref='colorA'
                    name='colorA'
                    type='text'
                    floatingLabelText='Color A'
                    floatingLabelFixed={true}
                    value={this.data.colors.colorA}
                    disabled={true}
                    /><br/>
                  <TextField
                    ref='colorB'
                    name='colorB'
                    type='text'
                    floatingLabelText='Color B'
                    floatingLabelFixed={true}
                    value={this.data.colors.colorB}
                    disabled={true}
                    /><br/>
                  <TextField
                    ref='colorC'
                    name='colorC'
                    type='text'
                    floatingLabelText='Color C'
                    floatingLabelFixed={true}
                    value={this.data.colors.colorC}
                    disabled={true}
                    /><br/>
                  <TextField
                    ref='colorD'
                    name='colorD'
                    type='text'
                    floatingLabelText='Color D'
                    floatingLabelFixed={true}
                    value={this.data.colors.colorD}
                    disabled={true}
                    /><br/>
                  <TextField
                    ref='colorE'
                    name='colorE'
                    type='text'
                    floatingLabelText='Color E'
                    floatingLabelFixed={true}
                    value={this.data.colors.colorE}
                    disabled={true}
                    /><br/>
                  <TextField
                    ref='colorF'
                    name='colorF'
                    type='text'
                    floatingLabelText='Color F'
                    floatingLabelFixed={true}
                    value={this.data.colors.colorF}
                    disabled={true}
                    /><br/>

                </CardText>
              </Card>
              <Divider />

              <Card>
                <CardTitle
                  title='Opacity'
                />                
                {/* <OpacitySlider /> */}
              </Card>
              <Divider />
                {/* <RaisedButton
                  id='darkroomButton'
                  primary={false}
                  fullWidth
                  icon={<FontIcon className="muidocs-icon-image-exposure" />}
                  onClick={this.clickOnDarkroomButton}
                  disabled={true}
                  style={{backgroundColor: '#dddddd'}}>
                    Darkroom 
                </RaisedButton> */}
              <Divider />
              {/* <RaisedButton 
                id='resetTheme'                     
                disabled={true}
                primary={false} 
                onClick={this.resetTheme} 
                fullWidth> Reset Theme </RaisedButton> */}
              <Divider />
              <Divider />

            </Col>
            <Col md={9} >
              {/* <Card>
                <CardTitle
                  title='Theme'
                  subtitle='Pick a background and color!'
                />
                  <CardText>

                    </CardText>
              </Card> */}
              <Row id='backgroundImageGallary' >

                { themingAssets.map(asset => <Col md={2} key={asset.name}>
                    <Card style={{marginBottom: '20px'}} >
                      <Image name={asset.name} src={asset.src} style={backgroundThumbnail} responsive onClick={this.onImageClick.bind(this, asset.src)} />
                      {/* <Image responsive style={purpleTile} onClick={this.onColorClick} /> */}
                    </Card>
                  </Col>)}

              </Row>
              <Divider />

              <Row>
                <Col md={2}>
                  <Card>
                    <Image responsive style={purpleTile} onClick={this.onColorClick} />
                  </Card>
                </Col>
                <Col md={2}>
                  <Card>
                    <Image responsive style={orangeTile} onClick={this.onColorClick} />
                  </Card>
                </Col>
                <Col md={2}>
                  <Card>
                    <Image responsive style={redTile} onClick={this.onColorClick} />
                  </Card>
                </Col>
                <Col md={2}>
                  <Card>
                    <Image responsive style={greenTile} onClick={this.onColorClick} />
                  </Card>
                </Col>
                <Col md={2}>
                  <Card>
                    <Image responsive style={blueTile} onClick={this.onColorClick} />
                  </Card>
                </Col>
                <Col md={2}>
                  <Card>
                    <Image responsive style={goldenrodTile} onClick={this.onColorClick} />
                  </Card>
                </Col>
              </Row>
              <Divider />



              <Row>
                <Col md={2}>
                  <Card>
                    <Image responsive style={whiteTile} onClick={this.onColorClick} />
                  </Card>
                </Col>
                <Col md={2}>
                  <Card>
                    <Image responsive style={eggshellTile} onClick={this.onColorClick} />                    
                  </Card>
                </Col>
                <Col md={2}>
                  <Card>
                    <Image responsive style={smokeTile} onClick={this.onColorClick} />                    
                  </Card>
                </Col>
                <Col md={2}>
                  <Card>
                    <Image responsive style={grayTile} onClick={this.onColorClick} />                    
                  </Card>
                </Col>
                <Col md={2}>
                  <Card>
                    <Image responsive style={charcoalTile} onClick={this.onColorClick} />                    
                  </Card>
                </Col>
                <Col md={2}>
                  <Card>
                    <Image responsive style={blackTile} onClick={this.onColorClick} />                    
                  </Card>
                </Col>
              </Row>


            </Col>
          </Row>
        </div>
      </div>
    );
  }
  handleTabChange(index) {
    var state = Session.get('themePageState');
    state.index = index;
    Session.set('themePageState', state);
  }

  handleActive() {
    //console.log('Special one activated');
  }

  onColorClick(event){
    Session.set('backgroundImagePath', false);
    Session.set('backgroundColor', event.currentTarget.style['background-color']);

    // setUserTheme.call({
    //   _id:  Meteor.userId(),
    //   backgroundColor: event.currentTarget.style['background-color']
    // }, (error) => {
    //   if (error) {
    //     Bert.alert(error.reason, 'danger');
    //   } else {
    //     Bert.alert('Background color updated!', 'success');
    //   }
    // });
  }

  onImageClick(path, event){
    console.log('onImageClick', path, event)
    if(!path){
      path = 'backgrounds/medical/' + event.currentTarget['src'].split('/')[5];
    }

    Session.set('backgroundColor', false);
    Session.set('backgroundImagePath', path);

    // setUserTheme.call({
    //   _id:  Meteor.userId(),
    //   backgroundImagePath: path
    // }, (error) => {
    //   if (error) {
    //     Bert.alert(error.reason, 'danger');
    //   } else {
    //     Bert.alert('Background image updated!', 'success');
    //   }
    // });
  }

  onVideoClick(){
    //console.log("onVideoClick");

    Session.set('backgroundImagePath', false);
    Session.set('backgroundColor', false);
    Session.set('lastVideoRun', new Date());

    // // we're calling setUserTheme without any parameters, which will reset the theme
    // // and use the default video background
    // setUserTheme.call({
    //   _id:  Meteor.userId()
    // }, (error) => {
    //   if (error) {
    //     Bert.alert(error.reason, 'danger');
    //   } else {
    //     Bert.alert('Background image updated!', 'success');
    //   }
    // });
  }

  clickOnDarkroomButton(){
    Session.toggle('darkroomEnabled');
  }
}


ReactMixin(ThemePageOld.prototype, ReactMeteorData);

function ThemePage(props){
  console.log('ThemePage.props', props);

  // const [drawerIsOpen, setDrawerIsOpen] = useState(false);


  // function handleDrawerOpen(){
  //   console.log('handleDrawerOpen')
  //   setDrawerIsOpen(true);
  // };
  
  return(
    <div id='themePage' style={{ left: '0px', paddingLeft: '73px', paddingRight: '73px', width: window.innerWidth - 146, height: window.innerHeight }}>
      <Grid container direction="row" justify="space-evenly" alignItems="stretch" className={ props.classes.root}  spacing={24} >
          <Grid key='left' item md={4} >
            <Paper className={ props.classes.paper} />
          </Grid>
          <Grid key='middle' item md={4} >
            <Paper className={ props.classes.paper} />
          </Grid>
          <Grid key='right' item md={4} >
            <Paper className={ props.classes.paper} />
          </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(ThemePage);