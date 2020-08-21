import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react"

//import { useQuery, gql } from '@apollo/client';
import withApollo from '../../contexts/apollo/withApollo'

const Profile = () => {

  const [userMetadata, setUserMetadata] = useState(null)
  const { user, isAuthenticated, logout, getAccessTokenSilently, isLoading } = useAuth0();

  const getUserMetadata = async () => {
    const domain = process.env.NEXT_PUBLIC_DOMAIN;

    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://${domain}/api/v2/`,
        scope: "read:current_user",
      });

      console.log(accessToken)
      console.log(user)
      const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

      const metadataResponse = await fetch(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { user_metadata } = await metadataResponse.json();

      setUserMetadata(user_metadata);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(()=>{
    if(user) {
      getUserMetadata()
    }
  },[user])


  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <h3>User Metadata</h3>
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
            "No user metadata defined"
          )}
        <button onClick={() => logout()}>Log Out</button>
      </div>
    )
  );
};

export default withApollo(Profile);