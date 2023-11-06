import axios from "axios";

export const edit = {
  state: {
    editData: [],
  
  },
  reducers: {
    setEdit: (state, payload) => {
      return {
        ...state,
        editData: payload,
      };
    },
   
  },
  effects: (dispatch) => ({
  
  
    getEditAsync: async ({ cardId }) => {
      try {
     
        const url =
        
          ` http://localhost:9090/card/id?cardid=${cardId}`;
          console.log(url);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.get(url, config);

        const { data = undefined } = response;

        if (data) {
          dispatch.edit.setEdit(data);
          console.log("edit",data);
        }
      } catch (error) {
        console.log("Api > Error >Login >  ", error.response);
        throw error;
      }
    },
   
  
  }),
  
};
