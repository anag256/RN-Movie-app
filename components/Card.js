import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
const Card = ({ id,imgUrl, title, rating,isTV }) => {
  const navigation=useNavigation();

  return (
    <TouchableOpacity onPress={()=>navigation.navigate('MovieDetail',{
      id,
      isTV
    })}>
      <View style={styles.Card}>
        <Image source={{ uri: imgUrl }} style={styles.image} />
        <Text style={styles.cardTitle}>{title}</Text>
        {/* <Text><StarIcon size={15} color='#fff' style={{marginRight:10}}/>{rating}/10</Text> */}
        <View style={styles.rating}>
          <Text style={{ marginRight: 12 }}>
            <StarIcon size={15} color="#fff" />
          </Text>
          <Text style={{ color: "#fff" }}>{rating}/10</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Card: {
    margin: 10,
    padding: 18,
    borderRadius: 11,
    shadowColor: "#FCFBFC",
    alignItems: "flex-start",
    justifyContent: "center",
    elevation: 7,
    maxWidth: 250,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    height:380
  },
  image: {
    width: 200,
    height: 280,
    objectFit: "cover",
    borderRadius:12
  },
  cardTitle: {
    color: "#fff",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  rating: {
    width: 200,
    margin: 5,

    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
export default Card;
