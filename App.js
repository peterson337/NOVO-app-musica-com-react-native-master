import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity,
 } from 'react-native';
import { Audio } from "expo-av";
import React, {useState, useEffect} from 'react';
import { AntDesign } from '@expo/vector-icons'; 
import {Player} from "./Player.js";


export default function App() {
  const [audioIndex, setAudioIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [musicas, setMusicas] = useState([

          {
              nome: 'Sweet child of mine',
              artista: 'Guns N Rose',
              playing: false,
              file: require('./audio.mp3')
          },

          {
            nome: 'Welcome to the jungle',
            artista: 'Guns N Rose',
            playing: false,
            file: require('./audio.mp3')

        },

        {
          nome: 'This is love',
          artista: 'Marron 5',
          playing: false,
          file: require('./audio.mp3')

      },
  ]);

  const onchangeMusic = async (id) => {
        let curFile = null;
        let newMusic = musicas.filter((val, k) => {
        if (id === k) {
          musicas[k].playing = true;
          curFile = musicas[k].file
          setPlaying(true);
          setAudioIndex(id);
        } else {
          musicas[k].playing = false;
        }

        return musicas[k];
      })
      if (audio != null) {
          audio.unloadAsync();
      }
      let curAudio = new Audio.Sound();

      try{
          await curAudio.loadAsync(curFile);
          await curAudio.playAsync();
      }catch(erro){

      }

      setAudio(curAudio);
      setMusicas(newMusic);

  }

  return (
    <View style={{flex: 1}}>
    <ScrollView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.header}>

      <Text style={{
      textAlign: 'center', color: 'white', fontSize: 25,
      }}>App música</Text>

      </View>

      <View style={styles.table}>
            <Text style={{width: '50%', color: 'rgb(200,200,200)'}}>Música</Text>
            <Text style={{width: '50%', color: 'rgb(200,200,200)'}}>Artista</Text>
      </View>

      {
        musicas.map((val, k) => {
            if (val.playing) {
              return(
              <View style={styles.tableAcitved} key={val.nome}>
                  <TouchableOpacity onPress={() => onchangeMusic(k)}
                  style={{width: '100%', flexDirection: 'row'}}>

                    <Text style={{width: '50%', color: '#1DB954'}}>

                      <AntDesign name="play" size={15} color="#1DB954"
                       />
                    {val.nome}</Text>

                    <Text style={{width: '50%', color: '#1DB954'}}>
                      {val.artista}</Text>

                  </TouchableOpacity>
              </View>
              )
            } else {
              return(
                <View style={styles.table} key={val.nome}>
                <TouchableOpacity onPress={() => onchangeMusic(k)}
                style={{width: '100%', flexDirection: 'row'}}>

                  <Text style={{width: '50%', color: 'white'}}>

                    <AntDesign name="play" size={15} color="white"
                     />
                  {val.nome}</Text>

                  <Text style={{width: '50%', color: 'white'}}>
                    {val.artista}</Text>

                </TouchableOpacity>
            </View>
                )
            }
        })
      }
      <View style={{paddingBottom: 200}}></View>
    </ScrollView>

          <Player playing={playing} setPlaying={setPlaying} audioIndex={audioIndex}
          musicas={musicas} setMusicas={setMusicas} audio={audio} 
          setAudio={setAudio} setAudioIndex={setAudioIndex}/>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#222',
  },

  header: {
    backgroundColor: '#1DB954',
     width: '100%',
     padding: 20, 
  },

  table: {
    flexDirection: 'row',
    padding: 20,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },

  tableAcitved: {
    flexDirection: 'row',
    padding: 20,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    backgroundColor: 'gray',
  },


});
