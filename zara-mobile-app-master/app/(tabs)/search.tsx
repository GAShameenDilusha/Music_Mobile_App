import React, { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    FlatList,
    TouchableOpacity,
    Modal,
    SafeAreaView,
    Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Type definitions
interface Song {
    id: string;
    title: string;
    artist: string;
    albumCoverImage: any;
    duration?: string; // Optional duration for the player
}

// MusicPlayer component for the popup
const MusicPlayer = ({
                         song,
                         isVisible,
                         onClose
                     }: {
    song: Song | null,
    isVisible: boolean,
    onClose: () => void
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    // Toggle play/pause
    const togglePlayback = () => {
        setIsPlaying(!isPlaying);
        // In a real app, you would control actual audio playback here
    };

    // If no song is selected, don't render anything
    if (!song) return null;

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={false}
            onRequestClose={onClose}
        >
            <SafeAreaView style={styles.playerContainer}>
                <View style={styles.playerHeader}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="chevron-down" size={30} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.playerHeaderText}>Now Playing</Text>
                    <TouchableOpacity style={styles.menuButton}>
                        <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.albumArtContainer}>
                    <Image source={song.albumCoverImage} style={styles.albumArt} />
                </View>

                <View style={styles.songInfoContainer}>
                    <Text style={styles.songTitle}>{song.title}</Text>
                    <Text style={styles.songArtist}>{song.artist}</Text>
                </View>

                <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                        <View style={[styles.progress, { width: `${progress}%` }]} />
                    </View>
                    <View style={styles.timeContainer}>
                        <Text style={styles.timeText}>0:00</Text>
                        <Text style={styles.timeText}>{song.duration || "3:45"}</Text>
                    </View>
                </View>

                <View style={styles.controlsContainer}>
                    <TouchableOpacity style={styles.controlButton}>
                        <Ionicons name="shuffle" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controlButton}>
                        <Ionicons name="play-skip-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.playButton} onPress={togglePlayback}>
                        <Ionicons
                            name={isPlaying ? "pause" : "play"}
                            size={30}
                            color="#000"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controlButton}>
                        <Ionicons name="play-skip-forward" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controlButton}>
                        <Ionicons name="repeat" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.extraControlsContainer}>
                    <TouchableOpacity style={styles.extraControlButton}>
                        <Ionicons name="heart-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.extraControlButton}>
                        <Ionicons name="share-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

// Card component
const Card = ({ title, description, imageSource }: { title: string; description: string; imageSource: any }) => {
    return (
        <View style={styles.card}>
            <Image source={imageSource} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardDescription}>{description}</Text>
        </View>
    );
};

// SongListItem component
const SongListItem = ({ song, onSelect }: { song: Song, onSelect: (song: Song) => void }) => {
    return (
        <TouchableOpacity
            style={styles.songItem}
            onPress={() => onSelect(song)}
        >
            <View style={styles.songDetails}>
                <Text style={styles.songTitle}>{song.title}</Text>
                <Text style={styles.songArtist}>{song.artist}</Text>
            </View>
            <Image source={song.albumCoverImage} style={styles.albumCover} />
        </TouchableOpacity>
    );
};

