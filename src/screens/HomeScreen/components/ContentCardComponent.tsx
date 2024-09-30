import React from "react";
import { View } from "react-native";
import { Card, Divider, IconButton, Text } from "react-native-paper";
import styles from "../../../themes/styles";
import { Content } from "../HomeScreen";
import { CommonActions, useNavigation } from "@react-navigation/native";

interface Props {
  content: Content;
}

export const ContentCardComponent = ({ content }: Props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.contentCard}>
      <Card.Title
        title={content.name}
        subtitle={content.category}
        right={() => (
          <IconButton
            icon="information-outline"
            size={30}
            onPress={() =>
              navigation.dispatch(
                CommonActions.navigate({ name: "Detail", params: { content } })
              )
            }
          />
        )}
      />
      <Divider />
    </View>
  );
};
