import Ionicons from '@expo/vector-icons/Ionicons';
import {Linking, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ThemedText } from '@/components/ThemedText';
import { Image } from 'react-native';

export default function TabTwoScreen() {
    const openLink = (url) => {
        Linking.openURL(url);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header with Logo */}
            <View style={styles.header}>
                <Image
                    style={styles.logo}
                    source={require('@/assets/img/test.jpg')}
                    resizeMode="contain"
                />
                <ThemedText style={styles.title}>SHAM</ThemedText>
                <ThemedText style={styles.subtitle}>Your Premium Music Experience</ThemedText>
            </View>

            {/* Mission Statement */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Ionicons name="musical-notes" size={24} color="#1DB954" />
                    <ThemedText style={styles.sectionTitle}>Our Mission</ThemedText>
                </View>
                <ThemedText style={styles.text}>
                    At SHAM, we're passionate about connecting people through the power of music.
                    Our platform is designed to provide a seamless listening experience that brings you
                    closer to the artists you love and helps you discover new sounds every day.
                </ThemedText>
            </View>

            {/* What We Offer */}
            <Collapsible
                title="What We Offer"
                titleStyle={styles.collapsibleTitle}
                containerStyle={styles.collapsibleContainer}
            >
                <View style={styles.featureRow}>
                    <View style={styles.feature}>
                        <Ionicons name="headset" size={32} color="#1DB954" style={styles.featureIcon} />
                        <ThemedText style={styles.featureTitle}>Premium Sound</ThemedText>
                        <ThemedText style={styles.featureText}>High-definition audio quality for the ultimate listening experience</ThemedText>
                    </View>
                    <View style={styles.feature}>
                        <Ionicons name="compass" size={32} color="#1DB954" style={styles.featureIcon} />
                        <ThemedText style={styles.featureTitle}>Discovery</ThemedText>
                        <ThemedText style={styles.featureText}>AI-powered recommendations based on your unique taste</ThemedText>
                    </View>
                </View>
                <View style={styles.featureRow}>
                    <View style={styles.feature}>
                        <Ionicons name="list" size={32} color="#1DB954" style={styles.featureIcon} />
                        <ThemedText style={styles.featureTitle}>Curated Playlists</ThemedText>
                        <ThemedText style={styles.featureText}>Expert-crafted collections for every mood and moment</ThemedText>
                    </View>
                    <View style={styles.feature}>
                        <Ionicons name="people" size={32} color="#1DB954" style={styles.featureIcon} />
                        <ThemedText style={styles.featureTitle}>Community</ThemedText>
                        <ThemedText style={styles.featureText}>Connect with friends and share your musical journey</ThemedText>
                    </View>
                </View>
            </Collapsible>

            {/* Our Story */}
            <Collapsible
                title="Our Story"
                titleStyle={styles.collapsibleTitle}
                containerStyle={styles.collapsibleContainer}
            >
                <ThemedText style={styles.text}>
                    Founded in 2023, SHAM began with a simple idea: music should be accessible,
                    personal, and community-driven. Our team of music enthusiasts and technology
                    experts came together to create a platform that respects artists while
                    delivering an unparalleled experience to listeners.
                </ThemedText>
                <ThemedText style={styles.text}>
                    Today, we're proud to serve millions of music lovers worldwide,
                    constantly evolving our platform based on your feedback and the changing
                    landscape of the music industry.
                </ThemedText>
                <Image
                    style={styles.storyImage}
                    source={require('@/assets/img/test.jpg')}
                    resizeMode="cover"
                />
            </Collapsible>

            {/* Contact Section */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Ionicons name="mail" size={24} color="#1DB954" />
                    <ThemedText style={styles.sectionTitle}>Get In Touch</ThemedText>
                </View>
                <ThemedText style={styles.text}>
                    We'd love to hear from you! Reach out with questions, feedback, or just to say hello.
                </ThemedText>
                <View style={styles.socialLinks}>
                    <TouchableOpacity style={styles.socialButton} onPress={() => openLink('https://twitter.com/shammusic')}>
                        <Ionicons name="logo-twitter" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton} onPress={() => openLink('https://instagram.com/shammusic')}>
                        <Ionicons name="logo-instagram" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton} onPress={() => openLink('mailto:support@shammusic.com')}>
                        <Ionicons name="mail" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <ThemedText style={styles.footerText}>© 2025 SHAM Music. All rights reserved.</ThemedText>
                <ThemedText style={styles.footerLink} onPress={() => openLink('https://shammusic.com/privacy')}>
                    Privacy Policy
                </ThemedText>
                <ThemedText style={styles.footerLink} onPress={() => openLink('https://shammusic.com/terms')}>
                    Terms of Service
                </ThemedText>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    header: {
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#1DB954', // Spotify green color
        fontStyle: 'italic',
    },
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginLeft: 10,
    },
    text: {
        fontSize: 16,
        color: '#E0E0E0',
        lineHeight: 24,
        marginBottom: 15,
    },
    collapsibleTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    collapsibleContainer: {
        backgroundColor: '#1E1E1E',
        borderRadius: 8,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 5,
        borderLeftWidth: 3,
        borderLeftColor: '#1DB954',
    },
    featureRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    feature: {
        flex: 1,
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#252525',
        borderRadius: 8,
        marginHorizontal: 5,
    },
    featureIcon: {
        marginBottom: 10,
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    featureText: {
        fontSize: 14,
        color: '#CCCCCC',
        textAlign: 'center',
    },
    storyImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginTop: 10,
    },
    socialLinks: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    socialButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#1DB954',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    footer: {
        padding: 20,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#999999',
        marginBottom: 10,
    },
    footerLink: {
        fontSize: 14,
        color: '#1DB954',
        marginVertical: 5,
        textDecorationLine: 'underline',
    }
});
