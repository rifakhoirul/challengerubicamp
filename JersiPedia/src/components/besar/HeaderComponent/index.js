import React, { Component } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { saveKeywordJersey } from '../../../actions/JerseyAction'
import { IconCari } from '../../../assets'
import { colors, fonts, responsiveHeight } from '../../../utils'
import { Jarak, Tombol } from '../../kecil'

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search: ''
        }
    }
    selesaiCari = () => {
        const { page, navigation, dispatch } = this.props
        const { search } = this.state

        //jalankan action save keyword
        dispatch(saveKeywordJersey(search))

        //navigate ke listjersey jika halaman home
        if (page !== "ListJersey") {
            navigation.navigate("ListJersey")
        }

        //clear state search
        this.setState({
            search:""
        })
    }

    render() {
        const { search } = this.state
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.wrapperHeader}>
                    <View style={styles.searchSection}>
                        <IconCari />
                        <TextInput
                            placeholder='Cari Jersey...'
                            style={styles.input}
                            value={search}
                            onChangeText={(search) => this.setState({ search })}
                            onSubmitEditing={() => this.selesaiCari()}
                        />
                    </View>
                    <Jarak width={10} />
                    <Tombol
                        icon="keranjang"
                        totalKeranjang={2}
                        padding={10}
                        onPress={() => navigation.navigate('Keranjang')} />
                </View>
            </View>
        )
    }
}

export default connect()(HeaderComponent)

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        height: responsiveHeight(125)
    },
    wrapperHeader: {
        marginTop: 15,
        marginHorizontal: 30,
        flexDirection: 'row'
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: 5,
        paddingLeft: 10,
        alignItems: 'center'
    },
    input: {
        fontSize: 16,
        fontFamily: fonts.primary.regular
    }
})
