import axios from "axios";

export const receivedcards = {
  state: {
    receivedcardsData: [],
  receivedcardIdData:[],
  receivedAppreciationData:[],
  receivedThankingData:[]
  },
  reducers: {
    setReceivedcards: (state, payload) => {
      return {
        ...state,
        receivedcardsData: payload,
      };
    },
    setreceivedAppreciation: (state, payload) => {
      return {
        ...state,
        receivedAppreciationData: payload,
      };
    },
    setreceivedThanking: (state, payload) => {
      return {
        ...state,
        receivedThankingData: payload,
      };
    },
    setReceivedcardId: (state, payload) => {
        return {
          ...state,
         receivedcardIdData: payload,
        };
      },
   
  },
  effects: (dispatch) => ({
  
  
    getReceivedCardsAsync: async ({receiverName, searchText, pageNumber, pageSize,sortDirection ,sortBy}) => {
      try {
     
        const url =` http://localhost:9090/card?receiverName=${receiverName}&searchText=${searchText}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortDirection=${sortDirection}&sortValue=${sortBy}`;
       
console.log(url);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.get(url, config);

        const { data = undefined } = response;

        if (data) {
          dispatch.receivedcards.setReceivedcards(data);
          console.log("received",data);
        }
      } catch (error) {
        console.log("Api > Error >Login >  ", error.response);
        throw error;
      }
    },
    getReceivedAppreciationAsync: async ({receiverName, category,searchText, pageNumber, pageSize,sortDirection ,sortBy}) => {
      try {
        const url =` http://localhost:9090/card/category/received?receiverName=${receiverName}&searchText=${searchText}&category=${category}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortDirection=${sortDirection}&sortValue=${sortBy}`;
       
        console.log(url);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.get(url, config);

        const { data = undefined } = response;

        if (data) {
          dispatch.receivedcards.setreceivedAppreciation(data);
          console.log("appreciationreceived",data);
        }
      } catch (error) {
        console.log("Api > Error >Login >  ", error.response);
        throw error;
      }
    },
    getReceivedThankingAsync: async ({ receiverName,category,searchText, pageNumber, pageSize,sortDirection ,sortBy}) => {
      try {
     
        const url =` http://localhost:9090/card/category/received?receiverName=${receiverName}&searchText=${searchText}&category=${category}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortDirection=${sortDirection}&sortValue=${sortBy}`;
       
        console.log(url);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.get(url, config);

        const { data = undefined } = response;

        if (data) {
          dispatch.receivedcards.setreceivedThanking(data);
          console.log("thankingreceived",data);
        }
      } catch (error) {
        console.log("Api > Error >Login >  ", error.response);
        throw error;
      }
    },
    getReceivedCardIdAsync: async ({ cardId}) => {
        try {
       
          const url =`http://localhost:9090/card/id?cardid=${cardId}`;
         
          console.log(url);
          const config = {
            headers: {
              "Content-Type": "blob",
            },
          };
  
          const response = await axios.get(url, config);
  
          const { data = undefined } = response;
  
          if (data) {
            dispatch.receivedcards.setReceivedcardId(data);
            localStorage.setItem("base64",data.cardImage );
            localStorage.setItem("time",data. cardSentTime );
           
            console.log("receivedId data",data);
          }
        } catch (error) {
          console.log("Api > Error >Login >  ", error.response);
          throw error;
        }
      },
   
  
  }),
  
};
