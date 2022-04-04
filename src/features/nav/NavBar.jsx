import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";

export default function NavBar({ setFormOpen }) {
  const { authenticated } = useSelector((state) => state.auth);

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
            <Menu.Item as={NavLink} to='/createEvent'>
              <Button positive inverted content='企業投稿ページ' />
            </Menu.Item>
            <Menu.Item as={NavLink} to='/trial'>
              <Button positive inverted content='トライアル申請' />
            </Menu.Item>
          </>
        )}
        {authenticated ? <SignedInMenu /> : <SignedOutMenu />}
      </Container>
    </Menu>
  );
}
