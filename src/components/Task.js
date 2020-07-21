/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React from 'react'
import {View,
        Text,
        StyleSheet,
        TouchableWithoutFeedback,
        TouchableOpacity} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
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
        backgroundColor: '#fff',
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
    },
    right:{
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    },
    left: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
    },
    excludeIcon: {
        marginLeft: 10,
    },
    excludeText: {
        fontFamily: commonStyles.fontFamily,
        color: '#fff',
        fontSize: 20,
        margin: 10,
    },
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
    const getRightContent = () => {
        return(
            <TouchableOpacity style={styles.right}>
                <Icon name="trash" size={30} color="#FFF"/>
            </TouchableOpacity>
        )
    }

    const getLeftContent = () => {
        return(
            <View style={styles.left}>
                <Icon name="trash" size={20} color="#FFF" style={styles.excludeIcon}/>
                <Text style={styles.excludeText}>Excluir</Text>
            </View>
        )
    }

    return (
        <Swipeable 
        renderRightActions={getRightContent}
        renderLeftActions={getLeftContent}>
            <View style={styles.container}>
                <TouchableWithoutFeedback
                onPress= {() => props.toggleTask(props.id)}>
                    <View style={styles.checkContainer}>
                        {getCheckView(props.doneAt)}
                    </View>
                </TouchableWithoutFeedback>

                <View>
                    <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                    <Text style={styles.date}>{formattedDate + ''}</Text>
                </View>
            </View>
        </Swipeable>

    )
}