import React, { useState } from "react";
import { Button, Grid, Icon, Label, Segment } from "semantic-ui-react";
import { format } from "date-fns";
import EventDetailedMap from "./EventDetailedMap";
import { useSelector } from "react-redux";

export default function EventDetailedInfo({ event, isHost }) {
  const { authenticated } = useSelector((state) => state.auth);
  const [mapOpen, setMapOpen] = useState(false);
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
        {/* イベントホストのみ編集可能 */}
        {!isHost && (
          <Button
            color='orange'
            floated='right'
            style={{ marginRight: 200, paddingRight: 50, paddingLeft: 50,fontSize:20 }}
          >
            お気に入り登録
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
}
