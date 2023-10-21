import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://iut-rcc-infoapi.univ-reims.fr/tasks/api',
    prepareHeaders: (headers, { getState }) => {
      const token: string = getState().authentication.token;
      if (token !== null) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });


const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    try {
      const refreshResult = await baseQuery(
        {
          url: 'auth/refresh/',
          method: 'POST',
          body: {
            refreshToken: api.getState().authentication.refreshToken,
          },
        },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        result = await baseQuery(args, api, extraOptions);
      }
    } catch (err) {
      api.dispatch(logout());
    }
  }
     else {
      result = await baseQuery(args, api, extraOptions);
    }

  return result;
}


export const authenticationApi = createApi({
  reducerPath: 'authenticationApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      async queryFn(_args, _queryApi, _extraOptions, fetchWithBQ) {
        const loginResult = await fetchWithBQ({
          url: '/auth',
          method: 'POST',
          body: _args,
        });

        if (loginResult.error) {
          return loginResult;
        }

        const token = loginResult.data.token;

        const meResult = await fetchWithBQ({
          url: '/me',
          method: 'GET',
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        return {
          data: {
            token: token,
            refreshToken: loginResult.data.refreshToken,
            user: meResult.data,
          },
        };
      },
    }),
    getMe: builder.query({
      query: () => ({
        url: '/me',
        method: 'GET',
      }),
    }),
    getMeAvatar: builder.query({
      query: (id) => ({
        url: `/users/${id}/avatar`,
        method: 'GET',
        headers: {
          'Accept': 'image/png'
        },
        responseHandler: async (response) => {
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        }
      })
    })
  }),
});

export const { useLoginMutation, useGetMeQuery, useGetMeAvatarQuery } =
  authenticationApi;
