/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/esm/Dropdown";

import { loginRequest } from "./authConfig";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";

const NavigationBar = () => {
    
    const { instance } = useMsal();

    return (
        <>
            <AuthenticatedTemplate>
                <Button variant="warning" onClick={() => instance.logout()} className="ml-auto">Sign Out</Button>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <DropdownButton variant="secondary" className="ml-auto" drop="left" title="Sign In">
                    <Dropdown.Item as="button" onClick={() => instance.loginPopup(loginRequest)}>Sign in using Popup</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => instance.loginRedirect(loginRequest)}>Sign in using Redirect</Dropdown.Item>
                </DropdownButton>
            </UnauthenticatedTemplate>
        </>
    );
};

export const PageLayout = (props) => {
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <a className="navbar-brand" href="/">Microsoft identity platform</a>
                <NavigationBar />
            </Navbar>
            <br />
            <h5><center>Welcome to the Microsoft Authentication Library For React Tutorial</center></h5>
            <br />
            {props.children}
            <br />
            <footer>
                <center>How did we do? 
                    <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbR73pcsbpbxNJuZCMKN0lURpUMlRHSkc5U1NLUkxFNEtVN0dEOTFNQkdTWiQlQCN0PWcu" target="_blank"> Share your experience!</a>
                </center>
            </footer>
        </>
    );
};

export const IdTokenClaims = (props) => {
    return (
        <div id="token-div">
            <p><strong>Audience: </strong> {props.idTokenClaims.aud}</p>
            <p><strong>Issuer: </strong> {props.idTokenClaims.iss}</p>
            <p><strong>OID: </strong> {props.idTokenClaims.oid}</p>
            <p><strong>UPN: </strong> {props.idTokenClaims.preferred_username}</p>
        </div>
    );
}

export const ProfileData = (props) => {
    return (
        <div id="profile-div">
            <p><strong>Title: </strong> {props.graphData.jobTitle}</p>
            <p><strong>Mail: </strong> {props.graphData.mail}</p>
            <p><strong>Phone: </strong> {props.graphData.businessPhones[0]}</p>
            <p><strong>Location: </strong> {props.graphData.officeLocation}</p>
        </div>
    );
}