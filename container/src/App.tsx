import { Spinner } from "@chakra-ui/react";
import React from "react";

// const CounterAppOne = React.lazy(() => import("app1/CounterAppOne"));
// const CounterAppTwo = React.lazy(() => import("app2/CounterAppTwo"));
// const AppDue = React.lazy(() => import("cvfy/AppDue"));
const Loader = React.lazy(() => import("cvfy/Loader"));

// const AppBar = React.lazy(() => import("cvfy/AppBar"));

const App = () => (
  <>
    {/* <React.Suspense fallback={<Spinner size="xl" />}>
      <AppBar />
    </React.Suspense> */}
    <React.Suspense fallback={<Spinner size="xl" />}>
      <Loader />
    </React.Suspense>
  </>
);

export default App;
