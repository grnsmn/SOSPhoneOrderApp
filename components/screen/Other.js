import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View,
  SectionList,
  Text,
  Modal,
  TouchableHighlight,
  Share
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Appbar, Searchbar } from 'react-native-paper'
import ItemOther from '../ItemOther'
import ItemOtherColor from '../ItemOtherColor'
const list = [
  { id: 'uiz', nome: 'IPHONE 5', nMax: 2 },
  { id: 't1b', nome: 'IPHONE 5S', nMax: 2 },
  { id: 'lui', nome: 'IPHONE 6', nMax: 2 },
  { id: 'zfv', nome: 'IPHONE 6S', nMax: 2 },
  { id: 's4o', nome: 'IPHONE 7', nMax: 2 },
  { id: '5wo', nome: 'IPHONE 8', nMax: 2 },
  { id: 'a58', nome: 'IPHONE 6 PLUS', nMax: 2 },
  { id: 'a54', nome: 'IPHONE 6S PLUS', nMax: 2 },
  { id: 'bjy', nome: 'IPHONE 7 PLUS', nMax: 2 },
  { id: 'h5q', nome: 'IPHONE 8 PLUS', nMax: 2 },
  { id: 'mqq', nome: 'IPHONE X', nMax: 2 },
  { id: '5ko', nome: 'IPHONE XR', nMax: 2 }
]
const T_HomeList = [
  { id: 'l2w', nome: 'IPHONE 5S', nMax: 2 },
  { id: 'l8i', nome: 'IPHONE 6', nMax: 2 },
  { id: 'z9q', nome: 'IPHONE 6S', nMax: 2 }
]
const BackoverList = [
  { id: 'ghw', nome: 'IPHONE 8', nMax: 2 },
  { id: 'l65', nome: 'IPHONE X', nMax: 2 },
  { id: 'Y3Z', nome: 'IPHONE XS', nMax: 2 },
  { id: 'Y4Z', nome: 'IPHONE XR', nMax: 2 },
  { id: 'YX0', nome: 'IPHONE XS MAX', nMax: 2 },
  { id: 'S5f', nome: 'IPHONE 8 PLUS', nMax: 2 }
]
const sectionList = [
  {
    title: 'Dock Ricarica',
    data: list
  },
  {
    title: 'Circuito Prossimità',
    data: list
  },
  {
    title: 'T. Home',
    data: T_HomeList
  }
  // {
  //   title: 'Backcover',
  //   data: BackoverList
  // }
]

global.list_other = ''
export default class OtherList extends PureComponent {
  state = {
    modalVisible: false,
    modalVisibleResi: false,
    listFiltered: sectionList,
    searchModel: ''
  }

  setModalVisible = visible => {
    this.setState({ modalVisible: visible })
  }
  search (model) {
    this.setState({
      listFiltered: [
        {
          title: 'Dock Ricarica',
          data: list.filter(elem => elem.nome.includes(model.toUpperCase()))
        },
        {
          title: 'Circuito Prossimità',
          data: list.filter(elem => elem.nome.includes(model.toUpperCase()))
        },
        {
          title: 'T. Home',
          data: T_HomeList.filter(elem => elem.nome.includes(model.toUpperCase()))
        }
      ]
    })
  }
  renderRow = ({ section, item }) =>
    section.title == 'Circuito Prossimità' ||
    section.title == 'Dock Ricarica' ? (
      <ItemOther
        NameItem={item.nome}
        NameSection={section.title}
        nMax={item.nMax}
        id={item.id}
      />
    ) : (
      <ItemOtherColor
        NameItem={item.nome}
        NameSection={section.title}
        nMax={item.nMax}
        id={item.id}
      />
    )
  renderRowColor = ({ item }) => (
    <ItemOtherColor NameItem={item.nome} nMax={item.nMax} id={item.id} />
  )
  componentDidMount () {
    //console.log(JSON.stringify(sectionList) +'\n')
  }
  onShareOther = async () => {
    try {
      // const data = new Date()
      // const tomorrow = new Date(data)
      // tomorrow.setDate(tomorrow.getDate() + 1)
      // if(tomorrow.getDay()==0) {
      //   tomorrow.setDate(tomorrow.getDate() + 1)
      // }
      const result = await Share.share({
        message:
          // 'Ordine del ' +
          // tomorrow.getDate() +
          // '/' +
          // parseInt(tomorrow.getMonth() + 1) +  //BISOGNA EFFETTUARE LA SOMMA PERCHE getMonth restituisce numeri da 0 a 11 in stringa così che corrisponda alla data italiana
          // '/' +
          // tomorrow.getFullYear() +
          // '\n\n' +
          global.list_other
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message)
    }
  }

  stampList () {
    global.list_other = '' //SVUOTA LA LISTA BATTERIA PRIMA DI UN NUOVO CONCATENAMENTO DI AGGIORNAMENTO DELLA LISTA
    global.store_Other.forEach(element => {
      global.list_other +=
        element.n + 'x ' + element.section + ' ' + element.name + '\n'
    })
    this.onShareOther()
  }
  render () {
    return (
      <View style={styles.container}>
        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.')
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                IN ORDINE {'\n\n'}
                {[...global.store_Other.values()]
                  .sort()
                  .map(function (element) {
                    if (
                      element.section == 'Dock Ricarica' ||
                      element.section == 'Circuito Prossimità'
                    )
                      return String(
                        element.n +
                          'x ' +
                          element.section +
                          ' ' +
                          element.name +
                          '\n'
                      )
                    else if (
                      element.section == 'T. Home' ||
                      element.section == 'Backcover'
                    )
                      return String(
                        element.n +
                          'x ' +
                          ' ' +
                          element.section +
                          element.name +
                          ' ' +
                          element.col +
                          '\n'
                      )
                  })}
              </Text>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                }}
              >
                <Text style={styles.textStyle}>Chiudi</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <View style={styles.container2}>
          <View style={{ flex: 1 }}>
            <SectionList
              sections={this.state.listFiltered}
              renderItem={this.renderRow}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.header}>{title}</Text>
              )}
            ></SectionList>
            <Searchbar
              placeholder='Cerca...'
              onChangeText={text => this.search(text)}
              style={styles.input}
            />
          </View>
        </View>
        <Appbar style={styles.bottom}>
          <Appbar.Action
            style={{ flex: 1 }}
            icon='format-list-bulleted'
            color={'gold'}
            onPress={() => this.setModalVisible(true)}
          />
          <Appbar.Action
            style={{ flex: 1 }}
            icon='printer-wireless'
            onPress={() => this.stampList()}
          />
          <Appbar.Action
            style={{ flex: 1 }}
            icon='delete'
            color={'red'}
            // onPress={() => {
            //   this.clearListBatt()
            // }}
          />
        </Appbar>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 5
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: 5
  },
  buttonContainer: {
    flex: 1,
    borderWidth: 2
  },
  header: {
    fontSize: 25,
    color: 'gold',
    backgroundColor: '#252850',
    textAlign: 'center'
  },
  bottom: {
    borderTopWidth: 2,
    borderRadius: 15,
    backgroundColor: '#252850',
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 0
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: '#252850',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'white'
  },
  input: {
    backgroundColor: '#2196F3',
    borderColor: '#252850',
    borderWidth: 0.5,
    marginTop: 3,
    height: 40,
    borderRadius: 10
  }
})
