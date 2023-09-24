import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const Loader = ({ text }) => {
    return (
        <View style={styles.container}>
            <View style={styles.loaderContainer}>
                <Spinner
                    visible={true}
                    textContent={text}
                    textStyle={styles.loaderText}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)'
    },
    loaderContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    loaderText: {
        color: 'black',
        fontSize: 16,
        marginTop: 10,
    },
});

export default Loader;
