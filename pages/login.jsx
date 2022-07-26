import { getProviders, signIn } from "next-auth/react";

const Login = ({ providers }) => {
  const loginClicked = (provider) => {
    signIn(provider.id, { callbackUrl: "/" });
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black min-h-screen w-full">
      <img
        className="w-52 mb-5"
        src="https://links.papareact.com/9xl"
        alt="NotSpotify Login"
      />
      {Object.values(providers).map((provider) => {
        return (
          <div key={provider.id}>
            <button
              onClick={() => loginClicked(provider)}
              className="bg-[#1BD760] text-white p-5 rounded-full"
            >
              Login with {provider.name}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers: providers || {},
    },
  };
}

export default Login;
