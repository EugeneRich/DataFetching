'use strict';

const UserFetch = () => {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false)
    const [user, setUser] = React.useState({});

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let response = await fetch('https://jsonplaceholder.typicode.com/users/5');
                if (!response.ok) {
                    const message = `An error has occured: ${response.status}`;
                    throw new Error(message);
                }
                let user = await response.json();
                setUser(user);
            } catch (error) {
                console.log(error.message);
                setError(true);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <div>
            {loading && <div>Loading</div>}
            {!loading && error && <div>Fetch not working. Check the console.</div>}
            {!loading && !error
                && (
                    <div>
                        <h2> User - {user.name}</h2>
                        <li> Username - {user.username}</li>
                        <li> Website - {user.website}</li>
                    </div>
                )}
        </div>
    )
}

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Fetching Data with React!</h1>
                <UserFetch />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))