import React from 'react'
import { View, Text } from 'react-native'
import { CardMenu } from '../../kecil'

const ListMenu = ({menus, navigation}) => {
    return (
        <View>
            {menus.map((menu)=>{
                return <CardMenu key={menu.id} menu={menu} navigation={navigation}/>
            })}
        </View>
    )
}

export default ListMenu
