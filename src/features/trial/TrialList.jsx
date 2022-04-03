import React, { useEffect, useState } from "react";

import { app } from "../../app/config/firebase";
// FireStoreのAPI(この後の例では省略する)
import {
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { useSelector } from "react-redux";

import LoadingComponent from "../../app/layout/LoadingComponent";
import { Redirect } from "react-router-dom";
import TrialListItem from "./TrialListItem";

export default function TrialList({ match, history, location }) {
  //companiesコレクション取得
  //mapで回す
  //event.titleとevent.trialMonthを表示

  const db = getFirestore(app);
  // const auth = getAuth(app);

  const [companies, setCompanies] = useState([]);

  // //ログインユーザー
  // const user = auth.currentUser;
  // console.log(user);

  //eventコレクション取得
  useEffect(() => {
    const companysCollectionRef = collection(db, "companies");
    getDocs(companysCollectionRef).then((querySnapshot) => {
      setCompanies(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, [db]);

  // //userコレクション取得
  // useEffect(() => {
  //   const usersCollectionRef = collection(db, "users");
  //   getDocs(usersCollectionRef).then((querySnapshot) => {
  //     setUsers(
  //       querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  //     );
  //   });
  // }, []);

  const { loading, error } = useSelector((state) => state.async);

  //eventsコレクションのidに紐付ける(データの受け取り)
  // useFirestoreDoc({
  //   shouldExecute:
  //     match.params.id !== selectedTrial?.id && //store内で選択したトライアルと異なる時
  //     location.pathname !== "/trial", //パス名が異なる時
  //   query: () => listenToTrialFromFirestore(match.params.id),
  //   data: (trial) => dispatch(listenToSelectedTrial(trial)),
  //   deps: [match.params.id, dispatch],
  // });

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
