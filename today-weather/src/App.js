import React from 'react';
import Background from './components/Background';
import Textbox from './components/Textbox';
import Button from './components/Button';
import { FormControlLabel, FormGroup, Switch } from '@material-ui/core';
import Text from './components/Text';
import ThemeCard from './components/Card';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Table, Tbody, Td, Tr } from 'react-super-responsive-table';
import SearchHistoryRecord from './components/SearchHistoryRecord';
import { geocoderUsingCityInfo, getWeatherInfo } from './api/OpenWeatherAPI';
import { convertFarenheitTocelcius, convertKelvinTocelcius, formatTime } from './common/util';
import Cloud from './assets/cloud.png';
import Sun from './assets/sun.png';
import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';
import { useState } from 'react';

export const ThemeContext = React.createContext();


function App() {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [city, setCity] = useState('');
  const [weatherInfo, setWeatherInfo] = useState({});
  const [historyRecord, setHistoryRecord] = useState(JSON.parse(localStorage.getItem("historyRecord")) || []);

  useEffect(() => {
    localStorage.setItem("historyRecord", JSON.stringify(historyRecord));
  }, [historyRecord, setHistoryRecord]);

  const addHistoryRecord = (newRecord) => {
    setHistoryRecord(existingRecord => {
      return [...existingRecord, newRecord];
    });
  }

  useEffect(() => {
    console.log(isMobile)
  }, [isMobile])

  const removeHistoryRecord = (deleteIndex) => {
    setHistoryRecord(historyRecord.filter((item, index) => deleteIndex !== index));
  };

  const search = (city) => {
    geocoderUsingCityInfo(city)
      .then((result) => {
        getWeatherInfo(result.coord.lat, result.coord.lon)
          .then((result) => {
            let tempDate = new Date(0);
            tempDate.setUTCSeconds(result.dt);
            let weatherInfo = {
              humidity: result.main.humidity,
              temp: Math.round(convertKelvinTocelcius(result.main.temp)),
              tempMax: Math.round(convertKelvinTocelcius(result.main.temp_max < result.main.feels_like ? result.main.feels_like : result.main.temp_max)),
              tempMin: Math.round(convertKelvinTocelcius(result.main.temp_min)),
              country: `${result.name}, ${result.sys.country}`,
              weather: result.weather[0].main,
              timeStamp: tempDate
            }
            setWeatherInfo(weatherInfo);
            addHistoryRecord(weatherInfo);
          }).catch((err) => {
            alert(err);
            setWeatherInfo({});
          })
      })
      .catch((err) => {
        alert(err);
        setWeatherInfo({});
      })
  }

  return (
    <ThemeContext.Provider value={isDarkMode}>
      <Background>
        <FormGroup>
          <FormControlLabel control={<Switch
            color='default'
            checked={isDarkMode}
            onChange={() => { setIsDarkMode(!isDarkMode) }}
          />} label={isDarkMode ? 'Dark Mode' : 'Light Mode'} />
        </FormGroup>
        <Table>
          <Tbody>
            <Tr>
              <Td style={{ paddingRight: 20 }}>
                <Textbox label={'Country'} value={city} onChange={(e) => { setCity(e.target.value) }} />
              </Td>
              <Td style={{ width: 1 }}>
                <Button type={'search'} onClick={() => {
                  if (city.length <= 0) {
                    alert("Country cannot be empty!");
                    setWeatherInfo({});
                  } else {
                    search(city);
                  }
                }} />
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <div style={{ height: Object.keys(weatherInfo).length ? 150 : 50 }} />
        {
          // hide if got no records
        }
        {Object.keys(weatherInfo).length || historyRecord.length ? <ThemeCard mainCard overflow={"visible"}>
          <Table>
            <Tbody>
              {isMobile && Object.keys(weatherInfo).length ?
                <Tr>
                  <Td>
                    <Table>
                      <Tbody>
                        <Tr><Td><Text subTitle value={"Today's Weather"} /></Td></Tr>
                        <Tr><Td><Text hugeTemp value={`${weatherInfo.temp}°`} /></Td></Tr>
                        <Tr><Td><Text subTitle value={`H: ${weatherInfo.tempMax}° L: ${weatherInfo.tempMin}°`} /></Td></Tr>
                        <Tr><Td><Text city value={weatherInfo.country} /></Td></Tr>
                      </Tbody>
                    </Table>
                  </Td>
                  <Td style={{ textAlign: 'right', verticalAlign: "bottom" }}>
                    <img
                      src={weatherInfo.weather === 'Clouds' ? Cloud : Sun}
                      alt={weatherInfo.weather}
                      style={{
                        position: 'absolute',
                        right: 10,
                        top: 120,
                        width: 300,
                        zIndex: 1
                      }}
                    />
                    <Table>
                      <Tbody>
                        <Tr><Td><Text cityInfo value={weatherInfo.weather} /></Td></Tr>
                        <Tr><Td><Text cityInfo value={`Humidity: ${weatherInfo.humidity}%`} /></Td></Tr>
                        <Tr><Td><Text cityInfo value={formatTime(weatherInfo.timeStamp)} /></Td></Tr>
                      </Tbody>
                    </Table>
                  </Td>
                </Tr> : undefined}
              {!isMobile && Object.keys(weatherInfo).length ?
                <Tr>
                  <Td>
                    <Table>
                      <Tbody>
                        <Tr><Td><Text subTitle value={"Today's Weather"} /></Td></Tr>
                        <Tr><Td><Text hugeTemp value={`${weatherInfo.temp}°`} /></Td></Tr>
                        <Tr><Td><Text subTitle value={`H: ${weatherInfo.tempMax}° L: ${weatherInfo.tempMin}°`} /></Td></Tr>
                      </Tbody>
                    </Table>
                  </Td>
                  <Td style={{ textAlign: 'right', }}>
                    <img
                      src={weatherInfo.weather === 'Clouds' ? Cloud : Sun}
                      alt={weatherInfo.weather}
                      style={{
                        position: 'absolute',
                        right: 10,
                        top: 120,
                        width: 350,
                        zIndex: 1
                      }}
                    />
                  </Td>
                </Tr> : undefined
              }
              {!isMobile && Object.keys(weatherInfo).length ?
                <Tr>
                  <Td colSpan={2}>
                    <Table>
                      <Tbody>
                        <Tr>
                          <Td><Text city value={weatherInfo.country} /></Td>
                          <Td style={{ textAlign: 'center' }}><Text cityInfo value={formatTime(weatherInfo.timeStamp)} /></Td>
                          <Td style={{ textAlign: 'center' }}><Text cityInfo value={`Humidity: ${weatherInfo.humidity}%`} /></Td>
                          <Td style={{ textAlign: 'right' }}><Text cityInfo value={weatherInfo.weather} /></Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </Td>
                </Tr>
                : undefined
              }
              {historyRecord.length ?
                <Tr>
                  <Td colSpan={2}>
                    <ThemeCard>
                      <Text subTitle value={"Search History"} />
                      {
                        historyRecord.map((record, index) => {
                          return <ThemeCard itemCard key={index + ""}>
                            <Table>
                              <Tbody>
                                <SearchHistoryRecord
                                  city={record.country}
                                  timing={formatTime(record.timeStamp)}
                                  onSearch={() => { search(record.country) }}
                                  onDelete={() => { removeHistoryRecord(index) }}
                                />
                              </Tbody>
                            </Table>
                          </ThemeCard>
                        })
                      }
                    </ThemeCard>
                  </Td>
                </Tr>
                : undefined}

            </Tbody>
          </Table>
        </ThemeCard> : undefined
        }
      </Background>
    </ThemeContext.Provider>
  );
}

export default App;
