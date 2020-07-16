import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

import { Feather, EvilIcons, Fontisto } from '@expo/vector-icons';

interface Props {
    title: string,
    backgroundColor: string,
    icon?: string;
    temperature: string;
}

const MainCard: React.FC<Props> = ({title, temperature, backgroundColor, icon }: Props) => {

    const Icon = () => {
        if(icon === 'morning') {
            return (
                <Feather style={styles.cardIcon} name="sun" size={40} color='#FFFFFF'/>
            ) 
        }
        if(icon === 'afternoon') {
            return (
                <Fontisto style={styles.cardIcon} name="day-cloudy" size={40} color="#FFFFFF"/>
            )
        }
        if(icon === 'night') {
            return (
                <Feather style={styles.cardIcon} name="cloud-rain" size={40} color='#FFFFFF'/>
            )
        }
        return null
      }

    const styles = StyleSheet.create({
        card: {
            backgroundColor: backgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            margin: 10,
            width: 110,
            height: 210,
        },
        text: {
            color: '#FFFFFF',
            margin: 15,
            fontSize: 17,
        },
        cardIcon: {
            color: '#FFFFFF',
            margin: 15,
        },
    })

    return (
    <View style={styles.card}>
        <Text style={styles.text}>{title}</Text>
        <Icon/>
        <Text style={styles.text}>{temperature}</Text>
    </View>
  )
}

export default MainCard;