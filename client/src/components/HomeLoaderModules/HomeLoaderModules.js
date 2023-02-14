import ContentLoader from "react-content-loader"

export const HomeLoaderModules = () => {
  const windowWidth = window.innerWidth;

  return (
    <ContentLoader 
      speed={3}
      width={1080}
      height={500}
      viewBox="0 0 1080 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="20" rx="10" ry="10" width={windowWidth} height="64" /> 
      <rect x="0" y="104" rx="10" ry="10" width={windowWidth} height="64" /> 
      <rect x="0" y="188" rx="10" ry="10" width={windowWidth} height="64" />
      <rect x="0" y="272" rx="10" ry="10" width={windowWidth} height="64" />
      <rect x="0" y="356" rx="10" ry="10" width={windowWidth} height="64" />
    </ContentLoader>
  );
}