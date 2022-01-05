import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { CardLiga } from '../../kecil'

const ListLiga = ({ligas}) => {
    return (
        <View style={styles.container}>
            {ligas.map((liga)=>{
                return (
                    <CardLiga key={liga.id} liga={liga}/>
                )
            })}
        </View>
    )
}

export default ListLiga

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:10
    }
})
