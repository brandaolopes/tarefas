import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import commonStyles from '../commonStyles'
import moment from 'moment'
import 'moment/locale/pt-br'


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#aaa',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pending: {
        height: 25,
        width: 25,
        borderColor: '#555',
        borderRadius: 13,
        borderWidth: 1
    },
    done: {
        height: 25,
        width: 25,
        backgroundColor: '#4d7020',
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15,
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12,
    }
})

function getCheckView(doneAt) {
    
    if(doneAt != null) {
        return (
            <View style={styles.done}>
                <Icon name='check' size={20} color='#fff'></Icon>
            </View>
        )
    } else {
        return (
            <View style={styles.pending}/>
        )
    }
}



export default props => {

    const doneOrNotStyle = props.doneAt != null ? 
        {textDecorationLine: 'line-through'} : {}

    const date = props.doneAt ? props.doneAt : props.estimatedAt
    const formattedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM')
    

    return (
        <View style={styles.container}>
            <View style={styles.checkContainer}>
                {getCheckView(props.doneAt)}
            </View>
            <View>
                <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                <Text style={styles.date}>{formattedDate + ''}</Text>
            </View>

            
        </View>
    )
}