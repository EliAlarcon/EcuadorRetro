import React from "react";
import { View } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import styles from "../../../themes/styles";

export const ContentCardComponent = () => {
  return (
    <View style={styles.contentCard}>
      <Card.Title
        title="Card Title"
        subtitle="Card Subtitle"
        right={() => (
          <IconButton icon="information-outline" size={30} onPress={() => {}} />
        )}
      />
    </View>
  );
};
