import React from "react";
// import { Link } from "react-router-dom";
import {
  Button,
  Icon,
  Image,
  Item,
  Label,
  Segment,
} from "semantic-ui-react";

export default function TrialListItem({ company }) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Image
              size='tiny'
              rounded
              src={`/assets/categoryImages/${company.companyPhotoURL}.jpg`}
              style={{ maxHeight: 130, width: 300 }}
            />
            <Item.Content>
              <Item.Header
                content={company.companyName}
                style={{ fontSize: 50, marginTop: 10 }}
              />
              <br />
              <Label
                style={{ top: "-40px", fontSize: 20 }}
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
                content={company.companyCareer[0]}
              ></Item.Content>
              <Item.Content
                className='ui teal tag label'
                content={company.companyCareer[1]}
              ></Item.Content>
              {/* {/* <Item.Description>
                Foundered by
                <Link to={`/profile/${event.hostUid}`}> {event.hostedBy}</Link>
              </Item.Description> */}
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
      <Segment clearing>
        <Button
          // onClick={() => deleteEventInFirestore(event.id)}
          color='red'
          floated='right'
          content='Delete'
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
