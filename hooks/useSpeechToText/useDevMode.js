
const useDevMode = () => {
  let isDevMode = false;
  if (process.env.ENVIRONMENT === "development") {
    isDevMode = true;
  }
  return isDevMode
}

export default useDevMode