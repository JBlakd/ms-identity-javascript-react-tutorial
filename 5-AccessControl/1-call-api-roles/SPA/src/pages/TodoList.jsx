import { useEffect, useState } from 'react';

import { MsalAuthenticationTemplate } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';

import { loginRequest, protectedResources } from '../authConfig';
import { getTasks } from '../fetch';

import { ListView } from '../components/ListView';

import useTokenAcquisition from '../hooks/useTokenAcquisition';

const TodoListContent = () => {
    /**
     * useMsal is hook that returns the PublicClientApplication instance,
     * an array of all accounts currently signed in and an inProgress value
     * that tells you what msal is currently doing. For more, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
     */
    const [todoListData, setTodoListData] = useState(null);
    const [tokenResponse] = useTokenAcquisition(protectedResources.apiTodoList.scopes.read);

    useEffect(() => {
        if (tokenResponse && !todoListData) {
            getTasks(tokenResponse.accessToken).then((response) => setTodoListData(response));
        }
        console.log(todoListData, ' todoListData');
    }, [tokenResponse]);

    return <>{todoListData ? <ListView todoListData={todoListData} /> : null}</>;
};

/**
 * The `MsalAuthenticationTemplate` component will render its children if a user is authenticated
 * or attempt to sign a user in. Just provide it with the interaction type you would like to use
 * (redirect or popup) and optionally a request object to be passed to the login API, a component to display while
 * authentication is in progress or a component to display if an error occurs. For more, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
export const TodoList = () => {
    const authRequest = {
        ...loginRequest,
    };

    return (
        <MsalAuthenticationTemplate interactionType={InteractionType.Redirect} authenticationRequest={authRequest}>
            <TodoListContent />
        </MsalAuthenticationTemplate>
    );
};