// Search component
const Search = () => {
    // Sample songs data with local images and durations
    const sampleSongs: Song[] = [
        { id: '1', title: 'Bohemian Rhapsody', artist: 'Queen', albumCoverImage: require('@/assets/img/album 1.jpeg'), duration: '5:54' },
        { id: '2', title: 'Stairway to Heaven', artist: 'Led Zeppelin', albumCoverImage: require('@/assets/img/album 2.jpeg'), duration: '8:02' },
        { id: '3', title: 'Hotel California', artist: 'Eagles', albumCoverImage: require('@/assets/img/album 3.jpg'), duration: '6:30' },
        { id: '4', title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', albumCoverImage: require('@/assets/img/album 4.jpg'), duration: '5:56' },
        { id: '5', title: 'Imagine', artist: 'John Lennon', albumCoverImage: require('@/assets/img/album 6.jpeg'), duration: '3:03' },
        { id: '6', title: 'Smells Like Teen Spirit', artist: 'Nirvana', albumCoverImage: require('@/assets/img/album 7.jpg'), duration: '5:01' },
        { id: '7', title: 'Billie Jean', artist: 'Michael Jackson', albumCoverImage: require('@/assets/img/album 8.jpg'), duration: '4:54' },
        { id: '8', title: 'Like a Rolling Stone', artist: 'Bob Dylan', albumCoverImage: require('@/assets/img/album 9.jpeg'), duration: '6:13' },
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Song[]>([]);
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);
    const [playerVisible, setPlayerVisible] = useState(false);

    const handleSearch = (query: string) => {
        setSearchQuery(query);

        // Implement search logic here
        const filteredSongs = sampleSongs.filter(
            song =>
                song.title.toLowerCase().includes(query.toLowerCase()) ||
                song.artist.toLowerCase().includes(query.toLowerCase())
        );

        setSearchResults(filteredSongs);
    };

    const handleSongSelect = (song: Song) => {
        setSelectedSong(song);
        setPlayerVisible(true);
    };

    const closePlayer = () => {
        setPlayerVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <TextInput
                    style={styles.searchBar}
                    value={searchQuery}
                    onChangeText={handleSearch}
                    placeholder="Search songs or artists..."
                />
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {searchQuery.length > 0 ? (
                    <FlatList
                        data={searchResults}
                        renderItem={({ item }) => (
                            <SongListItem
                                song={item}
                                onSelect={handleSongSelect}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                        ListEmptyComponent={
                            <Text style={styles.noResults}>No songs found matching "{searchQuery}"</Text>
                        }
                    />
                ) : (
                    <View style={styles.cardContainer}>
                        <Card
                            title="Top Hits"
                            description="The most popular songs right now"
                            imageSource={require('@/assets/img/album 1.jpeg')}
                        />
                        <Card
                            title="New Releases"
                            description="Check out the newest music"
                            imageSource={require('@/assets/img/album 2.jpeg')}
                        />
                        <Card
                            title="Discover Weekly"
                            description="Personalized picks for you"
                            imageSource={require('@/assets/img/album 3.jpg')}
                        />
                        <Card
                            title="Throwback Hits"
                            description="Classics from the past decades"
                            imageSource={require('@/assets/img/album 4.jpg')}
                        />
                    </View>
                )}
            </ScrollView>

            {/* Music Player Modal */}
            <MusicPlayer
                song={selectedSong}
                isVisible={playerVisible}
                onClose={closePlayer}
            />
        </View>
    );
};

export default Search;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#121212",
        width: "100%",
        height: "auto",
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0,
        paddingBottom: 20,
        flex: 1,
    },
    searchBarContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 25,
    },
    searchBar: {
        height: 40,
        width: 360,
        borderColor: "gray",
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
    },
    cardContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        padding: 10,
        gap: 10,
    },
    card: {
        backgroundColor: "#f9f9f9",
        height: 350,
        width: "48%",
        overflow: "hidden",
        borderRadius: 8,
        marginBottom: 10,
    },
    cardImage: {
        width: "100%",
        height: 200,
    },
    cardTitle: {
        fontSize: 12,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 14,
        color: "#666",
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    scrollView: {
        flex: 1,
    },
    songItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
    },
    songDetails: {
        flex: 1,
    },
    songTitle: {
        fontSize: 16,
        fontWeight: "500",
    },
    songArtist: {
        fontSize: 14,
        color: "#666",
    },
    albumCover: {
        width: 50,
        height: 50,
        borderRadius: 4,
    },
    noResults: {
        textAlign: "center",
        padding: 20,
        color: "#666",
        fontStyle: "italic",
    },

    // Music Player Styles
    playerContainer: {
        flex: 1,
        backgroundColor: "#121212",
        paddingHorizontal: 20,
    },
    playerHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        paddingBottom: 20,
    },
    playerHeaderText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
    },
    closeButton: {
        padding: 5,
    },
    menuButton: {
        padding: 5,
    },
    albumArtContainer: {
        alignItems: "center",
        marginVertical: 30,
    },
    albumArt: {
        width: width - 100,
        height: width - 100,
        borderRadius: 10,
    },
    songInfoContainer: {
        alignItems: "center",
        marginBottom: 30,
    },
    progressContainer: {
        marginBottom: 30,
    },
    progressBar: {
        height: 4,
        backgroundColor: "#333",
        borderRadius: 2,
    },
    progress: {
        height: 4,
        backgroundColor: "#1DB954", // Spotify green
        borderRadius: 2,
    },
    timeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    timeText: {
        color: "#999",
        fontSize: 12,
    },
    controlsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 40,
    },
    controlButton: {
        padding: 10,
    },
    playButton: {
        backgroundColor: "#1DB954", // Spotify green
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    extraControlsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    extraControlButton: {
        padding: 15,
    },
});