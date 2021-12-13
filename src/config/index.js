const production = {
  apiUrl: "/api",
};

const development = {
  apiUrl: "http://localhost:4000",
};

export function getEnvironment() {
  if (process.env.NODE_ENV === "production") {
    return production;
  }
  return development;
}
