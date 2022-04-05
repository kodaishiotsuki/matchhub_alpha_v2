import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Header, Image } from "semantic-ui-react";

export default function TrialUserList({ user }) {
  // const [loading, setLoading] = useState(false);

  return (
    <Card>
      <Image size='large' src={user.photoURL} />
      <Card.Content>
        <Header size='huge'>{user.displayName}</Header>
        <Button
          floated='right'
          positive
          as={Link}
          to={`/profile/${user.userUid}`}
        />
      </Card.Content>
    </Card>
  );
}
