import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_KEY } from "../constants/apiKey";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
const MovieDetailScreen = () => {
  const [movieDetail, setMovieDetail] = useState();
  const [credits, setCredits] = useState();
  const {
    params: { id, isTV },
  } = useRoute();

  function getMovieDetails() {
    axios
      .get(
        `${
          isTV
            ? `https://api.themoviedb.org/3/tv/${id}`
            : `https://api.themoviedb.org/3/movie/${id}?language=en-US`
        }`,
        {
          headers: { Authorization: `Bearer ${API_KEY}` },
        }
      )
      .then((res) => setMovieDetail(res.data))
      .catch((error) => console.error(error));
  }
  function getMovieCredits() {
    axios
      .get(
        `${
          isTV
            ? `https://api.themoviedb.org/3/tv/${id}/credits`
            : `https://api.themoviedb.org/3/movie/${id}/credits`
        }`,
        {
          headers: { Authorization: `Bearer ${API_KEY}` },
        }
      )
      .then((res) => setCredits(res.data))
      .catch((error) => console.error(error));
  }
  useEffect(() => {
    getMovieDetails();
    getMovieCredits();
  }, []);
  useEffect(() => {

  }, [movieDetail, credits]);
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: "rgba(0, 0, 0,1)",
        position: "relative",
        height: "100%",
      }}
    >
      <View style={styles.posterView}>
        {/* First approach -linear gradient */}
        <ImageBackground
          source={{
            uri:
              "https://image.tmdb.org/t/p/original" +
              (movieDetail?.backdrop_path || movieDetail?.poster_path),
          }}
          style={{ ...styles.img }}
        >
          <LinearGradient
            // Background Linear Gradient
            colors={["rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 1)"]}
            style={{ flex: 1, justifyContent: "center" }}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 40,
              left: 10,
              borderColor: "#A9A9A9",
              borderWidth: 1,
              borderRadius: 10,
              zIndex: 2,
            }}
            onPress={navigation.goBack}
          >
            <ArrowLeftIcon size={20} color="#A9A9A9" />
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.details}>
          <Text style={{ ...styles.whiteColor, ...styles.title }}>
            {movieDetail?.original_title}
          </Text>
          <View style={{ flexDirection: "row", margin: 5 }}>
            <Text style={{ ...styles.whiteColor, ...styles.font16 }}>
              {new Date(movieDetail?.release_date).getFullYear() >
              new Date().getFullYear()
                ? "Coming Soon"
                : "Released"}
            </Text>
            <Text style={{ ...styles.whiteColor, ...styles.font16 }}>
              {" "}
              • {new Date(movieDetail?.release_date).getFullYear()}
            </Text>
            <Text style={{ ...styles.whiteColor, ...styles.font16 }}>
              {" "}
              • {movieDetail?.adult ? "18+" : "U/A"}{" "}
            </Text>
          </View>
          <View style={{ flexDirection: "row", margin: 5 }}>
            {movieDetail?.genres.map((genre) => (
              <Text
                style={{ ...styles.whiteColor, ...styles.font16 }}
                key={genre.id}
              >
                {" "}
                • {genre.name}
              </Text>
            ))}
          </View>
          <Text style={{ ...styles.whiteColor, marginTop: 10 }}>
            {movieDetail?.overview}
          </Text>
            <Text style={{...styles.whiteColor,fontSize:16,alignSelf:'flex-start',marginTop:25,marginLeft:10}}>Cast</Text>
            <FlatList
              data={credits?.cast}
              renderItem={({ item }) => (
                <View style={{margin:5}}>

                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/original${item.profile_path}`,
                    }}
                    width={50}
                    height={50}
                    style={{borderRadius:20,borderColor:'gray',borderWidth:2}}
                  />
                  <Text style={styles.whiteColor}>{item.name.slice(0,5)+'...'}</Text>
                  <Text style={{...styles.whiteColor,fontSize:10}}>{item.character.split(" ")[0]}</Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />

        </View>

        {/* ---Second approach- black tint over image */}
        {/* <View style={styles.gradient}></View>
        <Image
          source={{
            uri:
              "https://image.tmdb.org/t/p/original" +
              (movieDetail?.backdrop_path || movieDetail?.poster_path),
          }}
          style={styles.img}
        />
        <TouchableOpacity style={{ position: "absolute", top: 40, left: 10,borderColor:'#A9A9A9',borderWidth:1,borderRadius:10,zIndex:2}} onPress={navigation.goBack}>
          <ArrowLeftIcon
            size={20}
            color="#A9A9A9"

          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: "100%",
    // objectFit: "cover",
  },
  posterView: {
    position: "relative",
    width: "100%",
    height: 400,
    position: "relative",
  },
  gradient: {
    height: "100%",
    width: "100%",
    position: "absolute",
    backgroundColor: "black",
    zIndex: 1,
    opacity: 0.4,
    top: 0,
    left: 0,
  },
  details: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    width: "100%",
    // flex:1,
    top: "60%",
    // left:'30%',
    // maxWidth:300
  },
  whiteColor: {
    color: "#fff",
  },
  title: {
    fontSize: 24,
  },
  font16: {
    fontSize: 12,
  },
});

export default MovieDetailScreen;
