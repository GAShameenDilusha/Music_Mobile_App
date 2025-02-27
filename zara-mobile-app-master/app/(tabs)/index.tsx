import { Image, StyleSheet, Platform, Text, ImageBackground, View, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
    const insets = useSafeAreaInsets();

    const navigateToSearch = () => {
        router.push('(tabs)/search');
    };

    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top }]}>
                <ImageBackground
                    source={require('@/assets/img/test 3.jpg')}
                    style={styles.headerBackground}
                    blurRadius={3}
                >
                    <View style={styles.headerContent}>
                        <Text style={styles.headerTitle}>Music Explorer</Text>
                        <TouchableOpacity style={styles.searchButton} onPress={navigateToSearch}>
                            <Ionicons name="search" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>

            {/* Main Content */}
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}
            >
                <Text style={styles.sectionTitle}>Featured Albums</Text>

                {/* Music Cards */}
                {[
                    { image: require('@/assets/img/music 7.jpg'), title: 'Summer Vibes' },
                    { image: require('@/assets/img/music 2.jpg'), title: 'Jazz Collection' },
                    { image: require('@/assets/img/music 3.jpg'), title: 'Classical Masterpieces' },
                    { image: require('@/assets/img/music 11.jpg'), title: 'Rock Legends' },
                    { image: require('@/assets/img/music 10.jpg'), title: 'Acoustic Sessions' },
                    { image: require('@/assets/img/music 12.jpg'), title: 'Electronic Beats' },
                ].map((item, index) => (
                    <TouchableOpacity key={index} style={styles.card}>
                        <ImageBackground
                            source={item.image}
                            style={styles.cardImage}
                            imageStyle={styles.cardImageStyle}
                        >
                            <View style={styles.cardOverlay}>
                                <Text style={styles.cardTitle}>{item.title}</Text>
                                <TouchableOpacity style={styles.playButton}>
                                    <Ionicons name="play-circle" size={50} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Bottom Navigation Bar */}
            {/*<View style={[styles.bottomNav, { paddingBottom: insets.bottom }]}>
                <TouchableOpacity style={styles.navButton} onPress={() => {}}>
                    <Ionicons name="home" size={28} color="#fff" />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navButton} onPress={navigateToSearch}>
                    <Ionicons name="search" size={28} color="#aaa" />
                    <Text style={styles.navText}>Search</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navButton} onPress={() => {}}>
                    <Ionicons name="library" size={28} color="#aaa" />
                    <Text style={styles.navText}>Library</Text>
                </TouchableOpacity>
            </View>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#121212',
    },
    header: {
        height: 140,
        width: '100%',
        zIndex: 1,
    },
    headerBackground: {
        width: '100%',
        height: '100%',
    },
    headerContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    searchButton: {
        padding: 10,
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        paddingBottom: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff',
        marginLeft: 16,
        marginTop: 16,
        marginBottom: 12,
    },
    card: {
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    cardImage: {
        height: 220,
        justifyContent: 'flex-end',
    },
    cardImageStyle: {
        borderRadius: 12,
    },
    cardOverlay: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'space-between',
        padding: 16,
    },
    cardTitle: {
        color: '#ffffff',
        fontSize: 22,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    playButton: {
        alignSelf: 'flex-end',
    },
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: '#222',
        paddingTop: 12,
    },
    navButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navText: {
        color: '#fff',
        marginTop: 4,
    },
});