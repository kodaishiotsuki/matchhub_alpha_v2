import React, { useEffect, useState } from "react";

import { app } from "../../app/config/firebase";
// FireStoreのAPI(この後の例では省略する)
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useSelector } from "react-redux";

import LoadingComponent from "../../app/layout/LoadingComponent";
import { Redirect } from "react-router-dom";
import TrialListItem from "./TrialListItem";
import { getAuth } from "firebase/auth";

export default function TrialList({ match, history, location }) {
  //companiesコレクション取得
  //mapで回す
  //event.titleとevent.trialMonthを表示
  const [companies, setCompanies] = useState([]);

  const db = getFirestore(app);
  const auth = getAuth(app);

  //ログインユーザー
  const user = auth.currentUser;
  console.log(user);


  //コレクションuser,サブコレクションcompanies取得
  useEffect(() => {
    const usersCollectionRef = collection(db, "users", user.uid, "companies");
    getDocs(usersCollectionRef).then((querySnapshot) => {
      setCompanies(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, [db, user.uid]);

  const { loading, error } = useSelector((state) => state.async);

  //loading表示
  if (loading) return <LoadingComponent content='Loading trial...' />;

  //エラーが発生した場合はリダイレクト
  if (error) return <Redirect to='/error' />;

  return (
    <>
      {companies.map((company) => (
        <TrialListItem key={company.id} company={company} />
      ))}
    </>
  );
}
