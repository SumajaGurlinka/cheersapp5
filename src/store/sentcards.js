import axios from "axios";

export const sentcards = {
  state: {
    sentcardsData: [],
    sentAppreciationData:[],
    sentThankingData:[],
    sentcardIdData:[],
  
  },
  reducers: {
    setSentcards: (state, payload) => {
      return {
        ...state,
        sentcardsData: payload,
      };
    },
    setsentAppreciation: (state, payload) => {
      return {
        ...state,
        sentAppreciationData: payload,
      };
    },
    setsentThanking: (state, payload) => {
      return {
        ...state,
        sentThankingData: payload,
      };
    },
    setSentcardId: (state, payload) => {
      return {
        ...state,
       sentcardIdData: payload,
      };
    },
   
  },
  effects: (dispatch) => ({
  
  
    getSentCardsAsync: async ({ senderName,searchText, pageNumber, pageSize,sortDirection ,sortBy}) => {
      try {
     
        const url =` http://localhost:9090/card/sent-cards?senderName=${senderName}&searchText=${searchText}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortDirection=${sortDirection}&sortValue=${sortBy}`;
       
        console.log(url);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.get(url, config);

        const { data = undefined } = response;

        if (data) {
          dispatch.sentcards.setSentcards(data);
          console.log("sent",data);
        }
      } catch (error) {
        console.log("Api > Error >Login >  ", error.response);
        throw error;
      }
    },
    getSentAppreciationAsync: async ({senderName, category,searchText, pageNumber, pageSize,sortDirection ,sortBy}) => {
      try {
     
        const url =`http://localhost:9090/card/category/sent?senderName=${senderName}&searchText=${searchText}&category=${category}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortDirection=${sortDirection}&sortValue=${sortBy}`;
       
        console.log(url);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await axios.get(url, config);

        const { data = undefined } = response;

        if (data) {
          dispatch.sentcards.setsentAppreciation(data);
          console.log("appreciationsent",data);
        }
      } catch (error) {
        console.log("Api > Error >Login >  ", error.response);
        throw error;
      }
    },
    getSentThankingAsync: async ({ senderName,category,searchText, pageNumber, pageSize,sortDirection ,sortBy}) => {
      try {
     
        const url =`http://localhost:9090/card/category/sent?senderName=${senderName}&searchText=${searchText}&category=${category}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortDirection=${sortDirection}&sortValue=${sortBy}`;
       
        console.log(url);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.get(url, config);

        const { data = undefined } = response;

        if (data) {
          dispatch.sentcards.setsentThanking(data);
          console.log("thankingsent",data);
        }
      } catch (error) {
        console.log("Api > Error >Login >  ", error.response);
        throw error;
      }
    },
   
    getSentCardIdAsync: async ({ cardId}) => {
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
          dispatch.sentcards.setSentcardId(data);
          localStorage.setItem("base64",data.cardImage );
          localStorage.setItem("time",data. cardSentTime );
         
          console.log("receivedId data",data);
        }
      } catch (error) {
        console.log("Api > Error >view card>  ", error.response);
        throw error;
      }
    },
  }),
  
};
