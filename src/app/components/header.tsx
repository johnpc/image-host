import {
  Card,
  View,
  Heading,
  Flex,
  Text,
  useTheme,
} from "@aws-amplify/ui-react";

export const Header = () => {
  const { tokens } = useTheme();
  return (
    <View
      backgroundColor={tokens.colors.background.secondary}
      padding={tokens.space.medium}
      width={"100%"}
      textAlign={"center"}
    >
      <Card>
        <Flex direction="row" alignItems="flex-start">
          <Flex
            direction="column"
            alignItems="flex-start"
            gap={tokens.space.xs}
          >
            <Heading level={1}>A2 IMGUR</Heading>

            <Text as="span">
              Free static file hosting. No logins, no limits, no ads, no BS.
            </Text>
          </Flex>
        </Flex>
      </Card>
    </View>
  );
};
