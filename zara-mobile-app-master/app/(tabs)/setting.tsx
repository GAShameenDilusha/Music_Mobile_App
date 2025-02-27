import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';

// Define Types
type RootStackParamList = {
    Login: undefined;
    EditProfile: { user: UserData; onUpdate: (updatedUser: UserData) => void };
    AppSettings: undefined;
    PrivacySettings: undefined;
    NotificationSettings: undefined;
    PremiumSubscription: undefined;
};

type SettingScreenNavigationProp = StackNavigationProp<RootStackParamList>;


interface SettingProps {
    navigation: SettingScreenNavigationProp;
}

interface UserData {
    username: string;
    email: string;
    profileImage: any; // Changed to any to allow for require() result
    isPremium: boolean;
}


const Setting: React.FC<SettingProps> = ({ navigation }) => {
    const [user, setUser] = useState<UserData>({
        username: 'Shameen',
        email: 'shameen@example.com',
        profileImage: require('@/assets/img/my profile.jpg'), // Fixed: Using proper require syntax
        isPremium: false
    });
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch user data on component mount
    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async (): Promise<void> => {
        try {
            // In a real app, this would come from an API
            // For demo purposes, we'll check if we have stored user data
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                // Parse the stored data
                const parsedData = JSON.parse(userData);

                // We need to handle the profileImage separately since require() can't be stored in AsyncStorage
                setUser({
                    ...parsedData,
                    // Ensure we always use the require for the profile image
                    profileImage: require('@/assets/img/album 4.jpg')
                });
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setLoading(false);
        }
    };

    const handleEditProfile = (): void => {
        // Navigate to edit profile screen
        navigation.navigate('EditProfile', { user, onUpdate: handleProfileUpdate });
    };

    const handleSettings = (): void => {
        navigation.navigate('AppSettings');
    };

    const handlePrivacy = (): void => {
        navigation.navigate('PrivacySettings');
    };

    const handleNotifications = (): void => {
        navigation.navigate('NotificationSettings');
    };

    const handleProfileUpdate = (updatedUser: UserData): void => {
        // Make sure we preserve the profileImage require
        const updatedUserWithImage = {
            ...updatedUser,
            profileImage: require('@/assets/img/album 4.jpg')
        };

        setUser(updatedUserWithImage);

        // When saving to AsyncStorage, we need to handle the profileImage differently
        // since we can't serialize the require() result
        const userDataForStorage = {
            ...updatedUser,
            // Just store a reference path instead of the actual require result
            profileImage: '@/assets/img/album 4.jpg'
        };

        // Save to persistent storage
        saveUserData(userDataForStorage);
    };

    const saveUserData = async (userData: any): Promise<void> => {
        try {
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };

    const handleGetPremium = (): void => {
        // In a real app, this would navigate to subscription flow
        Alert.alert(
            "Subscribe to Premium",
            "Would you like to upgrade to SHAM Premium?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Continue",
                    onPress: () => navigation.navigate('PremiumSubscription')
                }
            ]
        );
    };

    const handleLogout = (): void => {
        Alert.alert(
            "Logout",
            "Are you sure you want to log out?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Logout",
                    onPress: async () => {
                        try {
                            // Clear user session
                            await AsyncStorage.removeItem('userToken');
                            await AsyncStorage.removeItem('userData');
                            // Navigate to login screen
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Login' }],
                            });
                        } catch (error) {
                            console.error('Error logging out:', error);
                        }
                    }
                }
            ]
        );
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#1DB954" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header with profile image */}
            <View style={styles.header}>
                <Image
                    source={user.profileImage} // Use the image directly, no need for {uri}
                    style={styles.profileImage}
                />
                <Text style={styles.username}>{user.username}</Text>
                <Text style={styles.email}>{user.email}</Text>
            </View>

            {/* Option buttons with icons */}
            <View style={styles.optionsContainer}>
                <TouchableOpacity style={styles.option} onPress={handleEditProfile}>
                    <Ionicons name="person-outline" size={22} color="#fff" />
                    <Text style={styles.optionText}>Edit Profile</Text>
                    <Ionicons name="chevron-forward" size={22} color="#b3b3b3" style={styles.chevron} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.option} onPress={handleSettings}>
                    <Ionicons name="settings-outline" size={22} color="#fff" />
                    <Text style={styles.optionText}>Settings</Text>
                    <Ionicons name="chevron-forward" size={22} color="#b3b3b3" style={styles.chevron} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.option} onPress={handlePrivacy}>
                    <Ionicons name="shield-checkmark-outline" size={22} color="#fff" />
                    <Text style={styles.optionText}>Privacy</Text>
                    <Ionicons name="chevron-forward" size={22} color="#b3b3b3" style={styles.chevron} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.option} onPress={handleNotifications}>
                    <Ionicons name="notifications-outline" size={22} color="#fff" />
                    <Text style={styles.optionText}>Notifications</Text>
                    <Ionicons name="chevron-forward" size={22} color="#b3b3b3" style={styles.chevron} />
                </TouchableOpacity>
            </View>

            {/* Premium section - only show if not already premium */}
            {!user.isPremium && (
                <View style={styles.premiumContainer}>
                    <Text style={styles.premiumTitle}>SHAM Premium</Text>
                    <Text style={styles.premiumDesc}>Get unlimited skips, no ads, and higher audio quality</Text>
                    <TouchableOpacity
                        style={styles.premiumButton}
                        onPress={handleGetPremium}
                    >
                        <Text style={styles.premiumButtonText}>GET PREMIUM</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Logout button */}
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
            >
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
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
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
        backgroundColor: '#1DB954', // SHAM green
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