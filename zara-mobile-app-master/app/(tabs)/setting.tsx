import {StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
import {Ionicons} from '@expo/vector-icons'; // Assuming you're using Expo for icons

const Setting = () => {
    return (
        <View style={styles.container}>
            {/* Header with profile image */}
            <View style={styles.header}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/100' }}
                    style={styles.profileImage}
                />
                <Text style={styles.username}>Username</Text>
                <Text style={styles.email}>user@example.com</Text>
            </View>

            {/* Option buttons with icons */}
            <View style={styles.optionsContainer}>
                <TouchableOpacity style={styles.option}>
                    <Ionicons name="person-outline" size={22} color="#fff" />
                    <Text style={styles.optionText}>Edit Profile</Text>
                    <Ionicons name="chevron-forward" size={22} color="#b3b3b3" style={styles.chevron} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.option}>
                    <Ionicons name="settings-outline" size={22} color="#fff" />
                    <Text style={styles.optionText}>Settings</Text>
                    <Ionicons name="chevron-forward" size={22} color="#b3b3b3" style={styles.chevron} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.option}>
                    <Ionicons name="shield-checkmark-outline" size={22} color="#fff" />
                    <Text style={styles.optionText}>Privacy</Text>
                    <Ionicons name="chevron-forward" size={22} color="#b3b3b3" style={styles.chevron} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.option}>
                    <Ionicons name="notifications-outline" size={22} color="#fff" />
                    <Text style={styles.optionText}>Notifications</Text>
                    <Ionicons name="chevron-forward" size={22} color="#b3b3b3" style={styles.chevron} />
                </TouchableOpacity>
            </View>

            {/* Premium section */}
            <View style={styles.premiumContainer}>
                <Text style={styles.premiumTitle}>Spotify Premium</Text>
                <Text style={styles.premiumDesc}>Get unlimited skips, no ads, and higher audio quality</Text>
                <TouchableOpacity style={styles.premiumButton}>
                    <Text style={styles.premiumButtonText}>GET PREMIUM</Text>
                </TouchableOpacity>
            </View>

            {/* Logout button */}
            <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Log out</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 40,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    email: {
        fontSize: 14,
        color: '#b3b3b3',
    },
    optionsContainer: {
        marginBottom: 30,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: '#333',
    },
    optionText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 15,
        flex: 1,
    },
    chevron: {
        marginLeft: 'auto',
    },
    premiumContainer: {
        backgroundColor: '#222',
        borderRadius: 8,
        padding: 20,
        marginBottom: 30,
    },
    premiumTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    premiumDesc: {
        color: '#b3b3b3',
        fontSize: 14,
        marginBottom: 15,
    },
    premiumButton: {
        backgroundColor: '#1DB954', // Spotify green
        borderRadius: 25,
        paddingVertical: 12,
        alignItems: 'center',
    },
    premiumButtonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 14,
    },
    logoutButton: {
        alignItems: 'center',
        paddingVertical: 15,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Setting;