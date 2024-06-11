import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

export default function Objeto({ objetoNome, objetoCor, objetoFoto, onDetails }) {
    return (
      <View style={styles.box}>
        <Image source={{ uri: objetoFoto }} style={styles.image} />
        <View style={styles.boxDetails}>
          <TouchableOpacity style={styles.Details}>
            <Text style={styles.title}>{objetoNome}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Details}>
            <Text style={styles.title}>Cor:</Text>
            <Text style={styles.title}>{objetoCor}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.price} onPress={onDetails}>
            <Text style={styles.priceText}>Detalhes</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
    box: {
      width: '44%',
      height: 320,
      backgroundColor: '#696969', 
      borderRadius: 5,
      display: 'flex',
      alignItems: 'center',
      shadowColor: "black",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      textShadowRadius: 3.84,
      elevation: 5,
      margin: 12,
  
    },
    Details: {
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    boxDetails: {
      height: 170,
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    title: {
      fontSize: 12,
      textAlign: 'center',
      fontWeight: 'bold', 
      color: 'white',
    },
    price: {
      backgroundColor: '#00ff00',
      padding: 5,
      borderRadius: 5,
      width: '80%',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    priceText: {
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      textShadowColor: "rgba(0, 0, 0, 0.75)",
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 10,
    },
    productInfo: { 
      fontSize: 14,
      color: '#00ff00', 
      fontStyle: "italic",
    },
    image: {
      width: '100%',
      height: 150,
      borderTopRightRadius: 5,
      borderTopLeftRadius: 5,
      overflow: 'hidden',
    },
  });
