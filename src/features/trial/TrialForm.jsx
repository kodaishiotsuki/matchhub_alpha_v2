import React, { useEffect, useState } from "react";
import {
  Button,
  Header,
  Input,
  Label,
  Form,
  Select,
  Segment,
} from "semantic-ui-react";

import { app } from "../../app/config/firebase";
// FireStoreのAPI(この後の例では省略する)
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import useFirestoreDoc from "../../app/hooks/useFirestoreDoc";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedTrial, listenToSelectedTrial } from "./trialActions";
import {
  addTrialToFirestore,
  listenToTrialFromFirestore,
} from "../../app/firestore/firestoreService";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Link, Redirect } from "react-router-dom";
import { Formik } from "formik";
import { toast } from "react-toastify";
import MyTextInput from "../../app/common/form/MyTextInput";
import MySelectInput from "../../app/common/form/MySelectInput";

export default function TrialForm({ match, history, location }) {
  //eventコレクションのデータを取る
  //mapで回す
  //event.titleとevent.trialMonthを表示

  const db = getFirestore(app);
  const auth = getAuth(app);

  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);

  // //ログインユーザー
  // const user = auth.currentUser
  //   ;
  // console.log(user);

  //eventコレクション取得
  useEffect(() => {
    const companysCollectionRef = collection(db, "events");
    getDocs(companysCollectionRef).then((querySnapshot) => {
      setEvents(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );

    });
    
  }, []);

  // //userコレクション取得
  // useEffect(() => {
  //   const usersCollectionRef = collection(db, "users");
  //   getDocs(usersCollectionRef).then((querySnapshot) => {
  //     setUsers(
  //       querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  //     );
  //   });
  // }, []);

  const dispatch = useDispatch();
  const [loadingCancel, setLoadingCancel] = useState(false);

  const { selectedTrial } = useSelector((state) => state.event);
  const { loading, error } = useSelector((state) => state.async);

  //新規トライアル登録画面をクリア
  useEffect(() => {
    //EventFormコンポーネント,props,location,pathname
    if (location.pathname !== "/trial") return;
    dispatch(clearSelectedTrial()); //dispatchでeventAction呼び出し
  }, [dispatch, location.pathname]);

  //inputフォーム
  const initialValues = selectedTrial ?? {
    request_1_company: "",
    request_2_company: "",
    request_3_company: "",
  };

  //eventsコレクションのidに紐付ける(データの受け取り)
  useFirestoreDoc({
    shouldExecute:
      match.params.id !== selectedTrial?.id && //store内で選択したトライアルと異なる時
      location.pathname !== "/trial", //パス名が異なる時
    query: () => listenToTrialFromFirestore(match.params.id),
    data: (trial) => dispatch(listenToSelectedTrial(trial)),
    deps: [match.params.id, dispatch],
  });

  //loading表示
  if (loading) return <LoadingComponent content='Loading trial...' />;

  //エラーが発生した場合はリダイレクト
  if (error) return <Redirect to='/error' />;

  return (
    <Segment clearing>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            //イベント更新 or 新規イベント
            selectedTrial || (await addTrialToFirestore(values));
            history.push("/events"); //入力送信後にeventページへ遷移
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid, values }) => (
          <Form className='ui form'>
            <Header
              color='teal'
              content='トライアル雇用を申請したい会社を3つ選択してください'
              size='huge'
            />
            <Header sub color='black' content='第一希望' size='huge' />
            <MyTextInput
              name='request_1_company'
              placeholder='第一希望の企業を入力してください'
            />
            <Header sub color='black' content='第二希望' size='huge' />
            <MyTextInput
              name='request_2_company'
              placeholder='第二希望の企業を入力してください'
            />
            <Header sub color='black' content='第三希望' size='huge' />
            <MyTextInput
              name='request_3_company'
              placeholder='第三希望の企業を入力してください'
            />

            {/* <MySelectInput
              name='trialMonth'
              placeholder='trialMonth'
            /> */}

            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type='submit'
              floated='right'
              positive
              content='Submit'
            />
            <Button
              disabled={isSubmitting}
              as={Link}
              to='/events'
              type='submit'
              floated='right'
              content='Cancel'
            />
          </Form>
        )}
      </Formik>
    </Segment>

    //  <Header content='トライアル雇用を受けたい会社を3つ選択してください' />
    //   <Form className='ui form'>
    //     <Form.Field>
    //       <Label>第一希望</Label>
    //       <Input type='text' />
    //       <Label>第二希望</Label>
    //       <Input type='text' />
    //       <Label>第三希望</Label>
    //       <Input type='text' />

    //       {companys.map((company) => (
    //         <div key={company.id}>{company.hostUid}</div>
    //       ))}

    //       {users.map((user) => (
    //         <div key={user.id}>{user.id}</div>
    //       ))}
    //     </Form.Field>

    //     <Button
    //       floated='right'
    //       type='submit'
    //       size='large'
    //       positive
    //       content='トライアル申請'
    //     />
    //   </Form>
  );
}
