import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ImagePropTypes } from 'react-native';
import * as Location from 'expo-location';

import { Feather, EvilIcons } from '@expo/vector-icons';

import MainCard from './components/MainCard';
import InfoCard from './components/InfoCard';

export default function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [currentTemperature, setCurrentTemperature] = useState(0);
  const [location, setLocation] = useState('');
  const [currentHour, setCurrentHour] = useState('13:00');

  const [wind, setWind] = useState(0);
  const [moisture, setMoisture] = useState(0);
  const [tempMin, setTempMin] = useState(0);
  const [tempMax, setTempMax] = useState(0);

  const [locationCoords, setLocationCoords] = useState<[number, number]>([0, 1])

  function handleDarkTheme() {
    darkTheme ? setDarkTheme(false) : setDarkTheme(true)
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkTheme ? '#121212' : '#E5E5E5',
      alignItems: 'center',
    },
    temperature: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 10,
    },
    temperatureText: {
      color: darkTheme ? '#e0e0e0' : '#121212',
      fontSize: 50,
      fontWeight: '500',
    },
    refreshButton: {
      position: 'absolute',
      margin: 35,
      alignSelf: 'flex-start',
    },
    cardView: {
      color: darkTheme ? '#121212' : '#e0e0e0',
      margin: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    info: {
      alignItems: 'center',
      backgroundColor: darkTheme ? '#393e54' : '#8f8f8f',
      borderRadius: 20,
      width: 350,
      height: 230,
    },
    infoText: {
      color: darkTheme ? '#e0e0e0' : '#FFFFFF',
      margin: 15,
      fontSize: 20,
      fontWeight: 'bold',
    },
    infoCard: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    themeButton: {
      margin: 10,
      marginLeft: 300,
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    squareButton: {
      backgroundColor: darkTheme ? '#f2f2f2' : '#8f8f8f',
      justifyContent: 'center',
      borderRadius: 20,
      marginRight: 20,
      width: 50,
      height: 25,
    },
    circleButton: {
      backgroundColor: darkTheme ? '#232634' : '#f2f2f2',
      alignSelf: darkTheme ? 'flex-end' : 'flex-start',
      margin: 5,
      width: 30,
      height: 30,
      borderRadius: 50,
    },
  });

  useEffect(() => {
    async function getLocation() {
      let { status } = await Location.requestPermissionsAsync()
      if (status !== 'granted') {
        alert('PermissionDenied')
        return;
      } 
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords

      setLocationCoords([
        latitude,
        longitude
      ])      
      // console.log(locationCoords)
    }
    getLocation()
  }, [])

  useEffect(() => {
    async function getCurrentWeather() {
      const lat = locationCoords[0]
      const long = locationCoords[1]

      // http://api.openweathermap.org/data/2.5/weather?lat=-16.0401373&lon=-48.0208091&appid=9f569381e0460afaf9bb9aa983bbb18b
      await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=9f569381e0460afaf9bb9aa983bbb18b`).then(response => {
        const data = response.data

        const locationName = (data.sys.country + ', ' + data.name)
        const temperatureMin = data.main.temp_min
        const temperatureMax = data.main.temp_max
        const wind = data.wind.speed
        const humidity = data.main.humidity
        const currentTemperature = data.main.temp

        
        setLocation(locationName)
        setTempMin(convertKelvin(temperatureMin))
        setTempMax(convertKelvin(temperatureMax))
        setWind(wind)
        setMoisture(humidity)
        setCurrentTemperature(convertKelvin(currentTemperature))
      })
    }
    getCurrentWeather()
    // console.log(weather)
  }, [])
  
  function convertKelvin(kelvin: number) {
    return parseInt<Number>(kelvin - 273)
  }  

  function Hour() {
    let date = new Date()
      setCurrentHour(date.getHours() + ':' + date.getMinutes())
  }
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto"/>
      <TouchableOpacity style={styles.refreshButton}>
       <EvilIcons onPress={Hour} name="refresh" size={40} color={darkTheme ? '#e0e0e0' : '#121212'}/>
      </TouchableOpacity>
      <Feather style={{ marginTop: 65 }} name="sun" size={50} color="#EDB230"/>
      <View style={styles.temperature}>
        <Text style={styles.temperatureText}>{currentTemperature}</Text>
        <Text style={[styles.temperatureText, { fontSize: 20, }]}>°C</Text>
      </View>

      <Text style={[styles.temperatureText, { fontSize: 15, }]}>{location}, {currentHour}</Text>

      <View style={styles.cardView}>
          <MainCard temperature="8°" title="Morning" backgroundColor={darkTheme ? '#ff873d' : '#cc6e30'} icon={'morning'}></MainCard>
          <MainCard temperature="18°" title="Afternoon" backgroundColor={darkTheme ? '#FCC63F' : '#D29600'} icon={'afternoon'}></MainCard>
          <MainCard temperature="10°" title="Night" backgroundColor={darkTheme ? '#99B2DD' : '#38B7B8'} icon={'night'}></MainCard>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoText}>Additional Informations</Text>
          
            <View style={styles.infoCard}>              
                <InfoCard  title="Wind" value={wind + ' m/h'}></InfoCard>
                <InfoCard title="Moisture" value={moisture + '%'}></InfoCard>
                <InfoCard title="Temp. Min" value={tempMin + '°'}></InfoCard>
                <InfoCard title="Temp. Max" value={tempMax + '°'}></InfoCard>
            </View>
          
      </View>

      <View style={styles.themeButton}>
        <View style={styles.squareButton}>
          <TouchableOpacity style={styles.circleButton} onPress={handleDarkTheme}>

          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}


