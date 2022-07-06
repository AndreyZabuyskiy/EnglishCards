import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector(state => {
    const { auth } = state;
    return auth.user;
  });

  return (
    <h1>
      Home { user?.login }
    </h1>
  );
}

export default Home;