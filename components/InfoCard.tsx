import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

interface Props {
    title: string;
    value: string;
}

const InfoCard: React.FC<Props> = ({title, value}: Props) => {

    const styles = StyleSheet.create({
        card: {
            alignItems: 'center',
            margin: 10,
            minWidth: 150,
        },
        text: {
            color: '#e8e8e8',
            margin: 5,
            marginLeft: 15,
            fontSize: 18,
        },
    })

    return (
    <View style={styles.card}>
        <Text style={styles.text}>{title}</Text>
        <Text style={[styles.text, { color: '#d3d3d3' }]}>{value}</Text>
    </View>
  )
}

export default InfoCard;