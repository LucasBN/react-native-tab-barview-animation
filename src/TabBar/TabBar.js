import React, {Component, Transitioner} from 'react';
import {Platform, StyleSheet, Text, View, Button, Dimensions, TouchableOpacity, Animated, ScrollView} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';

export default class customTabNavScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      indexVisible: 0,
      opacity: new Animated.Value(1),
    };
  };

  _onRef(ref) {
    this._ref = ref;
  }

  handleClick = (index) => {
    switch (this.props.transitionConfig.transition) {
      case 'snap':
        if (this.state.indexVisible != index) {
          this.setState({indexVisible: index})
        }
        break;
      case 'fade':
        Animated.timing(this.state.opacity, {
          toValue: 0,
          duration: 500
        }).start(() => {
          this.setState({indexVisible: index}, () => {
            Animated.timing(this.state.opacity, {
              toValue: 1,
              duration: 500
            }).start()
          })
        })
        break;
      case 'slide':
        if (this.state.indexVisible != index) {
          this._ref.scrollTo({x: Dimensions.get('window').width*(index), y: 0, animated: true});
          this.setState({indexVisible: index})
        }
        break;
      default:
        if (this.state.indexVisible != index) {
          this.setState({indexVisible: index})
        }
        break;
    }
  }

  render() {

    const renderViews = this.props.views.map((view, index) => {

      var visible = false;

      if (index == this.state.indexVisible) {
        visible = true;
      }

      if (this.props.transitionConfig.transition == 'snap' || this.props.transitionConfig.transition == 'fade') {
        return (
          <Animated.View key={index} style={{backgroundColor: '#ffffff00', height: '100%', width: '100%', zIndex: 1, opacity: visible ? this.state.opacity : 0, position: 'absolute'}}>
            {view}
          </Animated.View>
        )
      }
      if (this.props.transitionConfig.transition == 'slide') {
        return (
          <Animated.View key={index} style={{backgroundColor: '#ffffff00', height: '100%', width: Dimensions.get('window').width}}>
            {view}
          </Animated.View>
        )
      }

    })

    const renderTabButtons = this.props.iconConfig.labels.map((data, index) => {

      var visible = false;

      if (index == this.state.indexVisible) {
        visible = true;
      }

      if (this.props.transitionConfig.transition == 'snap' || this.props.transitionConfig.transition == 'fade') {
        return (
          <TouchableOpacity activeOpacity={1} onPress={() => this.handleClick(index)} key={data} style={[{backgroundColor: '#ffffff00', borderTopColor: 'black', borderTopWidth: 0, width: `${100/this.props.iconConfig.labels.length}%`, height: '100%', alignItems: 'center'}]}>
            <Icon style={[{color: visible ? this.props.iconConfig.activeColor : this.props.iconConfig.inactiveColor, marginTop: this.props.iconConfig.labelVisible ? 10 : 15}]} size={25} name={this.props.iconConfig.icons[index]}/>
            {this.props.iconConfig.labelVisible && <Text>{this.props.iconConfig.labels[index]}</Text>}
          </TouchableOpacity>
        );
      }

      if (this.props.transitionConfig.transition == 'slide') {
        return (
          <TouchableOpacity onPress={() => this.handleClick(index)} key={data} style={{backgroundColor: '#fff', borderTopColor: 'black', borderTopWidth: 0, width: `${100/this.props.iconConfig.labels.length}%`, height: '100%', alignItems: 'center'}}>
            <Icon style={[{color: visible ? this.props.iconConfig.activeColor : this.props.iconConfig.inactiveColor, marginTop: this.props.iconConfig.labelVisible ? 10 : 15}]} size={25} name={this.props.iconConfig.icons[index]}/>
            {this.props.iconConfig.labelVisible && <Text>{this.props.iconConfig.labels[index]}</Text>}
          </TouchableOpacity>
        );
      }

    })

    return (

      <View style={styles.container}>

        {!(this.props.transitionConfig.transition == 'slide') && <View style={{position: 'absolute', height: '93%', width: '100%', zIndex: 0}}>
          {renderViews}
        </View>}

        {(this.props.transitionConfig.transition == 'slide') && <View style={{position: 'absolute', height: '93%', width: '100%', zIndex: 0}}>

          <ScrollView ref={ref => this._onRef(ref)} horizontal={true} style={{width: Dimensions.get('window').width}} pagingEnabled={true} scrollEnabled={false}>
            {renderViews}
          </ScrollView>

        </View>}

        <View style={[{flexDirection: 'row', opacity: 1, zIndex: 3, position: 'absolute', width: '100%', height: this.props.titleVisible ? '8.5%' : '7%', bottom: 0, backgroundColor: 'white'}, this.props.style]}>
          {renderTabButtons}
        </View>

      </View>

    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    opacity: 1
  }
});
