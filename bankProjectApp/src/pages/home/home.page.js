import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import styles from "./home.style"

const Home = props => {
    return (
        <View sytle={styles.container}>
            <View style={styles.title}>
                <Text>
                    title
                </Text>
            </View>
            <View style={styles.content}>
                <TouchableOpacity>
                    <Text>
                        botao
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>
                        botao
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>
                        botao
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>
                        botao
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Home