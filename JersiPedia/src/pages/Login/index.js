import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Logo, Ilustrasi } from '../../assets'
import { Inputan, Jarak, Tombol } from '../../components'
import { colors, fonts, responsiveHeight } from '../../utils'

export default class Login extends Component {
    render() {
        return (
            <View style={styles.pages}>
                <View style={styles.logo}>
                    <Logo />
                </View>
                <View style={styles.cardLogin}>
                    <Inputan label='Email' />
                    <Inputan label='Password' secureTextEntry />
                    <Jarak height={25} />
                    <Tombol title='Login' type='text' padding={12} fontSize={18} />
                </View>
                <View style={styles.register}>
                    <Text style={styles.textBlue}>Belum punya akun?</Text>
                    <Text 
                    style={styles.textBlue}
                    onPress={()=>this.props.navigation.navigate('Register1')}
                    >Klik untuk daftar.</Text>

                </View>
                <View style={styles.ilustrasi}>
                    <Ilustrasi />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pages: {
        flex: 1,
        backgroundColor: colors.white
    },
    ilustrasi: {
        position: 'absolute',
        bottom: 0,
        right: -100,
    },
    logo: {
        alignItems: 'center',
        marginTop: responsiveHeight(70)
    },
    cardLogin: {
        marginHorizontal: 30,
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 30,
        borderRadius: 10,
        marginTop: 10
    },
    register:{
        alignItems:'center',
        marginTop:10,
    },
    textBlue:{
        fontSize:20,
        fontFamily:fonts.primary.bold,
        color:colors.primary
    }
})
