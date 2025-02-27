import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    Modal,
    SafeAreaView,
    Dimensions,
    ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Type definitions
interface Song {
    id: string;
    title: string;
    artist: string;
    albumCoverImage: any;
    duration?: string;
}

interface Playlist {
    id: string;
    name: string;
    songs: Song[];
    coverImage?: any;
}

// Playlist Detail Component
const PlaylistDetail = ({
                            playlist,
                            isVisible,
                            onClose
                        }: {
    playlist: Playlist | null;
    isVisible: boolean;
    onClose: () => void;
}) => {
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);
    const [playerVisible, setPlayerVisible] = useState(false);

    if (!playlist) return null;

    // Get cover image from first song or use default
    const playlistCover = playlist.songs.length > 0
        ? playlist.songs[0].albumCoverImage
        : require('@/assets/img/album 1.jpeg');

    const handleSongSelect = (song: Song) => {
        setSelectedSong(song);
        setPlayerVisible(true);
    };

    const closePlayer = () => {
        setPlayerVisible(false);
    };

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={false}
            onRequestClose={onClose}
        >
            <SafeAreaView style={styles.playlistDetailContainer}>
                <View style={styles.playlistHeader}>
                    <TouchableOpacity onPress={onClose} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.playlistHeaderTitle}>{playlist.name}</Text>
                </View>

                <View style={styles.playlistInfoContainer}>
                    <Image source={playlistCover} style={styles.playlistCoverImage} />
                    <Text style={styles.playlistTitle}>{playlist.name}</Text>
                    <Text style={styles.playlistSongCount}>{playlist.songs.length} songs</Text>
                </View>

                {playlist.songs.length > 0 ? (
                    <FlatList
                        data={playlist.songs}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.songListItem}
                                onPress={() => handleSongSelect(item)}
                            >
                                <Image source={item.albumCoverImage} style={styles.songAlbumCover} />
                                <View style={styles.songInfo}>
                                    <Text style={styles.songTitle}>{item.title}</Text>
                                    <Text style={styles.songArtist}>{item.artist}</Text>
                                </View>
                                <TouchableOpacity style={styles.songMoreButton}>
                                    <Ionicons name="ellipsis-vertical" size={20} color="#fff" />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id}
                        ListEmptyComponent={
                            <Text style={styles.emptyMessage}>No songs in this playlist yet.</Text>
                        }
                    />
                ) : (
                    <View style={styles.emptyPlaylistContainer}>
                        <Text style={styles.emptyMessage}>This playlist is empty. Add songs from the Search tab.</Text>
                    </View>
                )}

                {/* Music Player Modal */}
                <MusicPlayer
                    song={selectedSong}
                    isVisible={playerVisible}
                    onClose={closePlayer}
                />
            </SafeAreaView>
        </Modal>
    );
};

// MusicPlayer component
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
                    <Text style={styles.playerSongTitle}>{song.title}</Text>
                    <Text style={styles.playerSongArtist}>{song.artist}</Text>
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

