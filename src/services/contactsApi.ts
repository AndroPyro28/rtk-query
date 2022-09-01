import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import Contact from '../interface/Contacts'

const contactsApi = createApi({
    reducerPath: `contactApi`,
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:3006` }),
    tagTypes: ['Contact'],
    endpoints: (builder) => ({
        getAllContacts: builder.query<Contact[], void>({ // void since we have not pass any parameter
            query: () => ({
                url: '/contacts',
                method: "GET"
            }),
            providesTags: ['Contact']
        }),
        getContactById: builder.query<Contact, number>({ // void since we have not pass any parameter
            query: (id) => ({
                url: `/contacts/${id}`,
                method: "GET"
            }),
            providesTags: ['Contact'] // auto refetch for query
        }),
        addContact: builder.mutation<void, Contact>({ // void since we have not pass any parameter
            query: (contact) => ({
                url: `/contacts`,
                method: "POST",
                body: contact
            }),
            invalidatesTags: ['Contact'] // auto refetch for mutation
        }),
        updateContact: builder.mutation<void, Contact>({ // void since we have not pass any parameter
            query: contact => ({
                url: `/contacts/${contact.id}`,
                method: "PUT",
                body: contact
            }),
            invalidatesTags: ['Contact']
        }),
        deleteContact: builder.mutation<void, number>({ // void since we have not pass any parameter
            query: id => ({
                url: `/contacts/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Contact']
        })
    })
});

export default contactsApi;

export const { useGetAllContactsQuery, useGetContactByIdQuery, useAddContactMutation, useUpdateContactMutation, useDeleteContactMutation } = contactsApi;