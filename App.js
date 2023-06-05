import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import styled from "styled-components/native";

const Post = styled.View`

  flex-direction: row;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-style: solid;
`;

const PostImage = styled.Image`
  width: 100px;
  height: 100px;
`;

const PostTitle = styled.Text`
  font-size: 16px;
  font-weight: 700;
`;

const PostDetails = styled.View`
  justify-content: center;
`;

const PostDate = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
  margin-top: 2px;
`;

export default function App() {
  return (
    <View>
      <Post>
        <Image
        style={{
          height: 100,
          width: 100,
        }}
        source={{uri: "https://memesmix.net/media/created/4nfxd7.jpg"}}
        />
        <PostDetails>
          <PostTitle>Текстовая статья</PostTitle>
          <PostDate>05.06.2023</PostDate>
        </PostDetails>
      </Post>
      <Post>
        <Image
        style={{
          height: 100,
          width: 100,
        }}
        source={{uri: "https://memesmix.net/media/created/4nfxd7.jpg"}}
        />
        <PostDetails>
          <PostTitle>Текстовая статья</PostTitle>
          <PostDate>05.06.2023</PostDate>
        </PostDetails>
      </Post>
      <Post>
        <Image
        style={{
          height: 100,
          width: 100,
        }}
        source={{uri: "https://memesmix.net/media/created/4nfxd7.jpg"}}
        />
        <PostDetails>
          <PostTitle>Текстовая статья</PostTitle>
          <PostDate>05.06.2023</PostDate>
        </PostDetails>
      </Post>
      <StatusBar hidden={true} theme="auto"/>
    </View>
  );
}
