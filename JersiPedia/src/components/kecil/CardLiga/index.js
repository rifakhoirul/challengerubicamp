import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { colors, responsiveHeight, responsiveWidth } from '../../../utils'

const CardLiga = ({ liga }) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Image source={{uri: liga.image}} style={styles.logo} />
        </TouchableOpacity>
    )
}

export default CardLiga

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        padding:10,
        borderRadius:15,
        elevation: 5,
    },
    logo: {
        width: responsiveWidth(57),
        height: responsiveHeight(70)
    }
})
