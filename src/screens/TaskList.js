/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet, FlatList, Platform, TouchableOpacity } from 'react-native'
import commonStyles from '../commonStyles'

import todayImage from '../../assets/imgs/today.jpg'
import Task from '../components/Task'
import moment from 'moment'
import 'moment/locale/pt-br'
import Icon from 'react-native-vector-icons/FontAwesome'



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 3,
    },
    taskList:{
        flex: 7,
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 50,
        color: commonStyles.colors.secondary,
        marginLeft: 20,
        marginBottom: 20,
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        color: commonStyles.colors.secondary,
        marginLeft: 20,
        marginBottom: 20,
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS === 'ios' ? 40 : 10,
    },
})

const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

export default class TaskList extends Component {

    state= {
        showDoneTasks: true,
        tasks: [{
            id: Math.random(),
            desc: 'Comprar Livro de React-Native',
            estimatedAt: new Date(),
            doneAt: new Date(),
        },
        {   
            id: Math.random(),
            desc: 'Ler Livro de React-Native',
            estimatedAt: new Date(),
            doneAt: null,}]
    }

    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks })
    }

    toggleTask = taskId => {
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
            if (task.id === taskId){
                task.doneAt = task.doneAt ? null : new Date()
            }
        })

        this.setState({ tasks })
    }

    render () {
        return (
            <View style={styles.container}>
                <ImageBackground source={todayImage}
                style={styles.background}>
                <View style={styles.iconBar}>
                    <TouchableOpacity onPress={this.toggleFilter}>
                        <Icon name = {this.state.showDoneTasks ? 'eye' : 'eye-slash' }
                        size={20} color={commonStyles.colors.secondary}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.titleBar}>
        <Text style={styles.title}>Hoje</Text>
                    <Text style={styles.subtitle}>{today}</Text>
                </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList data={this.state.tasks}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({item}) => <Task {...item} toggleTask = {this.toggleTask}/>}/>
                </View>
               
            </View>
        )
    }
}