import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import axios from "axios";

import Card from "../components/Card";
import { API_KEY } from "../constants/apiKey";
import CardSection from "../components/CardSection";

const HomeScreen = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRated, setTopRatedMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  function getMovies(type,setMovie){
    axios
    .get(`https://api.themoviedb.org/3/movie/${type}?language=en-US&page=1`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    })
    .then((res) => setMovie(res.data.results))
    .catch((error) => console.error(error));
  }
  function getTvShows(){
    axios
    .get(`https://api.themoviedb.org/3/trending/tv/day?language=en-US`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    })
    .then((res) => setTvShows(res.data.results))
    .catch((error) => console.error(error));
  }
  useEffect(() => {
    getMovies('popular',setPopularMovies);
    getMovies('top_rated',setTopRatedMovies);
    getTvShows();
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: "#28282B", height: "100%" }}>
      {/* Header Bar */}
      <ScrollView>
        <View style={styles.headerBar}>
          <AdjustmentsVerticalIcon size={20} color="#fff" />
          <Text style={styles.colorWhite}>Movies</Text>
          <MagnifyingGlassIcon size={20} color="#fff" />
        </View>

        {/* CardSections */}

        <CardSection title="Popular" movies={popularMovies}  isTVShow={false}/>
        <CardSection title="Top Rated" movies={topRated}  isTVShow={false}/>
        <CardSection title="TV Series" movies={tvShows}  isTVShow={true}/>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  colorWhite: {
    color: "#fff",
  },
});

export default HomeScreen;
