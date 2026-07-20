import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
    'pk_test_51TjP6LP0bOEnsFBB0j2v2oeUuDTHvczXK0Je4I6uYtEpBzyC9561KMn3y59xgd1oYla6ApaM89UYy0tRfvmN4qUb00RpfPu0Wd'
);

export default stripePromise;