import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View,
  SectionList,
  Text,
  Modal,
  TouchableHighlight
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Appbar, Snackbar, Searchbar } from 'react-native-paper'
import BattList from './Batterie'

const list = [
  { id: 'cvG', nome: 'HUAWEI P8', nMax: 2, codice: 'HB3447A9EBW' },
  { id: 'po5', nome: 'HUAWEI P8 LITE', nMax: 2, codice: 'HB3742A0EZC+' },
  {
    id: 'cfV',
    nome: 'HUAWEI P9',
    compat:
      'P9 LITE \n P8 LITE 2017 \n P10 LITE \n P20 LITE \n HONOR 8 \n P SMART \n HONOR 9 LITE \n Y6 2018 \n GT3 \n HONOR 7A ',
    nMax: 5,
    codice: 'HB366481EC​W'
  },
  { id: 'cfZ', nome: 'HUAWEI P9 PLUS', nMax: 2, codice: 'HB376883ECW' },
  {
    id: 'dtZ',
    nome: 'HUAWEI PSMART 2019',
    compat: 'HONOR 10 LITE \n P SMART PLUS 2019',
    nMax: 2,
    codice: 'HB396286ECW'
  },
  {
    id: 'cf0',
    nome: 'HUAWEI P10',
    compat: 'HONOR 9',
    nMax: 2,
    codice: 'HB386280ECW'
  },
  {
    id: 'z9y',
    nome: 'HUAWEI P20',
    compat: 'HONOR 10',
    nMax: 2,
    codice: 'HB396285ECW'
  },
  {
    id: 'S9y',
    nome: 'HUAWEI P30',
    compat: 'MATE 20 PRO',
    nMax: 2,
    codice: 'HB436380ECW'
  },
  {
    id: 'T71',
    nome: 'HUAWEI MATE 9',
    compat: 'MATE 9 PRO \n Y7 2017 \n Y7 2019',
    nMax: 2,
    codice: 'HB406689ECW'
  },
  {
    id: 'T72',
    nome: 'HUAWEI MATE 10',
    compat: 'MATE 10 PRO \n P20 PRO \n P SMART Z \n P30 \n HONOR VIEW 20',
    nMax: 2,
    codice: 'HB436486ECW '
  },
  {
    id: 'F79',
    nome: 'HUAWEI MATE 10 LITE',
    compat: 'P30 LITE \n HONOR 7X \n P SMART PLUS',
    nMax: 2,
    codice: 'HB356687ECW'
  },
  {
    id: 'x1L',
    nome: 'HUAWEI MATE 20 LITE',
    compat: 'P10 PLUS \n HONOR VIEW 10 \n NOVA 5T',
    nMax: 2,
    codice: 'HB386589ECW'
  },
  { id: 'x76', nome: 'HUAWEI MATE S', nMax: 2, codice: 'HB436178EBW' },
  {
    id: 'x78',
    nome: 'HUAWEI NOVA YOUNG',
    compat: 'HUAWEI Y6 PRO 2017 \n Y5 2018 \n Y6 2019 \n Y6S',
    nMax: 2,
    codice: 'HB405979ECW'
  }
]
const sectionList = [
  {
    title: 'To Order',
    data: list
  }
]
export default class BattListHW extends BattList {
  state = {
    modalVisible: false,
    modalVisibleResi: false,
    clearList: false,
    listFiltered: sectionList,
    searchModel: ''
  }

  search (model) {
    this.setState({
      listFiltered: [
        {
          title: 'To order',
          data: list.filter(elem => (elem.nome.includes(model.toUpperCase())))
        }
      ]
    })
  }
  clearListBatt () {
    //Azzera lista ordine
    global.store_Batt.clear()
    global.listBatt = ''
    //Azzera lista resi
    global.resi_Batt_IP.clear()
    global.listResiBatt = ''
    list.forEach(element => {
      //AZZERA TUTTI GLI ELEMENTI NELLO STORE CON PERSISTENZA LOCALE
      const item = {
        id: element.id,
        nomeItem: element.nome,
        contatore: 0,
        NumResi: 0
      }
      AsyncStorage.mergeItem(element.id, JSON.stringify(item))
    })
    this.setState({ clearList: !this.state.clearList })
  }
  // componentDidUpdate(){
  //   console.log(this.state.search)
  // }
  render () {
    return (
      <View style={styles.container}>
        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible)
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                IN ORDINE {'\n\n'}
                {[...global.store_Batt.values()].sort().map(function (element) {
                  return String(element.n + 'x ' + element.name + '\n')
                })}
              </Text>
              <Text style={styles.modalTextResi}>
                RESI {'\n'}
                {[...global.resi_Batt_IP.values()]
                  .sort()
                  .map(function (element) {
                    return String(element.n + 'x ' + element.name + '\n')
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
        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.modalVisibleResi}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible)
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                RESI {'\n\n'}
                {[...global.resi_Batt_IP.values()]
                  .sort()
                  .map(function (element) {
                    return String(element.n + 'x ' + element.name + '\n')
                  })}
              </Text>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  this.setModalVisibleResi(!this.state.modalVisibleResi)
                }}
              >
                <Text style={styles.textStyle}>Chiui</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <Snackbar
          visible={this.state.clearList}
          onDismiss={() => this.setState({ clearList: false })}
          duration={700}
          style={{ backgroundColor: '#252849', textAlign: 'center' }}
        >
          {' '}
          LISTA AZZERATA{' '}
        </Snackbar>
        <SectionList
          sections={this.state.listFiltered}
          renderItem={this.renderRow}
          // renderSectionHeader={({ section: { title } }) => (
          //   <Text style={styles.header}>{title}</Text>
          // )}
        ></SectionList>
        <Searchbar
          placeholder='Type Here...'
          onChangeText={text => this.search(text)}
          style={styles.input}

        />
        <Appbar style={styles.bottom}>
          <Appbar.Action
            style={{ flex: 1 }}
            icon='format-list-bulleted'
            color={'gold'}
            onPress={() => this.setModalVisible(true)}
          />
          {/* <Appbar.Action
            style={{ flex: 1 }}
            icon='recycle'
            color={'lightgreen'}
            onPress={() => this.setModalVisibleResi(true)}
          /> */}
          <Appbar.Action
            style={{ flex: 1 }}
            icon='delete'
            color={'red'}
            onPress={() => {
              this.clearListBatt()
            }}
          />
          <Appbar.Action
            style={{ flex: 1 }}
            icon='send'
            onPress={() => this.stampList()}
          />
        </Appbar>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: 'row',
    backgroundColor: 'black',
    padding: 5
    //paddingTop: StatusBar.length
  },
  buttonContainer: {
    flex: 1,
    borderWidth: 2

    //    borderBottomWidth: 3,
    //  borderTopWidth: 1.5,
    //borderLeftWidth: 2
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff'
  },
  bottom: {
    //borderColor: '#f4511D',
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
    fontSize: 15,
    marginBottom: 15,
    textAlign: 'center',
    color: 'gold'
  },
  modalTextResi: {
    marginBottom: 15,
    textAlign: 'left',
    color: 'lightgreen'
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
