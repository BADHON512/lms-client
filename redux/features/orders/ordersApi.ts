import { apiSlice } from "../api/apiSlice";

const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: "get-all-orders",
        methods: "GET",
        credentials: "include" as const,
      }),
    }),
    getStripePublishableKey: builder.query({
      query: () => ({
        url: "payment/stripepublishableky",
        methods: "GET",
        credentials: "include" as const,
      }),
    }),

    newPayment: builder.mutation({
      query: (amount) => ({
        url: "payment",
        method: "POST",
        credentials: "include" as const,
        body: { amount },
      }),
    }),

    createOrder: builder.mutation({
        query: ({courseId,payment_info}) => ({
          url: "create-order",
          method: "POST",
          credentials: "include" as const,
          body: { courseId,payment_info },
        }),
      }),
  }),
});

export const { useGetOrdersQuery,useGetStripePublishableKeyQuery,useNewPaymentMutation,useCreateOrderMutation } = ordersApi;
