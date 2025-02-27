import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList,} from "react-native";
import {useState} from "react";

const Menu = () => {
    // Example playlist data
    const [playlists, setPlaylists] = useState([
        {
            id: '1',
            name: 'Workout Mix',
            songs: [
                { id: '101', title: 'Eye of the Tiger', artist: 'Survivor' },
                { id: '102', title: 'Stronger', artist: 'Kanye West' },
                { id: '103', title: 'Till I Collapse', artist: 'Eminem' },
                { id: '104', title: 'Power', artist: 'Kanye West' }
            ]
        },
        {
            id: '2',
            name: 'Chill Vibes',
            songs: [
                { id: '201', title: 'Redbone', artist: 'Childish Gambino' },
                { id: '202', title: 'Ivy', artist: 'Frank Ocean' },
                { id: '203', title: 'Nights', artist: 'Frank Ocean' }
            ]
        },
        {
            id: '3',
            name: 'Road Trip',
            songs: [
                { id: '301', title: 'Life is a Highway', artist: 'Rascal Flatts' },
                { id: '302', title: 'Take It Easy', artist: 'Eagles' },
                { id: '303', title: 'On The Road Again', artist: 'Willie Nelson' },
                { id: '304', title: 'Born to Run', artist: 'Bruce Springsteen' },
                { id: '305', title: 'Highway to Hell', artist: 'AC/DC' }
            ]
        }
    ]);

    // State for new playlist creation
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState('');

    // Function to handle creating a new playlist
    const handleCreatePlaylist = () => {
        if (newPlaylistName.trim()) {
            const newPlaylist = {
                id: Date.now().toString(),
                name: newPlaylistName,
                songs: []
            };
            setPlaylists([...playlists, newPlaylist]);
            setNewPlaylistName('');
            setShowCreateForm(false);
        }
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

            <FlatList
                data={playlists}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.playlistItem}>
                        <Text style={styles.playlistName}>{item.name}</Text>
                        <Text style={styles.songCount}>{item.songs.length} songs</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={
                    <Text style={styles.emptyMessage}>No playlists found. Create one!</Text>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 10,
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
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    input: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
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
        backgroundColor: '#f8f8f8',
        marginRight: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    saveButton: {
        backgroundColor: '#1DB954',
        marginLeft: 5,
    },
    cancelButtonText: {
        color: '#333',
        fontWeight: '500',
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    playlistItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    playlistName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff'
    },
    songCount: {
        fontSize: 14,
        color: '#fff',
    },
    emptyMessage: {
        textAlign: 'center',
        padding: 20,
        color: '#fff',
        fontStyle: 'italic',
    },
});

export default Menu;