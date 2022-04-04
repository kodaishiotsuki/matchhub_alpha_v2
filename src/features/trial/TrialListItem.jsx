import React from "react";
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

export default function TrialListItem({ company }) {
  //fireStore,firebase
  // const db = getFirestore(app);
  // const auth = getAuth(app);
  // const user = auth.currentUser;
  // const userDocRef = doc(db, "users", user.uid);
  // console.log(userDocRef);

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Image
              size='tiny'
              rounded
              src={`/assets/categoryImages/${company.companyCategory}.jpg`}
              style={{ maxHeight: 150, width: 300 }}
            />
            <Item.Content>
              <Item.Header
                content={company.companyName}
                style={{ fontSize: 45, marginTop: 20 }}
              />
              <br />
              <Label
                style={{ top: "-55px", fontSize: 20 }}
                ribbon='right'
                color='orange'
                content={`トライアル期間：${company.companyTrialMonth}ヶ月`}
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
                content={company.companyCareer[0]}
              ></Item.Content>
              <Item.Content
                className='ui teal tag label'
                content={company.companyCareer[1]}
              ></Item.Content>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='marker' />
          {company.companyAddress}
        </span>
      </Segment>
      <Segment clearing style={{maxHeight:90} }>
        <List floated='left'>
          {company.companyMembers.map((member) => (
            <List.Item
              key={member.id}
              as={Link}
              to={`/profile/${member.id}`}
              floated='left'
            >
              <Image circular src={member.photoURL} style={{ width: 60 }} />
            </List.Item>
          ))}
        </List>
        <Button
          color='green'
          floated='right'
          content='トライアル申請'
          style={{paddingTop:20,paddingBottom:20,fontSize:20,width:230}}
        />
        {/* <Button
          as={Link}
          to={`/events/${event.id}`} //イベント内容詳細ページへ遷移（idで判断）
          color='teal'
          floated='right'
          content='View'
        /> */}
      </Segment>
    </Segment.Group>
  );
}
