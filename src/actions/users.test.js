import mockAxios from 'axios'
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import promiseMiddleware from 'redux-promise-middleware'
import {userLoaded} from './index'

const store = configureMockStore([thunk, promiseMiddleware()]);

describe("getUsers action creator", () => {
  it("dispatches GET_USERS action and returns data on success", async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: [{ id: 1, name: "Vasilis" }]
      })
    );

    await store.dispatch(userLoaded());
    const actions = store.getActions();
    // [ { type: "GET_USERS_PENDING" },
    //   { type: "GET_USERS_FULFILLED", payload: { data: [Array] } } 
    // ]

    expect.assertions(3);
   // expect(actions[0].type).toEqual("GET_USERS_PENDING");
    //expect(actions[1].type).toEqual("GET_USERS_FULFILLED");
   // expect(actions[1].payload.data[0].name).toEqual("Vasilis");
  });
});

it("dispatches GET_USERS action and returns an error", async () => {
  mockAxios.get.mockImplementationOnce(() =>
    Promise.reject({
      error: "Something bad happened :("
    })
  );
  
  try { 
    await store.dispatch(userLoaded());
  } catch {
    const actions = store.getActions();

    expect.assertions(3);
   // expect(actions[0].type).toEqual("GET_USERS_PENDING");
   // expect(actions[1].type).toEqual("GET_USERS_REJECTED");
    //expect(actions[1].payload.error).toEqual("Something bad happened :(");
  }
});