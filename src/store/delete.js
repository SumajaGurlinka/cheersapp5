import axios from "axios";

export const delete1 = {
  state: {
    deleteData: [],
  
  },
  reducers: {
    setDelete: (state, payload) => {
      return {
        ...state,
        deleteData: payload,
      };
    },
   
  },
  effects: (dispatch) => ({
  
  
    getDeleteAsync: async ({ cardId }) => {
      try {
     
        const url =
        
          `  http://localhost:9090/card/deletedraft?cardId=${cardId}`;
          console.log(url);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.get(url, config);

        const { data = undefined } = response;

        if (data) {
          dispatch.delete1.setDelete(data);
        }
      } catch (error) {
        console.log("Api > Error >Login >  ", error.response);
        throw error;
      }
    },
   
  
  }),
  
};
