import axios from "axios";

export const associate = {
  state: {
    associateData: [],
  
  },
  reducers: {
    setAssociate: (state, payload) => {
      return {
        ...state,
        associateData: payload,
      };
    },
   
  },
  effects: (dispatch) => ({
  
  
    getAssociateAsync: async ({associateName}) => {
      try {
     
        const url =
        
          `http://localhost:9090/card/associate?associateName=${associateName}`;
          console.log(url);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.get(url, config);

        const { data = undefined } = response;

        if (data) {
          dispatch.associate.setAssociate(data);
          console.log("data1",data);
        }
      } catch (error) {
        console.log("Api > Error >Associate >  ", error.response);
        throw error;
      }
    },
   
  
  }),
  
};
