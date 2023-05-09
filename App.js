import React, { useState } from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { TextInput } from 'react-native';

const App = () => {
  const [messages, setMessages] = useState([]);

  const handleUserInput = (text) => {
    const userMessage = {
      _id: messages.length + 1,
      text,
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'User',
      },
    };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, userMessage)
    );
    handleBotResponse(text);
  };

  const handleBotResponse = (text) => {
    const botMessage = {
      _id: messages.length + 2,
      text: '',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Bot',
      },
    };
    if (text.toLowerCase() === 'hello') {
      botMessage.text = 'Hi, how can I assist you?\n\nPlease choose an option:\n1. Option 1\n2. Option 2';
    } else if (text.toLowerCase() === 'option 1') {
      botMessage.text = 'You selected Option 1.';
    } else if (text.toLowerCase() === 'option 2') {
      botMessage.text = 'You selected Option 2.';
    } else {
      botMessage.text = 'Sorry, I didn\'t understand that. Can you please try again?';
    }
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, botMessage)
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) =>
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages)
          )
        }
        user={{ _id: 1 }}
      />
      <TextInput onChangeText={handleUserInput} />
    </View>
  );
};

export default App;
