//<reference types="react" />

declare module "app1/CounterAppOne" {
  const CounterAppOne: React.ComponentType;

  export default CounterAppOne;
}

declare module "app2/CounterAppTwo" {
  const CounterAppTwo: React.ComponentType;

  export default CounterAppTwo;
}

declare module "cvfy/AppBar" {
  const AppBar: React.ComponentType;

  export default AppBar;
}

declare module "cvfy/AppDue" {
  const AppDue: React.ComponentType;

  export default AppDue;
}
