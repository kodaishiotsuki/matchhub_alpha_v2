import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import { app } from "../../app/config/firebase";
import LoadingComponent from "../../app/layout/LoadingComponent";
import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";

export default function NavBar({ setFormOpen }) {
  const { authenticated } = useSelector((state) => state.auth);

  //ユーザータイプ
  const [userType, setUserType] = useState([]);
  const db = getFirestore(app);
  const auth = getAuth(app);

  //ログインユーザー
  const user = auth.currentUser;
  console.log(user);

  //コレクションuser,サブコレクションcompanies取得
  useEffect(() => {
    const usersCollectionRef = collection(db, "users");
    getDocs(usersCollectionRef).then((querySnapshot) => {
      setUserType(querySnapshot.docs.map((doc) => doc.data()));
    });
  }, [db, user.uid]);

  const { loading, error } = useSelector((state) => state.async);

  //loading表示
  if (loading) return <LoadingComponent content='Loading trial...' />;

  //エラーが発生した場合はリダイレクト
  if (error) return <Redirect to='/error' />;

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} exact to='/' header>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: 15 }} />
          Match Hub
        </Menu.Item>
        <Menu.Item as={NavLink} to='/events' name='Events' />
        <Menu.Item as={NavLink} to='/sandbox' name='Sandbox' />

        {authenticated && (
          <>
            <Menu.Item as={NavLink} to='/usertype' name='UserType'>
              <Button negative inverted content='ユーザー選択' />
            </Menu.Item>

            {userType.userType === "企業" ? (
              <Menu.Item as={NavLink} to='/createEvent'>
                <Button positive inverted content='企業投稿ページ' />
              </Menu.Item>
            ) : (
              <Menu.Item as={NavLink} to='/trial'>
                <Button positive inverted content='トライアル申請' />
              </Menu.Item>
            )}
          </>
        )}

        {authenticated ? <SignedInMenu /> : <SignedOutMenu />}
      </Container>
    </Menu>
  );
}
