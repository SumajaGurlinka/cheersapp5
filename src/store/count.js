import axios from "axios";

export const count = {
  state: {
    countData: [],
  
  },
  reducers: {
    setEdit: (state, payload) => {
      return {
        ...state,
        countData: payload,
      };
    },
   
  },
  effects: (dispatch) => ({
  
  
    getCountAsync: async () => {
      try {
     
        const url =
        
          ` http://localhost:9090/card/id`;
          console.log(url);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.get(url, config);

        const { data = undefined } = response;

        if (data) {
          dispatch.count.setCount(data);
          console.log("count",data);
        }
      } catch (error) {
        console.log("Api > Error >Login >  ", error.response);
        throw error;
      }
    },
   
  
  }),
  
};
