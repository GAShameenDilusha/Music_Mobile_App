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
} from "react-native";

// Type definitions
interface Song {
    id: string;
    title: string;
    artist: string;
    albumCoverImage: any; // Changed to accept local image requires
}

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
const SongListItem = ({ song }: { song: Song }) => {
    return (
        <TouchableOpacity style={styles.songItem}>
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
    // Sample songs data with local images
    const sampleSongs: Song[] = [
        { id: '1', title: 'Bohemian Rhapsody', artist: 'Queen', albumCoverImage: require('@/assets/img/music 10.jpg') },
        { id: '2', title: 'Stairway to Heaven', artist: 'Led Zeppelin', albumCoverImage: require('@/assets/img/music 10.jpg') },
        { id: '3', title: 'Hotel California', artist: 'Eagles', albumCoverImage: require('@/assets/img/music 10.jpg') },
        { id: '4', title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', albumCoverImage: require('@/assets/img/music 10.jpg') },
        { id: '5', title: 'Imagine', artist: 'John Lennon', albumCoverImage: require('@/assets/img/music 10.jpg') },
        { id: '6', title: 'Smells Like Teen Spirit', artist: 'Nirvana', albumCoverImage: require('@/assets/img/music 10.jpg') },
        { id: '7', title: 'Billie Jean', artist: 'Michael Jackson', albumCoverImage: require('@/assets/img/music 10.jpg') },
        { id: '8', title: 'Like a Rolling Stone', artist: 'Bob Dylan', albumCoverImage: require('@/assets/img/music 10.jpg') },
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Song[]>([]);

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
                        renderItem={({ item }) => <SongListItem song={item} />}
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
                            imageSource={require('@/assets/img/music 10.jpg')}
                        />
                        <Card
                            title="New Releases"
                            description="Check out the newest music"
                            imageSource={require('@/assets/img/music 10.jpg')}
                        />
                        <Card
                            title="Discover Weekly"
                            description="Personalized picks for you"
                            imageSource={require('@/assets/img/music 10.jpg')}
                        />
                        <Card
                            title="Throwback Hits"
                            description="Classics from the past decades"
                            imageSource={require('@/assets/img/music 10.jpg')}
                        />
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default Search;

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
    linkContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 50,
        marginLeft: 60,
        marginRight: 60,
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
    linkContainerBottom: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        marginLeft: 60,
        marginRight: 180,
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
});