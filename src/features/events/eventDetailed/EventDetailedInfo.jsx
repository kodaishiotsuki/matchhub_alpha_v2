import React, { useEffect, useState } from "react";
import { Button, Grid, Icon, Label, Segment } from "semantic-ui-react";
import { format } from "date-fns";
import EventDetailedMap from "./EventDetailedMap";
import { useSelector } from "react-redux";
import {
  addUserFavoriteCompany,
  // deleteUserFavoriteCompany,
} from "../../../app/firestore/firestoreService";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../../app/config/firebase";
import { getAuth } from "firebase/auth";

export default function EventDetailedInfo({ event, isHost }) {
  const { authenticated } = useSelector((state) => state.auth);
  const [mapOpen, setMapOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [disable, setDisable] = useState(false);

  const [userType, setUserType] = useState([]);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;

  //コレクションuser,サブコレクションcompanies取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", user.email)
      );
      getDocs(q).then((querySnapshot) => {
        setUserType(querySnapshot.docs.map((doc) => doc.data())[0].userType);

        //コンソールで表示
        console.log(querySnapshot.docs.map((doc) => doc.data())[0].userType);
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [db, user.email]);

  //企業のお気に入り登録
  async function handleUserFavoriteCompany() {
    setLoading(true);
    try {
      await addUserFavoriteCompany(event);
    } catch (error) {
      console.log("fserror", error);
      throw error;
    } finally {
      // setDisable(true);
      setLoading(false);
    }
  }

  //この部分です！！
  function handleUserUnFavoriteCompany(company) {
    setLoading(true);
    try {
      // const getdocs = doc(db, "users", user.uid, "companies", company.id);
      // console.log(getdocs);
        // deleteDoc(setDoc(db, "users", user.uid, "companies", company.id));
      const q = query(
        collection(db, "users", user.uid, "companies"),
        where("userUid", "==", user.uid)
      );
      getDocs(q).then((querySnapshot) => {
        setUserType(querySnapshot.docs.map((doc) => doc.data())[0].userUid);

        //コンソールで表示
        console.log(querySnapshot.docs.map((doc) => doc.data())[0].userUid);
      });
    } catch (error) {
      console.log("fserror", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }



  return (
    <Segment.Group>
      <Segment
        textAlign='center'
        style={{ border: "none" }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        <h2>{event.title}とは</h2>
      </Segment>
      <Segment>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='info' />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{event.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>

      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='building' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{format(event.date, "yyyy/MM/dd ")}</span>
          </Grid.Column>
        </Grid>
      </Segment>

      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='users' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>
            <Label
              className='ui teal tag label'
              content={event.career[0]}
              style={{ marginRight: 25 }}
            />
            <Label
              className='ui teal tag label'
              content={event.career[1]}
              style={{ marginRight: 25 }}
            />
          </Grid.Column>
        </Grid>
      </Segment>

      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='marker' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{event.venue.address}</span>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
              onClick={() => setMapOpen(!mapOpen)}
              color='teal'
              content={mapOpen ? "地図を開く" : "地図を隠す"}
              disabled={!authenticated}
            />
          </Grid.Column>
        </Grid>
      </Segment>
      {mapOpen && <EventDetailedMap latLng={event.venue.latLng} />}

      <Segment attached='bottom' clearing>
        {/* 求職者のみ表示 */}
        {userType === "求職者" && (
          <Button
            color='orange'
            floated='right'
            style={{
              marginRight: 200,
              paddingRight: 50,
              paddingLeft: 50,
              fontSize: 20,
            }}
            onClick={handleUserFavoriteCompany}
            loading={loading}
          >
            お気に入り登録
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
}
