import * as React from "react";
import { Dimensions, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { fruitItems } from "./items";
import { withAnchorPoint } from "./anchor-point";


const colors = ["#aa0fa1", "#40c231", "#9bc1ac",];

const window = Dimensions.get("window");

const PAGE_HEIGHT = window.width * 1.2;
const PAGE_WIDTH = window.width;

export const HeaderCarousel = () => {

  const baseOptions = {
    height: PAGE_HEIGHT,
    width: PAGE_WIDTH,
    vertical: false,
  };

  return (
    <View style={{ height: PAGE_HEIGHT - 60, marginTop: -60 }}>
      <Carousel
        {...baseOptions}
        loop
        // autoPlay
        withAnimation={{
          type: "spring",
          config: {
            damping: 13,
          },
        }}
        autoPlayInterval={1500}
        data={colors}
        renderItem={({ index, animationValue }) => (
          <Card
            animationValue={animationValue}
            key={index}
            index={index}
          />
        )}
      />
    </View>
  );
}

const Card = {
  index: number,
  animationValue: any
} = ({ index, animationValue }) => {
  const HEIGHT = PAGE_HEIGHT / 1.5;
  const WIDTH = PAGE_WIDTH / 1.5;

  const parentCardStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animationValue.value,
      [-0.1, 0, 1],
      [0.95, 1, 1],
      Extrapolate.CLAMP,
    );

    const translateX = interpolate(
      animationValue.value,
      [1, -0.2, 0, 1],
      [0, WIDTH * 0.3, 0, 0],
    );

    const transform = {
      transform: [
        { scale },
        { translateX },
        { perspective: 200 },
        {
          rotateY: `${interpolate(
            animationValue.value,
            [-1, 0, 0.4, 1],
            [30, 0, -25, -25],
            Extrapolate.CLAMP,
          )}deg`,
        },
      ],
    };

    return {
      ...withAnchorPoint(
        transform,
        { x: 0.5, y: 0.5 },
        { width: WIDTH, height: HEIGHT },
      ),
    };
  }, [index]);


  return (
    <Animated.View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.Image
        source={fruitItems[index % 3]}
        // entering={FadeIn.duration(100)}
        // exiting={FadeOut.duration(100)}
        style={[
          {
            backgroundColor: colors[index],
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            width: WIDTH,
            height: HEIGHT,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.44,
            shadowRadius: 10.32,

            // elevation: 16,
          },
          parentCardStyle,
        ]}

      />
    </Animated.View>
  );
};

