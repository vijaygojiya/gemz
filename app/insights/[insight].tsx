import { Text } from "@gluestack-ui/themed";
import { useLocalSearchParams } from "expo-router";

export default function Insight(){
    const {insight} = useLocalSearchParams<{insight:string}>();
    return (
        <Text>{insight}</Text>
    )
}