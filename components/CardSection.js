import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import Card from './Card'

const CardSection = ({title,movies,isTVShow}) => {

  return (
    <View  style={styles.cardSection}>
        <Text style={styles.cardHeader}>{title}</Text>
        <FlatList
          data={movies}
          renderItem={({ item }) => (
            <Card
              id={item.id}
              imgUrl={"https://image.tmdb.org/t/p/original" + item.poster_path}
              title={item.title || item.original_name}
              rating={item.vote_average.toFixed(2)}
              isTV={isTVShow}
            />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
  )
}

const styles = StyleSheet.create({

  cardSection:{
    paddingBottom:20,
    marginVertical:10,
   borderColor:'#373737',
   borderBottomWidth:2
  },
    cardHeader:{
      fontSize:15,
      color:'#fff',
      marginLeft:15
    }
  });

export default CardSection