// Main Menu Component
const Menu = () => {
    // Sample songs data with album images
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

    // Example playlist data with songs from sample data
    const [playlists, setPlaylists] = useState<Playlist[]>([
        {
            id: '1',
            name: 'Workout Mix',
            songs: [sampleSongs[0], sampleSongs[3], sampleSongs[5]],
        },
        {
            id: '2',
            name: 'Chill Vibes',
            songs: [sampleSongs[1], sampleSongs[4]],
        },
        {
            id: '3',
            name: 'Road Trip',
            songs: [sampleSongs[2], sampleSongs[6], sampleSongs[7]],
        }
    ]);

    // State for new playlist creation
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState('');

    // State for selected playlist detail
    const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
    const [playlistDetailVisible, setPlaylistDetailVisible] = useState(false);

    // Function to handle creating a new playlist
    const handleCreatePlaylist = () => {
        if (newPlaylistName.trim()) {
            const newPlaylist: Playlist = {
                id: Date.now().toString(),
                name: newPlaylistName,
                songs: []
            };
            setPlaylists([...playlists, newPlaylist]);
            setNewPlaylistName('');
            setShowCreateForm(false);
        }
    };

    // Function to handle opening a playlist
    const handleOpenPlaylist = (playlist: Playlist) => {
        setSelectedPlaylist(playlist);
        setPlaylistDetailVisible(true);
    };

    // Function to close playlist detail
    const closePlaylistDetail = () => {
        setPlaylistDetailVisible(false);
    };

    // Get cover image for playlist (using first song's cover or default)
    const getPlaylistCover = (playlist: Playlist) => {
        return playlist.songs.length > 0
            ? playlist.songs[0].albumCoverImage
            : require('@/assets/img/album 1.jpeg');
    };

    return (
        <View style={styles.container}>
            {!showCreateForm ? (
                <TouchableOpacity
                    style={styles.createButton}
                    onPress={() => setShowCreateForm(true)}
                >
                    <Text style={styles.createButtonText}>Create New Playlist</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.createForm}>
                    <TextInput
                        style={styles.input}
                        placeholder="Playlist name"
                        value={newPlaylistName}
                        onChangeText={setNewPlaylistName}
                    />
                    <View style={styles.formButtons}>
                        <TouchableOpacity
                            style={[styles.formButton, styles.cancelButton]}
                            onPress={() => {
                                setShowCreateForm(false);
                                setNewPlaylistName('');
                            }}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.formButton, styles.saveButton]}
                            onPress={handleCreatePlaylist}
                        >
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <Text style={styles.sectionTitle}>Your Playlists</Text>

            <FlatList
                data={playlists}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.playlistItem}
                        onPress={() => handleOpenPlaylist(item)}
                    >
                        <Image
                            source={getPlaylistCover(item)}
                            style={styles.playlistCover}
                        />
                        <View style={styles.playlistInfo}>
                            <Text style={styles.playlistName}>{item.name}</Text>
                            <Text style={styles.songCount}>{item.songs.length} songs</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={
                    <Text style={styles.emptyMessage}>No playlists found. Create one!</Text>
                }
            />

            {/* Playlist Detail Modal */}
            <PlaylistDetail
                playlist={selectedPlaylist}
                isVisible={playlistDetailVisible}
                onClose={closePlaylistDetail}
            />
        </View>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 15,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 15,
    },
    createButton: {
        marginVertical: 10,
        padding: 15,
        backgroundColor: '#1DB954', // Spotify green
        borderRadius: 8,
        alignItems: 'center',
    },
    createButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    createForm: {
        marginVertical: 10,
        padding: 15,
        backgroundColor: '#282828',
        borderRadius: 8,
    },
    input: {
        backgroundColor: '#333',
        padding: 12,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#444',
        fontSize: 16,
        color: '#fff',
    },
    formButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    formButton: {
        flex: 1,
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#333',
        marginRight: 5,
    },
    saveButton: {
        backgroundColor: '#1DB954',
        marginLeft: 5,
    },
    cancelButtonText: {
        color: '#fff',
        fontWeight: '500',
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    playlistItem: {
        padding: 10,
        borderRadius: 6,
        marginBottom: 10,
        backgroundColor: '#282828',
        flexDirection: 'row',
        alignItems: 'center',
    },
    playlistCover: {
        width: 60,
        height: 60,
        borderRadius: 4,
    },
    playlistInfo: {
        marginLeft: 15,
        flex: 1,
    },
    playlistName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
        marginBottom: 4,
    },
    songCount: {
        fontSize: 14,
        color: '#aaa',
    },
    emptyMessage: {
        textAlign: 'center',
        padding: 20,
        color: '#aaa',
        fontStyle: 'italic',
    },

    // Playlist Detail Styles
    playlistDetailContainer: {
        flex: 1,
        backgroundColor: '#121212',
    },
    playlistHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    backButton: {
        marginRight: 15,
    },
    playlistHeaderTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    playlistInfoContainer: {
        alignItems: 'center',
        padding: 20,
    },
    playlistCoverImage: {
        width: 160,
        height: 160,
        borderRadius: 4,
        marginBottom: 20,
    },
    playlistTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    playlistSongCount: {
        color: '#aaa',
        fontSize: 16,
    },
    songListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    songAlbumCover: {
        width: 50,
        height: 50,
        borderRadius: 4,
    },
    songInfo: {
        flex: 1,
        marginLeft: 15,
    },
    songTitle: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 4,
    },
    songArtist: {
        color: '#aaa',
        fontSize: 14,
    },
    songMoreButton: {
        padding: 10,
    },
    emptyPlaylistContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
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
    playerSongTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
    },
    playerSongArtist: {
        color: "#aaa",
        fontSize: 16,
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

export default Menu;