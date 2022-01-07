import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { HeaderComponent, Jarak, ListJerseys, ListLiga, Tombol } from '../../components';
import { dummyJerseys, dummyLigas } from '../../data';
import { colors, fonts } from '../../utils';

export default class ListJersey extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ligas: dummyLigas,
      jerseys: dummyJerseys
    }
  }
  render() {
    const { ligas, jerseys } = this.state
    const { navigation } = this.props
    return (
      <View style={styles.page}>
        <HeaderComponent navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
          <View style={styles.pilihLiga}>
            <ListLiga ligas={ligas} />
          </View>
          <View style={styles.pilihJersey}>
            <Text style={styles.label}>Pilih <Text style={styles.boldLabel}>Jersey</Text> Yang Anda Inginkan</Text>
            <ListJerseys jerseys={jerseys} />
          </View>
          <Jarak height={100} />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: -30,
  },
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  pilihLiga: {
    marginHorizontal: 30,
  },
  pilihJersey: {
    marginHorizontal: 30,
    marginTop: 10
  },
  label: {
    fontSize: 18,
    fontFamily: fonts.primary.regular
  },
  boldLabel: {
    fontSize: 18,
    fontFamily: fonts.primary.bold
  }
});
