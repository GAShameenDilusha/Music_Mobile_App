import { Image, StyleSheet, Platform, Text, ImageBackground, View, ScrollView, Button } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Video } from 'expo-av';
import { router } from 'expo-router';

export default function HomeScreen() {
    return (
        <>
            <View style={styles.logoContainer}>
                <ImageBackground
                    source={require('@/assets/img/test 3.jpg')}
                    style={styles.logo}
                >
                </ImageBackground>
            </View>

            <ScrollView style={styles.scrollView}
                        showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <ImageBackground
                        source={require('@/assets/img/music 7.jpg')}
                        style={styles.image}
                    >
                    </ImageBackground>

                    <ImageBackground
                        source={require('@/assets/img/music 2.jpg')}
                        style={styles.image}
                    >
                    </ImageBackground>

                    <ImageBackground
                        source={require('@/assets/img/music 3.jpg')}
                        style={styles.image}
                    >
                    </ImageBackground>
                    <ImageBackground
                        source={require('@/assets/img/music 11.jpg')}
                        style={styles.image}
                    >
                    </ImageBackground>
                    <ImageBackground
                        source={require('@/assets/img/music 10.jpg')}
                        style={styles.image}
                    >
                    </ImageBackground>
                    <ImageBackground
                        source={require('@/assets/img/music 12.jpg')}
                        style={styles.image}

                    >
                    </ImageBackground>


                </View>
            </ScrollView>
            <View>
                <Button
                    onPress={() => { router.push('(tabs)/search')}}
                    title="Search"
                    color="#000000"
                />





            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    image: {
        height: 600,
        width: '100%',
        marginBottom: 5,
    },
    scrollView: {

    },
    logoContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    logo: {
        width: '100%',
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,

    },

});

