import React, { useReducer, useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Modal,
  TextInput,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { createContainer } from 'react-tracked';
import styles from './styles/AppStyles';

const useValue = ({ reducer, initialState }) => useReducer(reducer, initialState);
const { Provider, useTracked } = createContainer(useValue);

const initialState = {
  name: '',
  age: '',
  score: 0,
  tasksLeft: 4,
  movie: false,
  water: false,
  book: false,
  music: false,
  food: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setName': return { ...state, name: action.name };
    case 'setAge': return { ...state, age: action.name };
    case 'setLeft': return { ...state, tasksLeft: state.tasksLeft - 1 };
    default: throw new Error(`unknown action type: ${action.type}`);
  }
};

const Main = () => {
  const [state, dispatch] = useTracked();
  return (

    <SafeAreaView style={styles.container}>

      <PopupModal style={styles.modalView} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <CardDone />
        <MovieApi />
        <BookApi />
        <MusicApi />
        <CardWater
          task="Cel codziennego picia"
          url={require('./assets/water.png')}
          desc="Do wypicia pozostało ci"
          name="movie"
        />

      </ScrollView>

    </SafeAreaView>

  );
};
const MovieApi = () => {

  const API_URL = 'https://api.themoviedb.org/3';

  const API_NAME = '/trending/movie/day';

  const API_KEY = 'de8158e319d1b86ec16b2227384789ab';

  const [movieData, setMovieData] = useState(Object);
  const [randMovie] = useState(Math.floor(Math.random() * 20));

  const API_IMAGE = 'https://image.tmdb.org/t/p/w500/';
  useEffect(() => {
    fetch(`${API_URL + API_NAME}?api_key=${API_KEY}&language=pl`)
      .then((response) => response.json())
      .then((responseJson) => {
        setMovieData(responseJson ? responseJson.results : null);
      });
  }, []);
  return (
    <Card
      task="Do obejrzenia: "
      url={{ uri: `${API_IMAGE}${movieData[randMovie] ? movieData[randMovie].poster_path : null}` }}
      title={movieData[randMovie] ? movieData[randMovie].title : null}
      desc={movieData[randMovie] ? movieData[randMovie].overview : null}
      name="movie"
    />
  );
};

const BookApi = () => {

  const API_URL = 'https://books.googleapis.com/books/v1/';

  const API_NAME = 'volumes?q=rozrywka&download=EPUB&filter=paid-ebooks&langRestrict=pl&maxAllowedMaturityRating=not-mature&printType=BOOKS&projection=LITE&key=';

  const API_KEY = 'AIzaSyAt97qFvyzzjxcYzJwlpOcxYHCdLDqLBms';

  const [bookData, setBookData] = useState(Object);
  const [randMovie] = useState(Math.floor(Math.random() * 10));

  useEffect(() => {
    fetch(`${API_URL + API_NAME}${API_KEY}`)
      .then((response) => response.json())
      .then((response) => (response ? response.items : null))
      .then((response) => (response ? response[randMovie] : null))
      .then((response) => (response ? response.volumeInfo : null))
      .then((responseEnd) => { setBookData(responseEnd || null); });
  }, []);
  return (
    <Card
      task="Do przeczytania: "
      title={bookData ? bookData.title : null}
      name="book"
      uri={bookData ? (bookData.imageLinks ? bookData.imageLinks.thumbnail : null) : null}
      desc={bookData ? bookData.description : null}
    />

  );
};
const MusicApi = () => {

  const API_URL = 'https://api.deezer.com/chart/0/tracks';

  const [musicData, setMusicData] = useState(Object);
  const [randMusic] = useState(Math.floor(Math.random() * 10));

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((response) => (response ? response.data : null))
      .then((response) => (response ? response[randMusic] : null))
      .then((responseEnd) => { setMusicData(responseEnd || null); });
  }, []);
  return (
    <Card
      task="Do przesłuchania: "
      title={musicData.title}
      name="music"
      uri={musicData ? (musicData.album ? musicData.album.cover_big : null) : null}
      desc={`Autor: ${musicData ? (musicData.artist ? musicData.artist.name : null) : null}`}
    />

  );
};
const Card = (props) => {
  const [isVisible, setIsVisible] = useState(true);
  const [state, dispatch] = useTracked();
  return (isVisible ? (
    <View style={styles.card}>
      <Image
        style={styles.cover}
        source={
        props.url ? props.url : { uri: props.uri }
        }
      />

      <View style={props.disableHide ? ([styles.content, styles.contentCenter]) : styles.content}>

        <Text style={styles.text} numberOfLines={2}>
          {props.task}
          {props.title}
        </Text>
        <Text style={styles.opis} numberOfLines={5}>{props.desc}</Text>

        {(!props.disableHide ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setIsVisible(!isVisible);
              dispatch({ type: 'setLeft' });
            }}

          >
            <Text style={styles.btnText}>
              Wykonane
            </Text>
          </TouchableOpacity>

        ) : null)}
      </View>
    </View>
  ) : null);
};
const CardDone = () => {
  const [state, dispatch] = useTracked();
  if (state.tasksLeft === 0) {
    return (
      <Card
        url={require('./assets/icon.png')}
        title="Gratulacje wykonałeś wszystkie zadania!"
        disableHide
      />
    );
  }
  return (
    <Card
      url={require('./assets/icon.png')}
      title={`${'Cześć '}${state.name}`}
      desc={`Zadań do wykonania: ${state.tasksLeft}`}
      disableHide
    />
  );
};
const CardWater = (props) => {
  const [isVisible, setIsVisible] = useState(true);
  const [remainingWater, setRemainingWater] = useState(2.5);
  const [state, dispatch] = useTracked();

  return (isVisible ? (
    <View style={styles.card}>
      <Image
        style={styles.cover}
        source={
        props.url
      }
      />

      <View style={styles.content}>

        <Text style={styles.text}>
          {props.task}
          {props.title}
        </Text>
        <Text style={styles.opis}>
          {props.desc}
          {' '}
          {remainingWater}
          l wody
        </Text>

        <View style={{ flexDirection: 'row' }}>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (remainingWater > 0) {
                setRemainingWater(remainingWater - 0.25);
              }
            }}

          >
            <Text style={styles.btnText}>
              -0.25
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              dispatch({ type: 'setLeft' });
              setIsVisible(!isVisible);
            }}

          >
            <Text style={styles.btnText}>
              Wykonane
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    </View>
  ) : null);
};

const PopupModal = () => {
  const [state, dispatch] = useTracked();
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <Modal animationType="fade" transparent visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            {`${'Cześć '}${state.name}`}

          </Text>
          <Text style={styles.modalText}>Potrzebujemy informacji o tobie</Text>

          <TextInput
            placeholder="Imie"
            maxLength={30}
            style={styles.modalInput}
            value={state.name}
            onChangeText={(event) => dispatch({ type: 'setName', name: event })}
          />

          <TextInput
            placeholder="Wiek"
            maxLength={2}
            style={styles.modalInput}
            value={state.age}
            onChangeText={(event) => dispatch({ type: 'setAge', age: event })}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.btnText}>
              Zapisz
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const App = () => {
  return (
    <Provider reducer={reducer} initialState={initialState}>
      <StatusBar backgroundColor="#00eaa4" />

      <Main />
    </Provider>
  );
};
export default App;
