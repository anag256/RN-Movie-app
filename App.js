
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import MovieDetailScreen from "./screens/MovieDetailScreen";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Screens */}
        <Stack.Screen name="Home" component={HomeScreen}  options={{headerShown:false}}/>
        <Stack.Screen name="MovieDetail" component={MovieDetailScreen}  options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

