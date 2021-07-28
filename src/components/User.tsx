import Gravatar from 'react-gravatar';
import { RouteComponentProps } from 'react-router-dom';
import { useUser } from '../hooks/users';
import Header from './Page/Header';
import Page from './Page/Page';

type UserParams = {
  id: string;
};

const User = ({ match }: RouteComponentProps<UserParams>) => {
  const {
    isLoading: isProfileLoading,
    isError: isProfileError,
    data: profileData,
    error,
  } = useUser(match.params.id);

  if (isProfileLoading) {
    return <span>Loading....</span>;
  }

  if (isProfileError) {
    if (error) {
      return <span>Error: {error.message}</span>;
    }
  }
  return (
    <Page>
      <Header title="Profile" />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <Gravatar
                  email={profileData?.email}
                  className="h-8 w-8 rounded-full"
                />
                {profileData && profileData.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default User;
