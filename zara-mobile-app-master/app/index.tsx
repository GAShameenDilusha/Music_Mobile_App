import { Link } from 'expo-router';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Link href="/(tabs)">
                <ImageBackground
                    source={require('@/assets/img/Login-logo 2.jpg')}
                    style={styles.logo}
                >

                </ImageBackground>

            </Link>
            <Text style={styles.text}>... Welcome  to  the  world  of  Music...</Text>



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 250,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayText: {
        color: 'white',
        fontSize: 18,
    },

    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },

});
