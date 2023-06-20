import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, LogBox,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { Audio } from "expo-av";



export const Player = (props) => {

    //LogBox.ignoreAllLogs(true);

        const handlePlay = async () => {

        let curFile = props.musicas[props.audioIndex].file;
        let newMusic = props.musicas.filter((val, k) => {
        if (props.audioIndex == k) {
            props.musicas[k].playing = true;
            curFile = props.musicas[k].file;

        } else {
            props.musicas[k].playing = false;
        }

            return props.musicas[k];
      })
      try{
        if (props.audio != null) {
                props.setPlaying(true);
                props.setMusicas(newMusic);
                await props.audio.playAsync();
      }else{
            let curAudio = new Audio.Sound();
            try{
                await curAudio.loadAsync(curFile);
                await curAudio.playAsync();
            }catch(erro){
                alert("Retronou um erro no primeiro catch" + erro);

            }
                props.setAudio(curAudio);
                
                props.setMusicas(newMusic);
                
                props.setPlaying(true);
                

      }

    }catch(erro){
                alert("Retronou um erro no segundo catch" + erro);

    }
    }






    const handlePause = async () => {
        if (props.audio != null) {
            props.audio.pauseAsync();
  }
               props.setPlaying(false);

    }

    const  handleBack = async () => {
            let newIndex = props.audioIndex - 1;
            if (newIndex < 0) {
                newIndex = props.musicas.length - 1;
            }

            props.setAudioIndex(newIndex);
//?          ATUALIZAR A INTERFACE DO APP.
                let curFile = props.musicas[newIndex].file;
                let newMusic = props.musicas.filter((val, k) => {
                if (newIndex == k) {
                    props.musicas[k].playing = true;
                    curFile = props.musicas[k].file;

                } else {
                    props.musicas[k].playing = false;
                }

                    return props.musicas[k];
                })
//?               REPRODUZIR AUDIO EM QUESTÃO.
                if (props.audio != null) {
                  props.audio.unloadAsync(); 
                }
                let curAudio = new Audio.Sound();
                try{
                    await curAudio.loadAsync(curFile);
                    await curAudio.playAsync();
                }catch(erro){
                    alert("Retronou um erro no primeiro catch" + erro);

                }
                    props.setAudio(curAudio);
                    
                    props.setMusicas(newMusic);
                    
                    props.setPlaying(true);
                                    

    }

    const handleNext = async () => {
                let newIndex = props.audioIndex + 1;
                if (newIndex >= props.musicas.length) {
                    newIndex = 0;
                }

                props.setAudioIndex(newIndex);
//?          ATUALIZAR A INTERFACE DO APP.

                let curFile = props.musicas[newIndex].file;
                let newMusic = props.musicas.filter((val, k) => {
                if (newIndex == k) {
                    props.musicas[k].playing = true;
                    curFile = props.musicas[k].file;

                } else {
                    props.musicas[k].playing = false;
                }

                    return props.musicas[k];
                })

//?          REPRODUZIR AUDIO EM QUESTÃO.
            if (props.audio != null) {
              props.audio.unloadAsync(); 
            }    if (props.audio != null) {
                props.audio.unloadAsync(); 
              }
              let curAudio = new Audio.Sound();
              try{
                  await curAudio.loadAsync(curFile);
                  await curAudio.playAsync();
              }catch(erro){
                  alert("Retronou um erro no primeiro catch" + erro);

              }
                  props.setAudio(curAudio);
                  
                  props.setMusicas(newMusic);
                  
                  props.setPlaying(true);
                                  

    }


  return (
    <View style={styles.player}>
        <TouchableOpacity style={{marginRight: 20, marginLeft: 20}}
        onPress={() => handleBack()}>
        <AntDesign name="banckward" size={35} color="white" />
        </TouchableOpacity>

        {
        !props.playing? 
        <TouchableOpacity style={{marginRight: 20, marginLeft: 20}}
        onPress={() => handlePlay()}>
        <AntDesign name="playcircleo" size={35} color="white" />
        </TouchableOpacity>

        :

        <TouchableOpacity style={{marginRight: 20, marginLeft: 20}}
        onPress={() => handlePause()}>
        <AntDesign name="pausecircleo" size={35} color="white" />
        </TouchableOpacity>
        }

        <TouchableOpacity style={{marginRight: 20, marginLeft: 20}}
        onPress={() => handleNext()}>
        <AntDesign name="forward" size={35} color="white" />
        </TouchableOpacity>
    </View>
  )

}

const styles = StyleSheet.create({
    player: {
         width: '100%',
         height: 100,   
         position: 'absolute',
         bottom: 0,
         left: 0,
         zIndex: 999,
         backgroundColor: '#111',
         alignItems: 'center',
         justifyContent: 'center',
         flexDirection: 'row',
    },
})
