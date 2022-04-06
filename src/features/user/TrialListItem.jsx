// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  arrayRemove,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import {
  Button,
  Icon,
  Image,
  Item,
  Label,
  List,
  Segment,
} from "semantic-ui-react";
import { app } from "../../app/config/firebase";
// import { app } from "../../app/config/firebase";
import { addCompanyFavoriteUser } from "../../app/firestore/firestoreService";

export default function TrialListItem({ company }) {
  //FB
  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;
  //loading（お気に入り解除）
  const [deleteLoading, setDeleteLoading] = useState(false);
  //loading（お気に入り解除）
  const [loading, setLoading] = useState(false);
  //favoriteUsers
  const [favoriteUsers, setFavoriteUsers] = useState([]);

  //コレクションevents,favoriteUserId取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "events"),
        where("favoriteUserId", "array-contains", user.uid)
      );
      getDocs(q).then((querySnapshot) => {
        setFavoriteUsers(
          querySnapshot.docs.map((doc) => doc.data())[0].favoriteUserId[0]
        );

        //コンソールで表示
        console.log(
          querySnapshot.docs.map((doc) => doc.data())[0].favoriteUserId[0]
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [db, user.uid]);

  //お気に入り企業解除
  // console.log(company.id);
  async function deleteFavoriteCompany() {
    setDeleteLoading(true);
    try {
      await updateDoc(doc(db, "events", company.id), {
        favoriteUserId: arrayRemove(user.uid),
      });
    } catch (error) {
      console.log("fserror", error);
      throw error;
    } finally {
      // setDisable(true);
      setDeleteLoading(false);
    }
  }

  //企業のお気に入り登録
  async function handleUserFavoriteCompany() {
    setLoading(true);
    try {
      await addCompanyFavoriteUser();
    } catch (error) {
      console.log("fserror", error);
      throw error;
    } finally {
      // setDisable(true);
      setLoading(false);
    }
  }
  return (
    <Segment.Group>
      {/* events,favoriteUserIdとuser.uidが等しい */}
      {favoriteUsers === user.uid && (
        <>
          <Segment>
            <Item.Group>
              <Item>
                <Image
                  size='tiny'
                  rounded
                  src={`/assets/categoryImages/${company.category}.jpg`}
                  style={{ maxHeight: 150, width: 300 }}
                />
                <Item.Content>
                  <Item.Header
                    content={company.title}
                    style={{ fontSize: 45, marginTop: 20 }}
                  />
                  <br />
                  <Label
                    style={{ top: "-55px", fontSize: 20 }}
                    ribbon='right'
                    color='orange'
                    content={`トライアル期間：${company.trialMonth}ヶ月`}
                  />
                  <br />
                  <Icon name='tag' />
                  <Item.Header
                    content='求めている人材'
                    style={{ fontSize: 20 }}
                    icon='tags'
                  />
                  <br />
                  <Item.Content
                    className='ui teal tag label'
                    content={company.career[0]}
                  ></Item.Content>
                  <Item.Content
                    className='ui teal tag label'
                    content={company.career[1]}
                  ></Item.Content>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
          <Segment>
            <span>
              <Icon name='marker' />
              {company.venue.address}
            </span>
          </Segment>
          <Segment clearing style={{ maxHeight: 90 }}>
            <List floated='left' style={{ display: "flex" }}>
              {company.attendees.map((member) => (
                <List.Item
                  key={member.id}
                  as={Link}
                  to={`/profile/${member.id}`}
                  floated='left'
                >
                  <Image
                    circular
                    src={member.photoURL}
                    style={{ width: 60, marginRight: 15 }}
                  />
                </List.Item>
              ))}
            </List>
            <Button
              color='green'
              floated='right'
              content='トライアル申請'
              style={{
                paddingTop: 20,
                paddingBottom: 20,
                fontSize: 20,
                width: 200,
              }}
              loading={loading}
              onClick={addCompanyFavoriteUser}
            />
            <Button
              // color='green'
              floated='right'
              content='お気に入り解除'
              style={{
                paddingTop: 20,
                paddingBottom: 20,
                fontSize: 20,
                width: 200,
              }}
              loading={deleteLoading}
              onClick={deleteFavoriteCompany}
            />
            {/* <Button
          as={Link}
          to={`/events/${event.id}`} //イベント内容詳細ページへ遷移（idで判断）
          color='teal'
          floated='right'
          content='View'
        /> */}
          </Segment>
        </>
      )}
    </Segment.Group>
  );
}
