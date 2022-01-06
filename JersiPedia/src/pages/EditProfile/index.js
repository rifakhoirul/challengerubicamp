import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, Image, Alert } from 'react-native'
import { dummyProfile } from '../../data'
import { colors, fonts, getData, responsiveHeight, responsiveWidth } from '../../utils'
import { Inputan, Pilihan, Tombol } from '../../components'
import { connect } from 'react-redux'
import { getProvinsiList, getKotaList } from '../../actions/RajaOngkirAction'
import { DefaultImage } from '../../assets'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

class EditProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            uid: '',
            nama: '',
            email: '',
            nohp: '',
            alamat: '',
            provinsi: false,
            kota: false,
            avatar: false,
            avatarForDB: '',
            avatarLama: '',
            updateAvatar: false
        }
    }
    componentDidMount() {
        this.getUserData()
        this.props.dispatch(getProvinsiList())
    }
    getUserData = () => {
        getData('user').then(res => {
            this.setState({
                uid: res.uid,
                nama: res.nama,
                email: res.email,
                nohp: res.nohp,
                alamat: res.alamat,
                kota: res.kota,
                provinsi: res.provinsi,
                avatar: res.avatar,
                avatarLama: res.avatar
            })
            this.props.dispatch(getKotaList(res.provinsi))
        })
    }
    ubahProvinsi = (provinsi) => {
        this.setState({
            provinsi: provinsi
        })
        this.props.dispatch(getKotaList(provinsi))
    }
    getImage = () => {
        launchImageLibrary({ quality: 1, maxWidth: 500, maxHeight: 500 }, response => {
            if (response.didCancel || response.errorCode || response.errorMessage) {
                Alert.alert('Error! Photo is not selected')
            } else {
                const source = response.uri
            }
        })
    }
    render() {
        const { nama, email, nohp, alamat, provinsi, kota, avatar } = this.state
        const { getKotaResult, getProvinsiResult } = this.props
        return (
            <View style={styles.pages}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <Inputan label='Nama' value={nama} onChangeText={(nama) => this.setState({ nama })} />
                    <Inputan label='Email' value={email} disabled />
                    <Inputan label='No. Handphone' value={nohp} onChangeText={(nohp) => this.setState({ nohp })} keyboardType='number-pad' />
                    <Inputan label='Alamat' value={alamat} onChangeText={(alamat) => this.setState({ alamat })} />
                    <Pilihan
                        label='Provinsi'
                        datas={getProvinsiResult ? getProvinsiResult : []}
                        selectedValue={provinsi}
                        onValueChange={(provinsi) => this.ubahProvinsi(provinsi)}
                    />
                    <Pilihan
                        label='Kota/Kab'
                        datas={getKotaResult ? getKotaResult : []}
                        selectedValue={kota}
                        onValueChange={(kota) => this.setState({ kota: kota })}
                    />

                    <View style={styles.inputFoto}>
                        <Text style={styles.label}>Foto Profile :</Text>
                        <View style={styles.wrapperUpload}>
                            <Image source={avatar ? avatar : DefaultImage} style={styles.foto} />
                            <View style={styles.tombolChangePhoto}>
                                <Tombol title='Change Photo' type='text' padding={7} onPress={() => this.getImage()} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.submit}>
                        <Tombol title='Submit' type='textIcon' icon='submit' padding={responsiveHeight(15)} fontSize={18} />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    getProvinsiResult: state.RajaOngkirReducer.getProvinsiResult,
    getKotaResult: state.RajaOngkirReducer.getKotaResult,
})

export default connect(mapStateToProps, null)(EditProfile)

const styles = StyleSheet.create({
    pages: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 30,
        paddingTop: 10
    },
    inputFoto: {
        marginTop: 20
    },
    label: {
        fontSize: 18,
        fontFamily: fonts.primary.regular
    },
    foto: {
        width: responsiveWidth(150),
        height: responsiveWidth(150),
        borderRadius: 40,
    },
    wrapperUpload: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center'
    },
    tombolChangePhoto: {
        marginLeft: 20,
        flex: 1,
    },
    submit: {
        marginVertical: 30
    }

})
