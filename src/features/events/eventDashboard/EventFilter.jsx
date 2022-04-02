import React from "react";
import { Header, Menu } from "semantic-ui-react";
// import Calender from "react-calendar"
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../eventActions";
// import { Link } from "react-router-dom";

export default function EventFilter({ loading }) {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.event);
  const { authenticated } = useSelector((state) => state.auth);
  return (
    <>
      {authenticated && (
        <Menu vertical size='large' style={{ width: "100%" }}>
          <Header icon='filter' attached color='teal' content='Filters' />
          <Menu.Item
            content='All Companies'
            active={filter === "all"}
            onClick={() => dispatch(setFilter("all"))}
            disabled={loading}
          />
          <Menu.Item
            content='My company'
            active={filter === "isHosting"}
            onClick={() => dispatch(setFilter("isHosting"))}
            disabled={loading}
          />
        </Menu>
      )}
      {authenticated && (
        <Menu vertical size='large' style={{ width: "100%" }}>
          <Header icon='search' attached color='teal' content='Select career' />
          <Menu.Item
            content='エンジニア'
            active={filter === "engineer"}
            onClick={() => dispatch(setFilter("engineer"))}
            disabled={loading}
          />
          <Menu.Item
            content='デザイナー'
            active={filter === "designer"}
            onClick={() => dispatch(setFilter("designer"))}
            disabled={loading}
          />
        </Menu>
      )}

      {/* <Button
        style={{ width: "100%", minHeight: "100px" }}
        color='orange'
        content='トライアル申請する'
        as={Link}
        to={"/events/trial"}
      >
        <h1 style={{ margin: 0 }}>トライアル申請する</h1>
      </Button> */}
    </>
  );
}
