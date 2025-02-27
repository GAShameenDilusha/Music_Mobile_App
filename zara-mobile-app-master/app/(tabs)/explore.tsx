import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ThemedText } from '@/components/ThemedText';
import { Image } from 'react-native';

export default function TabTwoScreen() {
    return (
        <View style={styles.container}>
            <Collapsible title="About SHAM">
                <ThemedText style={styles.aboutText}>
                    Welcome to SHAM, the ultimate music experience. Our platform is designed to bring you the best sounds, curated playlists, and a seamless listening experience.
                </ThemedText>

                <ThemedText style={styles.aboutText}>
                    Whether you're here to discover new artists or enjoy your all-time favorites, SHAM delivers a rich audio journey tailored to your taste.
                </ThemedText>

                <Image style={styles.tinyLogo} source={require('@/assets/img/test.jpg')} />
            </Collapsible>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // Dark background
        padding: 16,
    },
    aboutText: {
        color: 'dark', // White text for contrast
        fontSize: 16,
        marginBottom: 10,
    },
    tinyLogo: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginTop: 10,
    },
});

