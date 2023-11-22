
import React from "react";
import Colors from "../../constants/Colors";
import { Text, View } from "@gluestack-ui/themed";
import { StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import Logo from "../../assets/images/logo.svg"

export default function Header() {
  return (
    <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
            <View style={styles.actionRow}>
                <Text>Ethan Logo</Text>
                <TouchableOpacity style={styles.filterButton}>
                    <Text color="#fff">K</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  );
}


const styles =  StyleSheet.create({
    container: {
        height: 100
    },
    actionRow: {
        marginTop: 45,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        paddingBottom: 16,
    },
    filterButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
        borderRadius: 24,
        backgroundColor: Colors.primary
    }
})
