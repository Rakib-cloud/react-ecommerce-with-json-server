import {AuthProvider} from "./context/AuthContext";
import RouterPage from "./router/router";

function App() {
    return (
        <AuthProvider>
            <RouterPage/>
        </AuthProvider>
    );
}

export default App;
