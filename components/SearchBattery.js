import React, { Component, PureComponent } from 'react'
import { SearchBar } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';

export default class SearchBattery extends PureComponent {
    state = {
        search: '',
        code: '',
        visible: false
      };
      onToggleSnackBar = () => this.setState({visible: !this.state.visible});

      onDismissSnackBar = () => this.setState({visible: false});
      
      componentDidMount(){
        console.log(this.state.code)

      }

      _find(text){
        this.setState({code: text})
        this.componentDidMount
      }

      updateSearch = search => {
        this.setState({ search })
        //if(search.toUpperCase().includes('HB366481ECW')) alert('okay')
        if(search.toLowerCase().includes('p10 plus') || search.toLowerCase().includes('p10 ')){
          this._find('HB366481ECW')
          this.onToggleSnackBar
        } 
      }
      render() {
        const { search } = this.state;
    
        return (
          <View style={styles.container}>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={search}
          />
          <Snackbar
          visible= {this.state.visible}
          onDismiss={this.onDismissSnackBar}
          >{this.state.code}</Snackbar>
          </View>
        );
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
